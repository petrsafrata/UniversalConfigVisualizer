export type NodeMetadata = {
  image?: string;
  build?: string;
  ports?: string[];
  depends_on?: string[];
  environment?: Record<string, unknown> | string[];
  volumes?: string[];
  healthcheck?: Record<string, unknown>;
  restart?: string;
  networks?: string[] | Record<string, unknown>;
};

export type Node = {
  id: string;
  type: string;
  metadata?: NodeMetadata;
};

export type Edge = {
  source: string;
  target: string;
  type: string;
};

export type GraphResponse = {
  nodes: Node[];
  edges: Edge[];
};

export type NodeCategory = "service" | "database" | "ai";

