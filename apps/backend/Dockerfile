# Stage 1: Build Application Bundle
FROM maven:3.9-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Runtime Container
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 4000
ENTRYPOINT ["java", \
  "-XX:+UseG1GC", \
  "-Xms128m", "-Xmx512m", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
