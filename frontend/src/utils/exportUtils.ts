import type { Core } from "cytoscape";

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export function exportJson(data: object): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "config-graph.json";
  link.click();
  URL.revokeObjectURL(url);
}

export function exportPng(cyInstance: Core): void {
  const pngData = cyInstance.png({ full: true, bg: "#ffffff", scale: 2 });
  const link = document.createElement("a");
  link.href = pngData;
  link.download = "config-graph.png";
  link.click();
}

