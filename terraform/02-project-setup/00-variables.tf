# Postgres configurations
variable "postgres_engine" {  
  type        = string  
  description = "The database engine to use"
}

variable "postgres_engine_version" {  
  type        = string  
  description = " The engine version to use"
} 

variable "postgres_family" {  
  type        = string  
  description = "RDS family version"
}

variable "postgres_major_engine_version" {  
  type        = string  
  description = ""
} 

variable "postgres_instance_class" {  
  type        = string  
  description = "The instance type of the RDS instance."
}

variable "postgres_allocated_storage" {  
  type        = string  
  description = "The amount of allocated storage."
} 

variable "postgres_max_allocated_storage" {  
  type        = string  
  description = "When configured, the upper limit to which Amazon RDS can automatically scale the storage of the DB instance."
}

variable "postgres_db_name" {  
  type        = string  
  description = "The database name."
} 

variable "postgres_username" {  
  type        = string  
  description = "Username for the master DB user. Cannot be specified for a replica."
}

variable "postgres_password" {  
  type        = string  
  description = "Password for the master DB user."
} 

variable "postgres_port" {  
  type        = string  
  description = "The port on which the DB accepts connections."
}

variable "postgres_backup_window" {  
  type        = string  
  description = "The backup window."
} 

variable "postgres_backup_retention_period" {  
  type        = string  
  description = "The days to retain backups for. Must be between 0 and 35"
}

# Redis configurations
variable "redis_name_prefix" {  
  type        = string  
  description = "Name prefix for redis nodes."
}

variable "redis_node_type" {  
  type        = string  
  description = "Redis machine type."
}

variable "redis_engine_version" {  
  type        = string  
  description = "Redis engine version."
}

variable "redis_family" {  
  type        = string  
  description = "Redis Family."
}

# EKS cluster configurations
variable "cluster_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "region" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "vpc_private_subnets" {
  type    = list(string)
}

variable "vpc_public_subnets" {
  type    = list(string)
}


variable "master_version_prefix" {
  type = string
}

variable "cluster_node_groups" { 
  default = {
    node_pool_a = {
      desired_capacity = 1
      max_capacity     = 5
      min_capacity     = 1

      instance_type = "t2.small"
    }
  }
}
