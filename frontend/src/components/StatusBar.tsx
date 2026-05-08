type StatusBarProps = {
  status: string;
  isLoading: boolean;
};

export function StatusBar({ status, isLoading }: StatusBarProps): JSX.Element {
  const cssClass = isLoading ? "status loading" : "status";
  return <div className={cssClass}>{status}</div>;
}

