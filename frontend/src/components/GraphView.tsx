import { useEffect, useRef } from "react";
import cytoscape, { type Core, type ElementDefinition } from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

export type GraphHoverPayload = {
  nodeId: string;
  viewportX: number;
  viewportY: number;
};

type GraphViewProps = {
  elements: ElementDefinition[];
  selectedNodeId: string;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeHover: (payload: GraphHoverPayload | null) => void;
  onCyReady: (cy: Core | null) => void;
};

function runPreferredLayout(cy: Core): void {
  try {
    cy.layout({
      name: "dagre",
      rankDir: "TB",
      nodeSep: 50,
      edgeSep: 18,
      rankSep: 85,
      fit: true,
      padding: 30,
      animate: false
    } as unknown as Parameters<Core["layout"]>[0]).run();
  } catch {
    cy.layout({
      name: "breadthfirst",
      directed: true,
      spacingFactor: 1.2,
      padding: 30,
      animate: false
    }).run();
  }
}

export function GraphView({ elements, selectedNodeId, onNodeSelect, onNodeHover, onCyReady }: GraphViewProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const selectedNodeIdRef = useRef(selectedNodeId);
  const onNodeSelectRef = useRef(onNodeSelect);
  const onNodeHoverRef = useRef(onNodeHover);
  const onCyReadyRef = useRef(onCyReady);

  useEffect(() => {
    selectedNodeIdRef.current = selectedNodeId;
  }, [selectedNodeId]);

  useEffect(() => {
    onNodeSelectRef.current = onNodeSelect;
  }, [onNodeSelect]);

  useEffect(() => {
    onNodeHoverRef.current = onNodeHover;
  }, [onNodeHover]);

  useEffect(() => {
    onCyReadyRef.current = onCyReady;
  }, [onCyReady]);

  useEffect(() => {
    if (!containerRef.current || cyRef.current) {
      return;
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements: [],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#2563eb",
            label: "data(displayLabel)",
            color: "#f8fafc",
            "font-size": 11,
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-max-width": "108px",
            "border-width": 1,
            "border-color": "#1e3a8a",
            shape: "round-rectangle",
            width: 130,
            height: 58,
            padding: "4px"
          }
        },
        {
          selector: "node[category = 'database']",
          style: {
            "background-color": "#22c55e",
            "border-color": "#166534"
          }
        },
        {
          selector: "node[category = 'ai']",
          style: {
            "background-color": "#a855f7",
            "border-color": "#6b21a8"
          }
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#64748b",
            "target-arrow-color": "#64748b",
            "target-arrow-shape": "triangle",
            "curve-style": "unbundled-bezier",
            "control-point-distance": 18,
            "control-point-weight": 0.5,
            label: "",
            "font-size": 10
          }
        },
        {
          selector: "edge[invalid = 1]",
          style: {
            "line-color": "#dc2626",
            "target-arrow-color": "#dc2626",
            "line-style": "dashed"
          }
        },
        {
          selector: "edge.edge-hover",
          style: {
            label: "data(type)",
            color: "#334155",
            "font-size": 10
          }
        },
        {
          selector: ".hover-dimmed",
          style: {
            opacity: 0.15
          }
        },
        {
          selector: ".hover-highlighted-edge",
          style: {
            width: 4,
            "line-color": "#f59e0b",
            "target-arrow-color": "#f59e0b"
          }
        },
        {
          selector: ".hover-related-node",
          style: {
            "border-width": 3,
            "border-color": "#f59e0b"
          }
        },
        {
          selector: ".selected-node",
          style: {
            "border-width": 4,
            "border-color": "#f97316"
          }
        },
        {
          selector: ".selected-related-node",
          style: {
            "border-width": 3,
            "border-color": "#fb923c"
          }
        },
        {
          selector: ".selected-related-edge",
          style: {
            width: 4,
            "line-color": "#fb923c",
            "target-arrow-color": "#fb923c"
          }
        }
      ],
      layout: { name: "grid" }
    });

    const clearHoverHighlight = (): void => {
      cy.elements().removeClass("hover-dimmed hover-highlighted-edge hover-related-node edge-hover");
    };

    const clearSelectionHighlight = (): void => {
      cy.elements().removeClass("selected-node selected-related-node selected-related-edge");
    };

    const applySelectionHighlight = (nodeId: string): void => {
      clearSelectionHighlight();
      if (!nodeId) {
        return;
      }
      const node = cy.$id(nodeId);
      if (!node || node.length === 0) {
        return;
      }
      node.addClass("selected-node");
      node.incomers("edge").addClass("selected-related-edge");
      node.outgoers("edge").addClass("selected-related-edge");
      node.incomers("node").addClass("selected-related-node");
      node.outgoers("node").addClass("selected-related-node");
    };

    const applyHoverHighlight = (nodeId: string): void => {
      clearHoverHighlight();
      const node = cy.$id(nodeId);
      if (!node || node.length === 0) {
        return;
      }
      cy.elements().addClass("hover-dimmed");
      node.removeClass("hover-dimmed").addClass("hover-related-node");
      node.incomers("edge").removeClass("hover-dimmed").addClass("hover-highlighted-edge");
      node.outgoers("edge").removeClass("hover-dimmed").addClass("hover-highlighted-edge");
      node.incomers("node").removeClass("hover-dimmed").addClass("hover-related-node");
      node.outgoers("node").removeClass("hover-dimmed").addClass("hover-related-node");
    };

    cy.on("mouseover", "node", (event) => {
      const node = event.target;
      applyHoverHighlight(node.id());
      const rect = containerRef.current?.getBoundingClientRect();
      const renderedX = event.renderedPosition?.x ?? 0;
      const renderedY = event.renderedPosition?.y ?? 0;
      onNodeHoverRef.current({
        nodeId: node.id(),
        viewportX: (rect?.left ?? 0) + renderedX,
        viewportY: (rect?.top ?? 0) + renderedY
      });
    });

    cy.on("mousemove", "node", (event) => {
      const node = event.target;
      const rect = containerRef.current?.getBoundingClientRect();
      const renderedX = event.renderedPosition?.x ?? 0;
      const renderedY = event.renderedPosition?.y ?? 0;
      onNodeHoverRef.current({
        nodeId: node.id(),
        viewportX: (rect?.left ?? 0) + renderedX,
        viewportY: (rect?.top ?? 0) + renderedY
      });
    });

    cy.on("mouseout", "node", () => {
      onNodeHoverRef.current(null);
      clearHoverHighlight();
      applySelectionHighlight(selectedNodeIdRef.current);
    });

    cy.on("mouseover", "edge", (event) => {
      const edge = event.target;
      clearHoverHighlight();
      cy.elements().addClass("hover-dimmed");
      edge.removeClass("hover-dimmed").addClass("hover-highlighted-edge edge-hover");
      edge.source().removeClass("hover-dimmed").addClass("hover-related-node");
      edge.target().removeClass("hover-dimmed").addClass("hover-related-node");
    });

    cy.on("mouseout", "edge", (event) => {
      event.target.removeClass("edge-hover");
      clearHoverHighlight();
      applySelectionHighlight(selectedNodeIdRef.current);
    });

    cy.on("tap", "node", (event) => {
      onNodeSelectRef.current(event.target.id());
      applySelectionHighlight(event.target.id());
    });

    cy.on("tap", (event) => {
      if (event.target === cy) {
        onNodeSelectRef.current(null);
        clearSelectionHighlight();
      }
    });

    cyRef.current = cy;
    onCyReadyRef.current(cy);

    return () => {
      onCyReadyRef.current(null);
      cy.destroy();
      cyRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }

    cy.elements().removeClass("selected-node selected-related-node selected-related-edge");
    if (selectedNodeId) {
      const node = cy.$id(selectedNodeId);
      if (node && node.length > 0) {
        node.addClass("selected-node");
        node.incomers("edge").addClass("selected-related-edge");
        node.outgoers("edge").addClass("selected-related-edge");
        node.incomers("node").addClass("selected-related-node");
        node.outgoers("node").addClass("selected-related-node");
      }
    }
  }, [selectedNodeId]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }

    cy.elements().remove();
    cy.add(elements);
    runPreferredLayout(cy);
  }, [elements]);

  return <div id="cy" ref={containerRef} />;
}



