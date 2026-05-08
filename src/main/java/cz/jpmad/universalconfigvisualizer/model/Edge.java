package cz.jpmad.universalconfigvisualizer.model;

/**
 * Represents an edge in the graph, connecting two nodes with a specific type.
 *
 * @param source the source node of the edge
 * @param target the target node of the edge
 * @param type   the type of the edge (e.g., "depends_on", "related_to")
 */
public record Edge(String source, String target, String type) {
}

