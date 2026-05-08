package cz.jpmad.universalconfigvisualizer.model;

import java.util.Map;

/**
 * Represents a node in the configuration graph.
 *
 * @param id       Unique identifier of the node.
 * @param type     Type of the node (e.g., "service", "database", "cache").
 * @param metadata Additional metadata associated with the node.
 */
public record Node(String id, String type, Map<String, Object> metadata) {
}

