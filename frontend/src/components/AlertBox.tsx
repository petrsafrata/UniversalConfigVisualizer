import type { AlertLevel, AppError } from "../types/api";

type AlertBoxProps = {
  level: AlertLevel;
  title?: string;
  message: string;
  details?: string;
};

export function AlertBox({ level, title, message, details }: AlertBoxProps): JSX.Element {
  return (
    <div className={`alert alert-${level}`} role={level === "error" ? "alert" : "status"}>
      {title && <div className="alert-title">{title}</div>}
      <div>{message}</div>
      {details && <div className="alert-details">{details}</div>}
    </div>
  );
}

export function ErrorAlert({ error }: { error: AppError | null }): JSX.Element | null {
  if (!error) {
    return null;
  }
  return <AlertBox level="error" title={error.title} message={error.message} details={error.details} />;
}

