package cz.jpmad.universalconfigvisualizer;

import cz.jpmad.universalconfigvisualizer.cli.ConfigVizCliRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UniversalConfigVisualizerApplication {

    public static void main(String[] args) {
        if (ConfigVizCliRunner.tryRun(args)) {
            return;
        }
        SpringApplication.run(UniversalConfigVisualizerApplication.class, args);
    }

}
