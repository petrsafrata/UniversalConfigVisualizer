package cz.jpmad.universalconfigvisualizer.service;

import cz.jpmad.universalconfigvisualizer.model.Edge;
import cz.jpmad.universalconfigvisualizer.model.GraphResponse;
import cz.jpmad.universalconfigvisualizer.model.Node;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.error.YAMLException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class DockerComposeGraphParser {

    private static final String NODE_TYPE_SERVICE = "service";
    private static final String EDGE_TYPE_DEPENDS_ON = "depends_on";
    private static final String KEY_IMAGE = "image";
    private static final String KEY_BUILD = "build";
    private static final String KEY_PORTS = "ports";
    private static final String KEY_DEPENDS_ON = "depends_on";
    private static final String KEY_ENVIRONMENT = "environment";
    private static final String KEY_VOLUMES = "volumes";
    private static final String KEY_HEALTHCHECK = "healthcheck";
    private static final String KEY_RESTART = "restart";
    private static final String KEY_NETWORKS = "networks";

    public GraphResponse parse(String yamlContent) {
        if (yamlContent == null || yamlContent.isBlank()) {
            return new GraphResponse(List.of(), List.of());
        }

        Object parsedObject = loadYaml(yamlContent);
        if (!(parsedObject instanceof Map<?, ?> root)) {
            return new GraphResponse(List.of(), List.of());
        }

        Object servicesObject = root.get("services");
        if (!(servicesObject instanceof Map<?, ?> services)) {
            return new GraphResponse(List.of(), List.of());
        }

        List<Node> nodes = new ArrayList<>();
        List<Edge> edges = new ArrayList<>();

        for (Map.Entry<?, ?> serviceEntry : services.entrySet()) {
            String serviceName = String.valueOf(serviceEntry.getKey());
            Map<String, Object> metadata = Collections.emptyMap();

            if (!(serviceEntry.getValue() instanceof Map<?, ?> serviceConfig)) {
                nodes.add(new Node(serviceName, NODE_TYPE_SERVICE, metadata));
                continue;
            }

            metadata = extractMetadata(serviceConfig);
            nodes.add(new Node(serviceName, NODE_TYPE_SERVICE, metadata));

            Object dependsOn = serviceConfig.get(KEY_DEPENDS_ON);
            if (dependsOn instanceof List<?> dependencyList) {
                addListDependencies(edges, serviceName, dependencyList);
            } else if (dependsOn instanceof Map<?, ?> dependencyMap) {
                addMapDependencies(edges, serviceName, dependencyMap);
            }
        }

        return new GraphResponse(nodes, edges);
    }

    private Object loadYaml(String yamlContent) {
        try {
            return new Yaml().load(yamlContent);
        } catch (YAMLException ex) {
            throw new InvalidComposeFormatException("Invalid docker-compose YAML input.", ex);
        }
    }

    private Map<String, Object> extractMetadata(Map<?, ?> serviceConfig) {
        Map<String, Object> metadata = new LinkedHashMap<>();

        Object image = serviceConfig.get(KEY_IMAGE);
        if (image != null) {
            metadata.put(KEY_IMAGE, String.valueOf(image));
        }

        Object build = serviceConfig.get(KEY_BUILD);
        if (build != null) {
            metadata.put(KEY_BUILD, String.valueOf(build));
        }

        Object ports = serviceConfig.get(KEY_PORTS);
        if (ports instanceof List<?> portList && !portList.isEmpty()) {
            List<String> normalizedPorts = portList.stream()
                    .filter(Objects::nonNull)
                    .map(String::valueOf)
                    .toList();
            if (!normalizedPorts.isEmpty()) {
                metadata.put(KEY_PORTS, normalizedPorts);
            }
        }

        List<String> dependsOnServices = extractDependsOnServices(serviceConfig.get(KEY_DEPENDS_ON));
        if (!dependsOnServices.isEmpty()) {
            metadata.put(KEY_DEPENDS_ON, dependsOnServices);
        }

        Object environment = normalizeComposeObject(serviceConfig.get(KEY_ENVIRONMENT));
        if (environment != null) {
            metadata.put(KEY_ENVIRONMENT, environment);
        }

        List<String> volumes = normalizeStringList(serviceConfig.get(KEY_VOLUMES));
        if (!volumes.isEmpty()) {
            metadata.put(KEY_VOLUMES, volumes);
        }

        Object healthcheck = normalizeComposeObject(serviceConfig.get(KEY_HEALTHCHECK));
        if (healthcheck != null) {
            metadata.put(KEY_HEALTHCHECK, healthcheck);
        }

        Object restart = serviceConfig.get(KEY_RESTART);
        if (restart != null) {
            metadata.put(KEY_RESTART, String.valueOf(restart));
        }

        Object networks = normalizeComposeObject(serviceConfig.get(KEY_NETWORKS));
        if (networks != null) {
            metadata.put(KEY_NETWORKS, networks);
        }

        return metadata;
    }

    private List<String> normalizeStringList(Object value) {
        if (!(value instanceof List<?> list) || list.isEmpty()) {
            return List.of();
        }

        List<String> normalized = list.stream()
                .filter(Objects::nonNull)
                .map(String::valueOf)
                .toList();
        return normalized.isEmpty() ? List.of() : normalized;
    }

    private Object normalizeComposeObject(Object value) {
        if (value instanceof Map<?, ?> map && !map.isEmpty()) {
            Map<String, Object> normalized = new LinkedHashMap<>();
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                if (entry.getKey() == null || entry.getValue() == null) {
                    continue;
                }
                normalized.put(String.valueOf(entry.getKey()), entry.getValue());
            }
            return normalized.isEmpty() ? null : normalized;
        }

        if (value instanceof List<?> list && !list.isEmpty()) {
            List<String> normalized = list.stream()
                    .filter(Objects::nonNull)
                    .map(String::valueOf)
                    .toList();
            return normalized.isEmpty() ? null : normalized;
        }

        if (value == null) {
            return null;
        }

        return String.valueOf(value);
    }

    private List<String> extractDependsOnServices(Object dependsOnObject) {
        if (dependsOnObject instanceof List<?> dependencyList) {
            return dependencyList.stream()
                    .filter(Objects::nonNull)
                    .map(String::valueOf)
                    .toList();
        }

        if (dependsOnObject instanceof Map<?, ?> dependencyMap) {
            return dependencyMap.keySet().stream()
                    .filter(Objects::nonNull)
                    .map(String::valueOf)
                    .toList();
        }

        return List.of();
    }

    private void addListDependencies(List<Edge> edges, String sourceService, List<?> dependencyList) {
        for (Object dependency : dependencyList) {
            if (dependency == null) {
                continue;
            }
            edges.add(new Edge(sourceService, String.valueOf(dependency), EDGE_TYPE_DEPENDS_ON));
        }
    }

    private void addMapDependencies(List<Edge> edges, String sourceService, Map<?, ?> dependencyMap) {
        for (Object dependency : dependencyMap.keySet()) {
            if (dependency == null) {
                continue;
            }
            edges.add(new Edge(sourceService, String.valueOf(dependency), EDGE_TYPE_DEPENDS_ON));
        }
    }
}
