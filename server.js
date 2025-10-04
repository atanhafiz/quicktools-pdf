// Express microservice for Protecting and Unlocking PDFs using qpdf
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

const PROXY_SECRET = process.env.PROXY_SECRET || "change_me";
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

app.get("/health", (req, res) => res.json({ ok: true }));

// ===============================================================
// 🔐 PROTECT PDF (Encrypt)
// ===============================================================
app.post("/protect", upload.single("file"), async (req, res) => {
  try {
    if (PROXY_SECRET && req.header("x-proxy-secret") !== PROXY_SECRET) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const password = (req.body.password || "123456").toString();
    if (!req.file) return res.status(400).json({ error: "no file uploaded" });

    // create temp dir & file paths
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-"));
    const inputPath = path.join(tmpDir, "input.pdf");
    const outputPath = path.join(tmpDir, "protected.pdf");
    await fs.writeFile(inputPath, req.file.buffer);

    // qpdf --encrypt user owner 256 -- infile outfile
    await new Promise((resolve, reject) => {
      const args = [
        "--encrypt", password, password, "256",
        "--",
        inputPath,
        outputPath,
      ];
      const p = spawn("qpdf", args);
      let stderr = "";
      p.stderr.on("data", (d) => stderr += d.toString());
      p.on("close", (code) => code === 0 ? resolve() : reject(new Error(stderr)));
    });

    const stat = await fs.stat(outputPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=protected.pdf");
    res.setHeader("Content-Length", stat.size.toString());

    const stream = (await import("fs")).createReadStream(outputPath);
    stream.pipe(res);
    stream.on("close", async () => await fs.rm(tmpDir, { recursive: true, force: true }));
  } catch (err) {
    console.error("protect error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===============================================================
// 🔓 UNLOCK PDF (Decrypt)
// ===============================================================
app.post("/unlock", upload.single("file"), async (req, res) => {
  try {
    if (PROXY_SECRET && req.header("x-proxy-secret") !== PROXY_SECRET) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const password = (req.body.password || "").toString();
    if (!password) return res.status(400).json({ error: "missing password" });
    if (!req.file) return res.status(400).json({ error: "no file uploaded" });

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-"));
    const inputPath = path.join(tmpDir, "input.pdf");
    const outputPath = path.join(tmpDir, "unlocked.pdf");
    await fs.writeFile(inputPath, req.file.buffer);

    // qpdf --password=<pw> --decrypt -- infile outfile
    await new Promise((resolve, reject) => {
      const args = [
        `--password=${password}`,
        "--decrypt",
        "--",
        inputPath,
        outputPath,
      ];
      const p = spawn("qpdf", args);
      let stderr = "";
      p.stderr.on("data", (d) => stderr += d.toString());
      p.on("close", (code) => code === 0 ? resolve() : reject(new Error(stderr)));
    });

    const stat = await fs.stat(outputPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=unlocked.pdf");
    res.setHeader("Content-Length", stat.size.toString());

    const stream = (await import("fs")).createReadStream(outputPath);
    stream.pipe(res);
    stream.on("close", async () => await fs.rm(tmpDir, { recursive: true, force: true }));
  } catch (err) {
    console.error("unlock error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`PDF Protect service on :${PORT}`));
