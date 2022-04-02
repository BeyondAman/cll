# Demo - 3-tier dockerized application

## Introduction
This repository contains a architecture for a scalable and secure 3-tier Node application.

## Requirements

The system components are as follows:

1. Client -- A statically built front-end that is served to browsers.
   - makes HTTP requests to the API server (2)
2. HTTP Server -- Serves an HTTP API that is consumed by the client (1).
   - requires Redis (3) and Postgresql (4) services to operate.
3. Redis -- A redis service that operates as a cache for the server
   - does not have any persistence requirements
   - needs to be configured via the provided `./redis/redis.conf` file as a bind-mount
4. Postgresql -- A postgresql service that operates as a persistence layer for the server
   - needs persistence across service interuptions such as restarts.

The 4 above services need to communicate to each other, and be orchestrated via docker-compose.

## Directory Structure

- `./client`: contains a simple React based frontend app that calls backend APIs
- `./server`: contains Nodejs backend codebase that contains an API
- `./redis`: contains `redis.conf` configuration file 

## Local Setup

### Prerequisite
- Tools: [Docker](https://docs.docker.com/get-docker/), [docker-compose](https://docs.docker.com/compose/install/)

### Start Applications

```bash
$ cd ./application
$ docker-compose up -d
```

### Check logs

```bash
$ docker-compose logs -f
```

**NOTE**:
- Backend server would be running at: `http://localhost:3030/`
- Frontend app would be running at: `http://localhost:8080/`

### Stop Applications

```bash
$ docker-compose down 
```
