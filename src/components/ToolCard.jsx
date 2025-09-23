export default function ToolCard({ icon, title, desc, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-3 rounded-md ${color} text-white text-xl`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
