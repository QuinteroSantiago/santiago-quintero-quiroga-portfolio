variable "aws_region" {
  description = "AWS region for the S3 bucket. The ACM certificate is always created in us-east-1 for CloudFront."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Apex domain served by CloudFront."
  type        = string
  default     = "santiagoq.com"
}

variable "bucket_name" {
  description = "Optional globally unique S3 bucket name. Defaults to <domain>-<AWS account ID>."
  type        = string
  default     = null
}

variable "create_hosted_zone" {
  description = "Create a new public Route 53 hosted zone. Set to false when using an existing zone in this AWS account."
  type        = bool
  default     = false
}

variable "hosted_zone_id" {
  description = "Existing Route 53 hosted zone ID. Required when create_hosted_zone is false."
  type        = string
  default     = "Z0018326BGLJ3PVWQ415"

  validation {
    condition     = var.create_hosted_zone || var.hosted_zone_id != null
    error_message = "hosted_zone_id must be set when create_hosted_zone is false."
  }
}

variable "github_repository" {
  description = "GitHub repository allowed to assume the deployment role, in owner/repository format."
  type        = string
  default     = "QuinteroSantiago/santiago-quintero-quiroga-portfolio"
}

variable "github_branch" {
  description = "GitHub branch allowed to assume the deployment role."
  type        = string
  default     = "main"
}

variable "create_github_oidc_provider" {
  description = "Create the account-wide GitHub Actions OIDC provider. Set to false if one already exists in this AWS account."
  type        = bool
  default     = true
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub Actions OIDC provider ARN. Required when create_github_oidc_provider is false."
  type        = string
  default     = null

  validation {
    condition     = var.create_github_oidc_provider || var.github_oidc_provider_arn != null
    error_message = "github_oidc_provider_arn must be set when create_github_oidc_provider is false."
  }
}

variable "cloudfront_price_class" {
  description = "CloudFront edge location price class."
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.cloudfront_price_class)
    error_message = "cloudfront_price_class must be PriceClass_100, PriceClass_200, or PriceClass_All."
  }
}

variable "tags" {
  description = "Tags applied to supported resources."
  type        = map(string)
  default = {
    Application = "santiagoq-portfolio"
    ManagedBy   = "Terraform"
  }
}
