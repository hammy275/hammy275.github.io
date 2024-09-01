# hammy275.github.io

This site currently serves exclusively as documentation for ImmersiveMC.

## Building

With Docker installed, run `docker compose up`. The documentation will be built with Docker, with the documentation placed in `./build`, overwriting whatever was there before. To view the built documentation in this manner, one must run an HTTP server from the `build/` directory, as browsers may mess up the relative pathing for local file-system browsing.