output "site_urls" {
  description = "Public URLs served by the distribution."
  value       = [for alias in local.domain_aliases : "https://${alias}"]
}

output "s3_bucket_name" {
  description = "Set this as the GitHub Actions AWS_S3_BUCKET repository variable."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Set this as the GitHub Actions CLOUDFRONT_DISTRIBUTION repository variable."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "AWS-generated CloudFront hostname."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "github_deploy_role_arn" {
  description = "Set this as the GitHub Actions AWS_DEPLOY_ROLE_ARN repository variable."
  value       = aws_iam_role.github_deploy.arn
}

output "aws_region" {
  description = "Set this as the GitHub Actions AWS_REGION repository variable."
  value       = var.aws_region
}

output "aws_account_id" {
  description = "Set this as the GitHub Actions AWS_ACCOUNT_ID repository variable."
  value       = data.aws_caller_identity.current.account_id
}

output "route53_name_servers" {
  description = "When a hosted zone is created, configure these name servers at the domain registrar before the full apply."
  value       = var.create_hosted_zone ? aws_route53_zone.site[0].name_servers : []
}
