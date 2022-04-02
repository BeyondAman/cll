# add secret to store postgres db creds 
resource "aws_secretsmanager_secret" "db_creds" {
  name = var.db_creds_secret_name
}

variable "db_secret" {
  default = {
    TYPEORM_USERNAME = var.postgres_username
    TYPEORM_PASSWORD = var.postgres_password
    TYPEORM_HOST = aws_db_instance.postgres.address
  }

  type = map(string)
}

resource "aws_secretsmanager_secret_version" "db_creds" {
  secret_id     = aws_secretsmanager_secret.db_creds.id
  secret_string = jsonencode(var.db_secret)
}

# add secret to store redis creds 
resource "aws_secretsmanager_secret" "redis_creds" {
  name = var.redis_creds_secret_name
}

variable "redis_secret" {
  default = {
    REDIS_HOST = module.redis.elasticache_replication_group_primary_endpoint_address
  }

  type = map(string)
}

resource "aws_secretsmanager_secret_version" "redis_creds" {
  secret_id     = aws_secretsmanager_secret.redis_creds.id
  secret_string = jsonencode(var.redis_secret)
}
