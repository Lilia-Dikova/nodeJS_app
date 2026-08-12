# Node.js Preview App

Tiny dependency-free Node.js app for testing GitHub deployment, auto-deploy, manual upload, and environment variables.

## Local Preview

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Deployment Settings

- Start command: `npm start`
- Build command: leave empty
- Output directory: leave empty, `.`, or whatever the platform expects for a no-build Node.js app
- Root directory: `.`
- Package manager: `npm`

## Push Test

Edit the text in:

```text
public/index.html
```

Commit and push the change to the monitored branch. After auto-deploy finishes, refresh the deployed app and check that the text changed.

## Environment Variable Test

Add this variable in Deployment Options:

```text
PREVIEW_MESSAGE=Hello from Site Tools env vars
```

Then visit:

```text
/api/status
```

The JSON response should include your custom message.
