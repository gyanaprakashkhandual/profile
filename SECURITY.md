# Security Policy

## Overview

This repository contains only static profile data, resume templates, and presentation materials. It does not include backend services, authentication systems, or sensitive infrastructure. Security risks are minimal by design.

## Sensitive Data

If you fork or adapt this repository for your own use, **do not commit** the following to version control:

- Real API keys or tokens
- Private contact details you don't intend to make public
- Credentials of any kind

Review `data/data.json` before pushing to ensure only intended information is included.

## Reporting a Vulnerability

If you discover a security concern — such as an inadvertent exposure of sensitive data in this repository — please report it responsibly:

1. **Do not open a public issue.**
2. Contact the maintainer directly via the contact details in `data/data.json` or through the platforms listed in the profile materials.
3. Include a clear description of the concern and any relevant details.

You can expect an acknowledgment within **48 hours** and a resolution or update within **7 days**.

## Dependency Security

This project uses minimal dependencies. If you extend it with additional packages, ensure they are kept up to date and audited regularly using tools like `npm audit`.
