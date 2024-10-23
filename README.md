# ENECO Playwright Automation

ENECO Playwright is a suite of automated tests designed for the ENECO application, focusing on writing and executing test cases efficiently using Playwright.
Project Mainly focuses on:

## Project Focus
This project primarily focuses on:
  - Automating test cases for the ENECO application
  - Writing efficient and maintainable test 

## Table of Contents

- [ENECO Playwright Automation](#eneco-playwright-automation)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone repo](#clone-repo)
    -  [Env setup](#env-setup)
    - [Build](#build)
  - [Project Convention](#project-convention)
  - [Documentation](#documentation)
  - [Execution Setup](#execution-setup)
  -[Logger Setup](#logger-setup)

 ## Prerequisites
 
Before setting up this project, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/en/download/prebuilt-installer)
- **An IDE** (e.g., Visual Studio): [Visual Studio IDE](https://visualstudio.microsoft.com/)
- **TypeScript**
- **Playwright**

## Installation

### Clone repo

Clone this repository to your local machine:

```bash
git clone https://github.com/Ravivish1185/Qa-Engineering-Challenge-ui.git
```
### Install dependencies

$ npm init playwright@latest

![Alt text](guide-playwright-install-image.png)

$ npm i winston-daily-rotate-file

$ npm i monocart-reporter

### Env setup

Create new file `.env` based on `.env.example` file. Update values for `.env` before running the project. 
To execute in `ENECO` set ENECO_BASE_URL and credentials for eneco website in `.env`

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

## Project Convention

In the repo you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
ENECO_UI_AUTOMATION_PW
├── pages              # Page Object Model (POM)
├── test-data          # Test data files
├── tests              # Test suites organized by feature
│   ├── calculate-monthly-amount
└── utils              # Utility functions
```


## Documentation

- [Playwright](https://playwright.dev)

- **Typescript**
  - [Typescript](https://www.typescriptlang.org/docs/)
  - This consists of tsconfig.json file with configuration for the typescript compiler.

## Execution Setup 
 - All the test releated to UI are in one folder 
 - command to run the script in headless true mode `npx playwright test tests` 
 - command to run the script in headless false mode `npx playwright test tests --headed`
 - command to run the script in debug mode `npx playwright test tests --debug`
 - command to run the script in playwright ui mode `npm run play`

 ## Execution Report Summary from monocart-reporter
![Alt text](execution-test-report.png) 
- To view monocart show-report
`npx monocart show-report test-results/2024-10-23/index.html`

 ## Logger Setup 
 - All the information related to warnings ,errors stored in `eneco-logs` folder in `eneco-ui-run.log` file 
 
