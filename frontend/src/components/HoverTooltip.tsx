export type HoverTooltipProps = {
  visible: boolean;
  x: number;
  y: number;
  lines: string[];
};

export function HoverTooltip({ visible, x, y, lines }: HoverTooltipProps): JSX.Element | null {
  if (!visible || lines.length === 0) {
    return null;
  }

  return (
    <div className="tooltip" style={{ left: `${x}px`, top: `${y}px` }}>
      {lines.map((line, index) => {
        const separatorIndex = line.indexOf(":");
        if (separatorIndex > 0) {
          const label = line.slice(0, separatorIndex);
          const value = line.slice(separatorIndex + 1).trim();
          return (
            <div key={`${label}-${index}`}>
              <strong>{label}:</strong> {value}
            </div>
          );
        }
        return <div key={index}>{line}</div>;
      })}
    </div>
  );
}

