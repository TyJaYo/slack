# Extract Message

This is a Slack app I made for the sole purpose of adding a Workflow Builder step. The step itself is the custom function written in [extract_message.ts](https://github.com/TyJaYo/slack/blob/main/extract-message/functions/extract_message.ts) and registered in [manifest.ts](https://github.com/TyJaYo/slack/blob/main/extract-message/manifest.ts). Once deployed to your workspace (see instructions below), it makes a custom step available in the new Workflow Builder. The step must be populated with the channel ID and timestamp of the message you want the text from:

<img width="200" alt="image" src="https://github.com/TyJaYo/slack/assets/10833927/8e6015f4-0d33-45cd-bf00-35eae88213eb">

This makes a new variable called "Message Text" available in subsequent steps. In my case, I put it in a spreadsheet:

<img width="200" alt="image" src="https://github.com/TyJaYo/slack/assets/10833927/5d30cedd-2592-4746-9c40-aafcf94bab3e">

---

**Guide Outline**

- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Create a Slack App](#create-a-slack-app)
  - [Update Local Files](#update-local-files)
- [Deploying Your App](#deploying-your-app)
- [Viewing Activity Logs](#viewing-activity-logs)
- [Project Structure](#project-structure)
- [Resources](#resources)

---

## Setup

Before getting started, first make sure you have a development workspace where
you have permission to install apps. **Please note that the features in this
project require that the workspace be part of
[a Slack paid plan](https://slack.com/pricing).**

### Install the Slack CLI

To use this app, you need to install and configure the Slack CLI.
Step-by-step instructions can be found in Slack's
[Quickstart Guide](https://api.slack.com/automation/quickstart).

### Create a Slack App

```zsh
# Use the CLI to spin up the app structure
slack create extract-message

# Change into the project directory
cd extract-message
```

### Update Local Files

You'll need the two files mentioned above. The former ([extract_message.ts](https://github.com/TyJaYo/slack/blob/main/extract-message/functions/extract_message.ts)) goes in a subdirectory called 'functions' that you will need to create. The latter ([manifest.ts](https://github.com/TyJaYo/slack/blob/main/extract-message/manifest.ts)) must replace the manifest.ts file instantiated by `slack create` in the previous step.

## Deploying Your App

From within the app directory entered above using `cd`, deploy the app to Slack infrastructure using
`slack deploy`:

```zsh
slack deploy
```

## Viewing Activity Logs

Activity logs of your application can be viewed live and as they occur with the
following command:

```zsh
slack activity --tail
```

This can be very useful in debugging an implementation of this code as it runs (or tries to run) in your workspace. I have not included any error handling or helpful failure messages in this code, so it will either work perfectly or implode mysteriously. A common issue is not inviting the bot to the channel in which it needs to eavesdrop to retrieve the message.

## Project Structure (common to all Slack apps)

### `.slack/`

Contains `apps.dev.json` and `apps.json`, which include installation details for
development and deployed apps.

### `datastores/`

[Datastores](https://api.slack.com/automation/datastores) securely store data
for your application on Slack infrastructure. Required scopes to use datastores
include `datastore:write` and `datastore:read`.

### `functions/`

[Functions](https://api.slack.com/automation/functions) are reusable building
blocks of automation that accept inputs, perform calculations, and provide
outputs. Functions can be used independently or as steps in workflows.

### `triggers/`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are run. A trigger file describes the scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

### `workflows/`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps
(functions) that are executed in order.

Workflows can be configured to run without user input or they can collect input
by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `manifest.ts`

The [app manifest](https://api.slack.com/automation/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

## Resources

To learn more about developing automations on Slack, visit the following:

- [Automation Overview](https://api.slack.com/automation)
- [CLI Quick Reference](https://api.slack.com/automation/cli/quick-reference)
- [Samples and Templates](https://api.slack.com/automation/samples)

## Disclaimers

I do not work for Slack. I made this to meet my own needs and learn about developing Slack apps. I'm sharing it freely here so that people who just want the thing to do the thing can just have the thing that makes the thing do the thing. I'm open to pull requests, or you can also just take this and run with it on your own if you want. I don't even care if you find some way to make money from it. I hope it becomes possible within Slack without a premium.
