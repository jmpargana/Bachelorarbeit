# Bachelorarbeit

This repository contains a web application, which consists of both
a website where users can create multiple choice questions and upload
textbooks, and scripts to forward the servers data to an amazon server, which
will allow the user to interact with this data via he's Alexa device.

## Usage

The server can be deployed in a docker container with the two commands.
(it won't work without the API keys needed to set it up with Auth0)

You can see a demo deployment in [heroku](https://alexastudyingassistant.herokuapp.com)

```bash
make build
make run
```
