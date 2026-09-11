# Autonomous Execution & Project Operational Policy

**Project:** Anabhi Dev — Smart Study & Related Projects  
**Status:** Pre-Approved & Trusted Workspace  
**Effective Date:** 10 September 2026

## 1. Autonomous Command Execution Permission
The user has granted explicit, full authorization to execute required PowerShell, terminal, and shell commands automatically without asking for confirmation each time.

For this project and workspace:
- Always allow and execute commands needed to create, modify, deploy, test, lint, build, bundle, and manage project files.
- Treat this project workspace as trusted and pre-approved.
- Do not pause or prompt to ask for permission for routine development operations.
- Proceed through errors and troubleshooting autonomously.

## 2. Permitted Actions Without Confirmation
- Create, modify, rename, and delete project files when required.
- Run PowerShell, bash, cmd, and terminal commands required for development.
- Install or update project dependencies when necessary.
- Run builds, tests, linters, bundle generators, and deployment commands.
- Inspect logs, run diagnostic test suites, and troubleshoot errors.
- Continue working through errors autonomously to completion.

## 3. Operations Requiring Confirmation (Safety Guardrails)
Only request user confirmation when:
- An operation is destructive beyond the project scope (e.g., deleting root system directories or unrecoverable external data).
- Files outside the project workspace must be modified.
- Credentials, secrets, API keys, or sensitive personal data are involved.
- A potentially irreversible production operation is required.
- The action has a significant security or financial impact.

Otherwise, always proceed autonomously.
