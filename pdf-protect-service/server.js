// Express microservice that protects PDFs with qpdf
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
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB

const PROXY_SECRET = process.env.PROXY_SECRET || "change_me";
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/protect", upload.single("file"), async (req, res) => {
  try {
    if (req.header("x-proxy-secret") !== PROXY_SECRET) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const password = (req.body.password || "123456").toString();
    if (!req.file) return res.status(400).json({ error: "no file uploaded" });

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-"));
    const inputPath = path.join(tmpDir, "input.pdf");
    const outputPath = path.join(tmpDir, "protected.pdf");

    await fs.writeFile(inputPath, req.file.buffer);

    await new Promise((resolve, reject) => {
      const args = [inputPath, outputPath, "--encrypt", password, password, "128"];
      
      const p = spawn("qpdf", args);
      let stderr = "";
      
      p.stderr.on("data", (d) => stderr += d.toString());
      
      p.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          console.error("qpdf stderr:", stderr);
          reject(new Error(`qpdf failed with code ${code}: ${stderr}`));
        }
      });
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

app.listen(PORT, () => console.log(`PDF Protect service on :${PORT}`));