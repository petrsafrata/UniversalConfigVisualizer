package cz.jpmad.universalconfigvisualizer.service;

/**
 * Exception thrown when the provided compose file format is invalid.
 */
public class InvalidComposeFormatException extends RuntimeException {

    public InvalidComposeFormatException(String message, Throwable cause) {
        super(message, cause);
    }
}

