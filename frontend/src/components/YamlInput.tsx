type YamlInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function YamlInput({ value, onChange }: YamlInputProps): JSX.Element {
  return (
    <textarea
      className="yaml-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      spellCheck={false}
    />
  );
}

