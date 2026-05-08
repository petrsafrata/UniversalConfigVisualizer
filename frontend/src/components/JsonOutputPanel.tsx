type JsonOutputPanelProps = {
  visible: boolean;
  value: string;
};

export function JsonOutputPanel({ visible, value }: JsonOutputPanelProps): JSX.Element | null {
  if (!visible) {
    return null;
  }
  return <div className="json-output">{value}</div>;
}

