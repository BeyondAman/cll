module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "15.0.0"

  cluster_name    = "${var.cluster_name}"
  cluster_version = var.master_version_prefix
  subnets         = module.vpc.private_subnets
  enable_irsa = true

  vpc_id = module.vpc.vpc_id

  node_groups = var.cluster_node_groups

  depends_on = [module.vpc]
}

data "aws_iam_policy_document" "sm-oidc" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    condition {
      test = "StringEquals"
      variable = "${replace(data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer, "https://", "")}:sub"

      values = [
        # will be used by external secrets to get secrets from AWS secret manager
        "system:serviceaccount:${var.external_secrets_namespace}:${var.external_secrets_sa}"
      ]
    }

    principals {
      type        = "Federated"
      identifiers = [module.eks.oidc_provider_arn]
    }
  }
}

data "aws_iam_policy_document" "sm-ro-policy" {
  statement {
    sid    = ""
    effect = "Allow"
    actions = [
      "secretsmanager:GetResourcePolicy",
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret",
      "secretsmanager:ListSecretVersionIds"
    ]
    resources = [
      "${aws_secretsmanager_secret.demo.arn}/*"
    ]
  }
  statement {
    sid    = ""
    effect = "Allow"
    actions = [
      "secretsmanager:GetRandomPassword",
      "secretsmanager:ListSecrets"
    ]
    resources = [ "*" ]
  }
}

resource "aws_iam_policy" "sm-accessor-policy" {
  name   = "secret-manager-accessor"
  path   = "/"
  policy = data.aws_iam_policy_document.sm-ro-policy.json
}
 
resource "aws_iam_role" "sm-accessor-role" {
  name               = "sm-accessor"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.sm-oidc.json
}
 
resource "aws_iam_role_policy_attachment" "sm-accessor" {
  role       = aws_iam_role.sm-accessor-role.name
  policy_arn = aws_iam_policy.sm-accessor-policy.arn
}

resource "kubernetes_service_account" "kubernetes-external-secrets" {
  metadata {
    name = var.external_secrets_sa
    namespace = var.external_secrets_namespace

    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.sm-accessor-role.arn
    }
  }
}
