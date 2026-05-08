package cz.jpmad.universalconfigvisualizer.api;

import cz.jpmad.universalconfigvisualizer.model.GraphResponse;
import cz.jpmad.universalconfigvisualizer.service.DockerComposeGraphParser;
import cz.jpmad.universalconfigvisualizer.service.InvalidComposeFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * REST controller for parsing Docker Compose YAML content and returning a graph representation.
 */
@RestController
@RequestMapping("/parse")
public class ParseController {

    private final DockerComposeGraphParser parser;

    public ParseController(DockerComposeGraphParser parser) {
        this.parser = parser;
    }

    @PostMapping(
            consumes = {"application/x-yaml", "text/yaml", MediaType.TEXT_PLAIN_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public GraphResponse parse(@RequestBody String yamlContent) {
        return parser.parse(yamlContent);
    }

    @ExceptionHandler(InvalidComposeFormatException.class)
    public ResponseEntity<Map<String, String>> handleInvalidComposeFormat(InvalidComposeFormatException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("error", ex.getMessage()));
    }
}
