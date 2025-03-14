# Dockerfile for building the image used for building the documentation.

FROM ubuntu:latest

# Install OpenJDK
RUN apt update
RUN apt install openjdk-21-jdk git -y

# Do a build so gradle and such are set up
RUN git clone https://github.com/hammy275/immersive-mc.git
WORKDIR "/immersive-mc"
RUN chmod +x ./gradlew
RUN ./gradlew build

# Install dependencies for Jekyll building
RUN apt install ruby-full build-essential zlib1g-dev -y
RUN gem install jekyll bundler
RUN bundle config --global silence_root_warning 1

WORKDIR "/"