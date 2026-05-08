import type { Node } from "../types/graph";

export function classifyNode(node: Node): "service" | "database" | "ai" {
  const id = node.id.toLowerCase();
  const image = String(node.metadata?.image ?? "").toLowerCase();
  const fingerprint = `${id} ${image}`;

  if (/(postgres|mysql|mariadb|mongo|redis|db)/.test(fingerprint)) {
    return "database";
  }
  if (/(ollama|ai|llm|ml|python-ai|openai)/.test(fingerprint)) {
    return "ai";
  }
  return "service";
}

