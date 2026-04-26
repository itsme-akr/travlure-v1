export default function SectionHeader({ title, icon = "★" }) {
  return (
    <div className="text-center mb-10">

      <h2 className="text-3xl font-heading text-black mb-3">
        {title}
      </h2>

      <div className="flex items-center justify-center gap-4">
        <div className="h-[1px] w-16 bg-gold"></div>

        <span className="text-gold text-sm">
          {icon}
        </span>

        <div className="h-[1px] w-16 bg-gold"></div>
      </div>

    </div>
  );
}