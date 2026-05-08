package cz.jpmad.universalconfigvisualizer.api;

import cz.jpmad.universalconfigvisualizer.service.DockerComposeGraphParser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ParseControllerTests {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        ParseController controller = new ParseController(new DockerComposeGraphParser());
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void shouldReturnGraphJsonFromYamlInput() throws Exception {
        String yaml = """
                services:
                  app:
                    depends_on:
                      - db
                  db:
                    image: postgres
                """;

        mockMvc.perform(post("/api/parse")
                        .contextPath("/api")
                        .contentType("application/x-yaml")
                        .content(yaml))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.nodes.length()").value(2))
                .andExpect(jsonPath("$.edges.length()").value(1))
                .andExpect(jsonPath("$.edges[0].source").value("app"))
                .andExpect(jsonPath("$.edges[0].target").value("db"))
                .andExpect(jsonPath("$.edges[0].type").value("depends_on"));
    }

    @Test
    void shouldReturnBadRequestForInvalidYaml() throws Exception {
        String invalidYaml = "services: [app: bad";

        mockMvc.perform(post("/api/parse")
                        .contextPath("/api")
                        .contentType("application/x-yaml")
                        .content(invalidYaml))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Invalid docker-compose YAML input."));
    }
}
