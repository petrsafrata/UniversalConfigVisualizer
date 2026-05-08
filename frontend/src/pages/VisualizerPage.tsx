import { useEffect, useMemo, useState } from "react";
import type { Core, ElementDefinition } from "cytoscape";
import { parseDockerCompose } from "../api/configApi";
import { ErrorAlert } from "../components/AlertBox";
import { GraphView, type GraphHoverPayload } from "../components/GraphView";
import { HoverTooltip } from "../components/HoverTooltip";
import { JsonOutputPanel } from "../components/JsonOutputPanel";
import { ServiceDetailPanel } from "../components/ServiceDetailPanel";
import { StatusBar } from "../components/StatusBar";
import { Toolbar } from "../components/Toolbar";
import { YamlInput } from "../components/YamlInput";
import type { AppError } from "../types/api";
import type { Edge, GraphResponse, Node } from "../types/graph";
import { exportJson, exportPng, copyToClipboard } from "../utils/exportUtils";
import { mapGraphToElements } from "../utils/graphMapper";

const SAMPLE_YAML = `version: "3"
services:
  app:
    build: .
    depends_on:
      - db
  db:
    image: postgres`;

type HoverState = {
  visible: boolean;
  x: number;
  y: number;
  lines: string[];
};

const EMPTY_HOVER: HoverState = { visible: false, x: 0, y: 0, lines: [] };

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function getIncoming(edgeList: Edge[], nodeId: string): string[] {
  return unique(edgeList.filter((edge) => edge.target === nodeId).map((edge) => edge.source));
}

function getOutgoing(edgeList: Edge[], nodeId: string): string[] {
  return unique(edgeList.filter((edge) => edge.source === nodeId).map((edge) => edge.target));
}

function getHoverLines(node: Node | null, edges: Edge[]): string[] {
  if (!node) {
    return [];
  }

  const incoming = getIncoming(edges, node.id);
  const outgoing = getOutgoing(edges, node.id);
  const metadata = node.metadata ?? {};

  return [
    `service: ${node.id}`,
    metadata.image ? `image: ${metadata.image}` : metadata.build ? `build: ${metadata.build}` : "",
    Array.isArray(metadata.ports) && metadata.ports.length > 0 ? `ports: ${metadata.ports.join(", ")}` : "",
    outgoing.length > 0 ? `depends on: ${outgoing.join(", ")}` : "",
    incoming.length > 0 ? `dependents: ${incoming.join(", ")}` : ""
  ].filter(Boolean);
}

export function VisualizerPage(): JSX.Element {
  const [yaml, setYaml] = useState(SAMPLE_YAML);
  const [status, setStatus] = useState("Ready.");
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [graph, setGraph] = useState<GraphResponse>({ nodes: [], edges: [] });
  const [jsonText, setJsonText] = useState("{}");
  const [elements, setElements] = useState<ElementDefinition[]>([]);
  const [nodesById, setNodesById] = useState<Record<string, Node>>({});
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [hover, setHover] = useState<HoverState>(EMPTY_HOVER);
  const [cyInstance, setCyInstance] = useState<Core | null>(null);

  const selectedNode = selectedNodeId ? nodesById[selectedNodeId] ?? null : null;
  const dependents = selectedNode ? getIncoming(graph.edges, selectedNode.id) : [];
  const dependencies = selectedNode ? getOutgoing(graph.edges, selectedNode.id) : [];

  const warningText = useMemo(() => warnings.join("\n"), [warnings]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = window.setTimeout(() => setError(null), 5000);
    return () => window.clearTimeout(timer);
  }, [error]);

  const handleParse = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setStatus("Parsing...");

    try {
      const parsed = await parseDockerCompose(yaml);
      const mapped = mapGraphToElements(parsed);

      setGraph(parsed);
      setJsonText(JSON.stringify(parsed, null, 2));
      setElements(mapped.elements);
      setNodesById(mapped.nodesById);
      setWarnings(mapped.warnings);
      setSelectedNodeId("");
      setHover(EMPTY_HOVER);
      setStatus(`Rendered ${parsed.nodes.length} nodes and ${parsed.edges.length} edges.`);
    } catch (mappedError) {
      const appError = mappedError as AppError;
      setError(appError);
      setWarnings([]);
      setElements([]);
      setNodesById({});
      setGraph({ nodes: [], edges: [] });
      setSelectedNodeId("");
      setHover(EMPTY_HOVER);
      setStatus("Ready.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = async (): Promise<void> => {
    if (!jsonText || jsonText === "{}") {
      setStatus("No graph JSON to copy.");
      return;
    }

    try {
      await copyToClipboard(jsonText);
      setStatus("Graph JSON copied to clipboard.");
    } catch {
      setError({
        title: "Copy Unavailable",
        message: "Clipboard access is blocked in this browser context."
      });
      setStatus("Ready.");
    }
  };

  const handleExportJson = (): void => {
    if (!graph.nodes.length && !graph.edges.length) {
      setStatus("No graph JSON to export.");
      return;
    }
    exportJson(graph);
  };

  const handleExportPng = (): void => {
    if (!cyInstance || cyInstance.nodes().length === 0) {
      setStatus("No graph rendered to export.");
      return;
    }
    exportPng(cyInstance);
  };

  const handleHover = (payload: GraphHoverPayload | null): void => {
    if (!payload) {
      setHover(EMPTY_HOVER);
      return;
    }

    const node = nodesById[payload.nodeId] ?? null;
    const lines = getHoverLines(node, graph.edges);

    setHover({
      visible: lines.length > 0,
      x: Math.min(payload.viewportX + 14, window.innerWidth - 320),
      y: Math.min(payload.viewportY + 14, window.innerHeight - 180),
      lines
    });
  };

  return (
    <div className="layout">
      <div className="panel">
        <div className="panel-header">
          <h1 className="panel-title">Universal Config Visualizer</h1>
          <p className="panel-subtitle">Paste a docker-compose YAML and render service dependencies.</p>
        </div>

        <YamlInput value={yaml} onChange={setYaml} />

        <Toolbar
          isLoading={isLoading}
          showJson={showJson}
          onParse={handleParse}
          onToggleJson={() => setShowJson((current) => !current)}
          onCopyJson={handleCopyJson}
          onExportJson={handleExportJson}
          onExportPng={handleExportPng}
        />

        <StatusBar status={status} isLoading={isLoading} />
        <div className="hint">Hover node highlights dependencies/dependents. Click node shows details.</div>

        <ErrorAlert error={error} />

        {warnings.length > 0 && <div className="warnings">{warningText}</div>}

        <ServiceDetailPanel node={selectedNode} dependents={dependents} dependencies={dependencies} />
        <JsonOutputPanel visible={showJson} value={jsonText} />
      </div>

      <GraphView
        elements={elements}
        selectedNodeId={selectedNodeId}
        onNodeSelect={(nodeId) => setSelectedNodeId(nodeId ?? "")}
        onNodeHover={handleHover}
        onCyReady={setCyInstance}
      />

      <HoverTooltip visible={hover.visible} x={hover.x} y={hover.y} lines={hover.lines} />
    </div>
  );
}


