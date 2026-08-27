function MediaTile({ item, index, onToggle }) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className="relative aspect-square"
      style={{ background: `linear-gradient(135deg, ${item.tone}66, #151517)` }}
    >
      {index !== null && (
        <div
          className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground"
        >
          {index + 1}
        </div>
      )}
    </button>
  );
}

export default MediaTile