# Personal Portfolio Website

## Overview
This repository contains the source code for my personal portfolio website. It is designed to showcase my projects, skills, and professional information.

## Technologies Used
- **HTML/CSS/JavaScript**: For structuring and styling the website.
- **Node.js**: Used for building and deploying the website.
- **GitHub Actions**: Automates deployment and version management.
- **AWS S3 & CloudFront**: For hosting and delivering the website content globally.

## Workflow
### Deployment
The website is automatically built and deployed to AWS S3 whenever changes are pushed to the `main` branch. This ensures that the latest version of the website is always available.

### Versioning
The project uses semantic versioning (`major.minor.patch`). Version numbers are automatically incremented based on commit messages:
- Commits with `[major]` in the message trigger a major version increment.
- Commits with `[minor]` in the message trigger a minor version increment.
- All other commits trigger a patch increment.

### Automatic Versioning Workflow
A separate GitHub Actions workflow handles version management. It checks commit messages to determine the appropriate version increment and updates the project version accordingly.

### TODO
- [ ] Add core exercises to lowest running time routine