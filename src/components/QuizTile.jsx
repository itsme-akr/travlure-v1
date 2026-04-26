export default function QuizTile({ label, selected, onClick, icon }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 border transition flex flex-col items-center justify-center gap-2
        ${
          selected
            ? "bg-magenta text-white border-magenta"
            : "bg-white hover:border-magenta"
        }`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-sm font-medium text-center">{label}</p>
    </div>
  );
}