export default function ToolCard({ icon, title, desc, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer transition transform"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-3 rounded-md ${color} text-white text-xl`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  );
}
