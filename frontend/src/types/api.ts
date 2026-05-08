export type AppError = {
  title: string;
  message: string;
  details?: string;
  status?: number;
};

export type AlertLevel = "error" | "warning" | "info";

