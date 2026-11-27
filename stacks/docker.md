# Docker

Docker runs your app in containers. A container needs a runtime on your machine to run

Links:

- [Docker Docs](https://docs.docker.com)
- [Docker Engine](https://docs.docker.com/engine)
- [Docker Desktop](https://docs.docker.com/desktop)
- [OrbStack](https://orbstack.dev)
- [Kiri](https://runkiri.com)
- [Colima](https://colima.run)
- [Podman](https://podman.io)
- [Lazydocker](https://github.com/jesseduffield/lazydocker)

## Runtimes

A runtime is the app that runs containers. Run one runtime at a time. Two can clash over ports and the Docker socket

| Runtime                           | Runs on             | What it is                                                |
| --------------------------------- | ------------------- | --------------------------------------------------------- |
| Docker Engine (Community Edition) | Linux               | Official engine. Runs with no VM, so it is the lightest   |
| Docker Desktop                    | Mac, Windows, Linux | Official app with a window. Runs a VM and uses much RAM   |
| OrbStack                          | Mac                 | Fast on Mac, and uses less RAM than Docker Desktop        |
| Kiri                              | Mac, Windows, Linux | Fast and light                                            |
| Colima                            | Mac, Linux          | Command line only, free and open source                   |
| Podman                            | Mac, Linux, Windows | No background service. Some commands differ from `docker` |
| Lazydocker                        | Any runtime above   | Terminal app to view containers. It is not a runtime      |

## Pick one

- On Linux, use Docker Engine
- On Mac, skip Docker Desktop if it feels slow. Try OrbStack or Kiri
- Want no window and a free tool? Use Colima
- Want no background service? Use Podman. Check its commands first, since some differ from `docker`
- Want a terminal view of containers? Add Lazydocker on top of any runtime

## Switch runtime

1. Quit the old runtime before you start the new one
2. Start the new runtime
3. Check it with `docker info`
4. Check Compose with `docker compose version`. This repo needs Docker Compose 2.24.4 or later. See the [Environments](../docs/guides/environments.md) guide
5. Images and volumes stay in the old runtime. Pull images again, and restore any volume data you need from a backup
