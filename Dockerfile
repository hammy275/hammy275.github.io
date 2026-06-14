# Dockerfile for building the image used for building the documentation.

FROM ubuntu:latest

# Install OpenJDK
RUN apt update
RUN apt install openjdk-25-jdk git -y

# Do a build so gradle and such are set up
RUN git clone https://github.com/hammy275/immersive-mc.git
WORKDIR "/immersive-mc"
RUN chmod +x ./gradlew
RUN ./gradlew build

# Install dependencies for building
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install npm rsync -y

WORKDIR "/"