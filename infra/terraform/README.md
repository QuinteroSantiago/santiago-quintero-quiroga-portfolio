# santiagoq.com infrastructure

This stack creates a new static-site deployment in the currently authenticated AWS account:

- a private, encrypted, versioned S3 bucket
- a CloudFront distribution with Origin Access Control and SPA route fallbacks
- an ACM certificate for `santiagoq.com` and `www.santiagoq.com`
- Route 53 alias records for IPv4 and IPv6
- a GitHub Actions OIDC role scoped to this repository's `main` branch

It does not read, modify, or depend on the existing `santiagoquinteroquiroga.com` account.

## Prerequisites

- Terraform 1.6 or newer
- AWS credentials for the new account
- access to Route 53 hosted zone `Z0018326BGLJ3PVWQ415` in the new AWS account

## Apply

Select the new AWS account explicitly and verify its account ID before creating anything:

```bash
export AWS_PROFILE=santiagoq
aws sts get-caller-identity
```

Then initialize the stack:

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

The defaults use the existing `santiagoq.com` hosted zone `Z0018326BGLJ3PVWQ415`, so no name-server migration is required. Confirm that the hosted zone belongs to the same AWS account returned by `aws sts get-caller-identity`.

If you intentionally configure Terraform to create a different hosted zone, DNS must be delegated before ACM can validate the certificate. Use this two-stage flow:

```bash
terraform apply -target=aws_route53_zone.site
terraform output route53_name_servers
```

Set those four name servers at the registrar, wait for delegation to resolve, and then run a normal `terraform apply`.

If a Route 53 hosted zone already exists in the new account, set `create_hosted_zone = false` and provide its `hosted_zone_id`. If DNS is hosted in another AWS account or outside Route 53, this stack should be adjusted so certificate validation and site aliases are managed by that DNS owner.

## Connect GitHub Actions

After the full apply, create these GitHub repository variables from the matching Terraform outputs:

| GitHub variable | Terraform output |
| --- | --- |
| `AWS_DEPLOY_ROLE_ARN` | `github_deploy_role_arn` |
| `AWS_ACCOUNT_ID` | `aws_account_id` |
| `AWS_REGION` | `aws_region` |
| `AWS_S3_BUCKET` | `s3_bucket_name` |
| `CLOUDFRONT_DISTRIBUTION` | `cloudfront_distribution_id` |

The deploy workflow uses 15-minute GitHub OIDC credentials and verifies that AWS returned credentials for the expected account. The role can only upload/delete objects in this site's bucket and invalidate this site's CloudFront distribution.

The GitHub OIDC provider is account-wide. If it already exists, set `create_github_oidc_provider = false` and pass its ARN in `github_oidc_provider_arn`.

## State

Terraform state is local by default so this stack can bootstrap a completely new account. Do not commit `terraform.tfstate` or `terraform.tfvars`. Before sharing infrastructure maintenance, migrate state to an encrypted, locked remote backend.
