# source https://github.com/umotif-public/terraform-aws-elasticache-redis
module "redis" {
  source = "umotif-public/elasticache-redis/aws"
  version = "~> 3.0.0"

  name_prefix           = var.redis_name_prefix
  node_type             = var.redis_node_type

  engine_version        = var.redis_engine_version
  port                  = 6379

  automatic_failover_enabled = true
  apply_immediately = true
  family            = var.redis_family
  description       = "Test elasticache redis."

  subnet_ids = module.vpc.private_subnets
  vpc_id     = module.vpc.vpc_id

  ingress_cidr_blocks = [var.vpc_cidr]
}
