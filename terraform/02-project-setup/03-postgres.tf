resource "aws_db_instance" "postgres" {
  engine = var.postgres_engine
  engine_version = var.postgres_engine_version
  family = var.postgres_family
  major_engine_version = var.postgres_major_engine_version
  instance_class = var.postgres_instance_class

  allocated_storage = var.postgres_allocated_storage
  max_allocated_storage = var.postgres_max_allocated_storage

  db_name = var.postgres_db_name
  username = var.postgres_username
  password = var.postgres_password
  port = var.postgres_port

  backup_window = var.postgres_backup_window
  backup_retention_period = var.postgres_backup_retention_period
}
