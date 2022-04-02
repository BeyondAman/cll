# Postgres configurations
postgres_engine = "postgres"
postgres_engine_version = "14.1"
postgres_family = "postgres14" # DB parameter group
postgres_major_engine_version = "14"         # DB option group
postgres_instance_class = "db.t4g.large"
postgres_allocated_storage = 20
postgres_max_allocated_storage = 100
postgres_db_name = "demo"
postgres_username = "admin"
postgres_password = "admin" # NOTE: change these values as per requirement
postgres_port = 5432
postgres_backup_window = "03:00-06:00"
postgres_backup_retention_period = 15


# Redis configurations
redis_name_prefix = "demo-redis"
redis_node_type = "cache.t3.small"
redis_engine_version = "6.x"
redis_family = "redis6.x"

# Secret Manager
db_creds_secret_name = "demo/db_creds" # Name of secret in which db creds would be stored
redis_creds_secret_name = "demo/redis_creds" # Name of secret in which redis creds would be stored
external_secrets_namespace = "external-secrets" # namespace in which external secrets controller would be deployed
external_secrets_sa = "kubernetes-external-secrets" # SA to be used to get secrets from AWS Secret Manager

# EKS cluster configurations
cluster_name = "demo-cluster"
environment = "demo-cluster"

region = "us-west-2"

vpc_cidr = "10.97.240.0/20"
vpc_private_subnets =  ["10.97.240.0/22", "10.97.244.0/22"]
vpc_public_subnets = ["10.97.248.0/22", "10.97.252.0/22"]

master_version_prefix = "1.21"

cluster_node_groups = {
  node_pool_a = {
    desired_capacity = 5
    max_capacity     = 10
    min_capacity     = 5

    instance_type = "t3.xlarge"
  }
}
