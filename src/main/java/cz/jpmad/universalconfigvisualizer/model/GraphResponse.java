package cz.jpmad.universalconfigvisualizer.model;

import java.util.List;

/**
 * Represents the response containing the graph data, including nodes and edges.
 *
 * @param nodes the list of nodes in the graph
 * @param edges the list of edges connecting the nodes in the graph
 */
public record GraphResponse(List<Node> nodes, List<Edge> edges) {
}

