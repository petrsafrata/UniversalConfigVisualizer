package cz.jpmad.universalconfigvisualizer.cli;

import com.fasterxml.jackson.databind.ObjectMapper;
import cz.jpmad.universalconfigvisualizer.model.GraphResponse;
import cz.jpmad.universalconfigvisualizer.service.DockerComposeGraphParser;
import cz.jpmad.universalconfigvisualizer.service.InvalidComposeFormatException;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Command-line runner for the ConfigViz tool. It processes command-line arguments to generate a graph representation
 * of a Docker Compose file and outputs it in JSON format.
 */
@Log4j2
public final class ConfigVizCliRunner {

    private static final String CLI_COMMAND = "configviz";

    private ConfigVizCliRunner() {
    }

    public static boolean tryRun(String[] args) {
        if (args == null || args.length == 0 || !CLI_COMMAND.equals(args[0])) {
            return false;
        }

        if (args.length < 2) {
            log.error("Usage: configviz <docker-compose.yml>");
            System.exit(1);
            return true;
        }

        Path composePath = Path.of(args[1]);

        try {
            String yamlContent = Files.readString(composePath, StandardCharsets.UTF_8);
            GraphResponse graph = new DockerComposeGraphParser().parse(yamlContent);
            String jsonOutput = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(graph);
            log.info(jsonOutput);
            return true;
        } catch (InvalidComposeFormatException ex) {
            log.error("Invalid docker-compose YAML: {}", composePath);
            log.error(ex.getMessage());
            System.exit(1);
            return true;
        } catch (IOException ex) {
            log.error("Unable to read file: {}", composePath);
            log.error(ex.getMessage());
            System.exit(1);
            return true;
        }
    }
}
