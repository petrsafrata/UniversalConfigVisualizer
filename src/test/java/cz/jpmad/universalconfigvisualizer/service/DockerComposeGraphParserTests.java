package cz.jpmad.universalconfigvisualizer.service;

import cz.jpmad.universalconfigvisualizer.model.GraphResponse;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class DockerComposeGraphParserTests {

    private final DockerComposeGraphParser parser = new DockerComposeGraphParser();

    @Test
    void shouldParseServicesAndDependsOnList() {
        String yaml = """
                version: "3"
                services:
                  app:
                    build: .
                    ports:
                      - "8080:8080"
                    depends_on:
                      - db
                  db:
                    image: postgres
                """;

        GraphResponse graph = parser.parse(yaml);

        assertThat(graph.nodes()).extracting("id").containsExactlyInAnyOrder("app", "db");
        assertThat(graph.edges()).singleElement().satisfies(edge -> {
            assertThat(edge.source()).isEqualTo("app");
            assertThat(edge.target()).isEqualTo("db");
            assertThat(edge.type()).isEqualTo("depends_on");
        });

        assertThat(graph.nodes())
                .filteredOn(node -> "app".equals(node.id()))
                .singleElement()
                .satisfies(node -> {
                    assertThat(node.metadata()).containsEntry("build", ".");
                    assertThat(node.metadata()).containsEntry("depends_on", java.util.List.of("db"));
                    assertThat(node.metadata()).containsEntry("ports", java.util.List.of("8080:8080"));
                });

        assertThat(graph.nodes())
                .filteredOn(node -> "db".equals(node.id()))
                .singleElement()
                .satisfies(node -> assertThat(node.metadata()).containsEntry("image", "postgres"));
    }

    @Test
    void shouldParseDependsOnMapSyntax() {
        String yaml = """
                services:
                  app:
                    depends_on:
                      db:
                        condition: service_healthy
                  db:
                    image: postgres
                """;

        GraphResponse graph = parser.parse(yaml);

        assertThat(graph.nodes()).extracting("id").containsExactlyInAnyOrder("app", "db");
        assertThat(graph.edges()).singleElement().satisfies(edge -> {
            assertThat(edge.source()).isEqualTo("app");
            assertThat(edge.target()).isEqualTo("db");
            assertThat(edge.type()).isEqualTo("depends_on");
        });
    }

    @Test
    void shouldParseExtendedServiceMetadata() {
        String yaml = """
                services:
                  app:
                    image: myorg/app:latest
                    environment:
                      APP_ENV: production
                      RETRIES: 3
                    volumes:
                      - ./data:/data
                    healthcheck:
                      test: ["CMD", "curl", "-f", "http://localhost/health"]
                      interval: 30s
                    restart: unless-stopped
                    networks:
                      - app_net
                """;

        GraphResponse graph = parser.parse(yaml);

        assertThat(graph.nodes())
                .filteredOn(node -> "app".equals(node.id()))
                .singleElement()
                .satisfies(node -> {
                    assertThat(node.metadata()).containsEntry("environment", Map.of("APP_ENV", "production", "RETRIES", 3));
                    assertThat(node.metadata()).containsEntry("volumes", List.of("./data:/data"));
                    assertThat(node.metadata()).containsEntry("restart", "unless-stopped");
                    assertThat(node.metadata()).containsEntry("networks", List.of("app_net"));
                    assertThat(node.metadata()).containsKey("healthcheck");
                    assertThat(node.metadata().get("healthcheck")).isInstanceOf(Map.class);
                });
    }

    @Test
    void shouldThrowInvalidComposeFormatExceptionForInvalidYaml() {
        String invalidYaml = "services: [app: bad";

        assertThatThrownBy(() -> parser.parse(invalidYaml))
                .isInstanceOf(InvalidComposeFormatException.class)
                .hasMessage("Invalid docker-compose YAML input.");
    }
}
