# Requirements

- Node v12
- Yarn v1.22.4
- Postgres v12
- Redis v5

# Installation

- Run `yarn`

# Execution

- Run `yarn start`

### Environment Variables

The following environment variables are supported:
| Name | Type | Description |Default |
|---|---|---|---|
| TYPEORM_HOST| string | Database host | localhost|
| TYPEORM_USERNAME| string | Database Username | pguser|
| TYPEORM_PASSWORD| string | Database Password | pgpass|
| TYPEORM_DATABASE| string | Database Name | pgdb|
| TYPEORM_PORT| number | Database host port | 5432|
| REDIS_HOST| string | Redis host | localhost|
| REDIS_PORT| string | Redis host port | 6379|
| REDIS_PASSWORD| string | Redis password | |
| PORT| string | HTTP server port | 3030|
