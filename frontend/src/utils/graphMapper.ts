import type { ElementDefinition } from "cytoscape";
import type { GraphResponse, Node } from "../types/graph";
import { classifyNode } from "./nodeClassifier";
import { truncateText } from "./textUtils";

export type MappedGraph = {
  elements: ElementDefinition[];
  warnings: string[];
  nodesById: Record<string, Node>;
};

function subtitleForNode(node: Node): string {
  const metadata = node.metadata ?? {};
  if (Array.isArray(metadata.ports) && metadata.ports.length > 0) {
    return truncateText(`port ${metadata.ports[0]}`, 16);
  }
  if (metadata.image) {
    return truncateText(metadata.image, 16);
  }
  if (metadata.build) {
    return "build";
  }
  return "";
}

export function mapGraphToElements(graph: GraphResponse): MappedGraph {
  const warnings = new Set<string>();
  const nodesById: Record<string, Node> = Object.fromEntries(graph.nodes.map((node) => [node.id, node]));
  const nodeIds = new Set(graph.nodes.map((node) => node.id));

  const nodeElements: ElementDefinition[] = graph.nodes.map((node) => {
    const subtitle = subtitleForNode(node);
    const primaryLabel = truncateText(node.id, 18);

    return {
      data: {
        id: node.id,
        displayLabel: subtitle ? `${primaryLabel}\n${subtitle}` : primaryLabel,
        category: classifyNode(node),
        metadata: node.metadata ?? {},
        subtitle
      }
    };
  });

  const edgeElements: ElementDefinition[] = graph.edges.map((edge, index) => {
    const invalid = nodeIds.has(edge.target) ? 0 : 1;
    if (invalid) {
      warnings.add(`Service '${edge.source}' depends_on missing service '${edge.target}'.`);
    }

    return {
      data: {
        id: `${edge.source}-${edge.target}-${index}`,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        invalid
      }
    };
  });

  return {
    elements: [...nodeElements, ...edgeElements],
    warnings: [...warnings],
    nodesById
  };
}

