# Stage 1: Build frontend (React)
FROM node:26-alpine AS frontend-build
LABEL author="petrsafrata"
LABEL description="Dockerfile for UniversalConfigVisualizer, a tool for visualizing and managing application configurations."
LABEL version="1.0.0"
LABEL org.opencontainers.image.source="https://github.com/petrsafrata/UniversalConfigVisualizer"

WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend (Spring Boot)
FROM maven:3.9.9-eclipse-temurin-17 AS backend-build
WORKDIR /workspace
COPY . .
COPY --from=frontend-build /frontend/dist/ /workspace/src/main/resources/static/
RUN chmod +x ./mvnw \
    && ./mvnw -q -DskipTests package \
    && cp /workspace/target/*.jar /workspace/app.jar

# Stage 3: Runtime (Apache + Backend)
FROM httpd:2.4-alpine
WORKDIR /app

# Copy frontend build to Apache htdocs
COPY --from=frontend-build /frontend/dist/ /usr/local/apache2/htdocs/

# Copy Apache config
COPY deploy/apache/httpd.conf /usr/local/apache2/conf/httpd.conf

# Copy backend JAR
COPY --from=backend-build /workspace/app.jar /app/app.jar

EXPOSE 80

# Start Apache
CMD ["httpd", "-D", "FOREGROUND"]