type ToolbarProps = {
  isLoading: boolean;
  showJson: boolean;
  onParse: () => void;
  onToggleJson: () => void;
  onCopyJson: () => void;
  onExportJson: () => void;
  onExportPng: () => void;
};

export function Toolbar({
  isLoading,
  showJson,
  onParse,
  onToggleJson,
  onCopyJson,
  onExportJson,
  onExportPng
}: ToolbarProps): JSX.Element {
  return (
    <div className="toolbar">
      <button className="primary" onClick={onParse} disabled={isLoading}>
        {isLoading ? "Parsing..." : "Parse and Render"}
      </button>
      <div className="toolbar-secondary">
        <button className="secondary" onClick={onToggleJson}>
          {showJson ? "Hide JSON" : "Show JSON"}
        </button>
        <button className="secondary" onClick={onCopyJson}>Copy JSON</button>
        <button className="secondary" onClick={onExportJson}>Export JSON</button>
        <button className="secondary" onClick={onExportPng}>Export PNG</button>
      </div>
    </div>
  );
}

