# Standup Checker

Is standup going to be on Slack or Zoom?

This script is a companion to Keyboard Maestro.

Running the script will create a `standupFormat` variable in Keyboard Maestro and set it to a
string of either `zoom` or `slack`.

## Setup

### Prerequisites
* Keyboard Maestro
* yarn
* node

### Installation

Install `node-jxa` globally.

```console
$ yarn global add node-jxa
```
Replace the `node-jxa.js` file in the package with the file in `./docs/node-jxa.js`. The package's
file has invalid code that breaks the package.

```console
$ cp ./docs/node-jxa.js ~/.config/yarn/global/node_modules/node-jxa/node-jxa.js
```

Install Standup Checker.

```console
$ yarn
$ yarn build:global
```

## Usage

The script executable globally.

From terminal, run
```console
$ standup-checker
```
Open `Keyboard Maestro` and go to `Preferences > Variables`.
Look for the `standupFormat` variable.

### Keyboard Maestro Setup

1. Create a new macro or use an existing one.
2. Add a new Action.
3. Select `Execute` > `Execute a Shell Script`.
4. In the new Action window, set it to:
    - With input from `Nothing`.
    - `Execute text script`.
    - `ignore results`.
5. Add this to the text field:
    ```bash
    PATH=/usr/local/bin:$PATH
    standup-checker
    ```
    NOTE: `Keyboard Maestro` and `Automator` do not reference the system's PATH, and therefore
    need it specified in order to know where the global scripts are.

## TO DO

* Output `zoom` and `slack` as strings, so that script can be used by other automating tools
  besides `Keyboard Maestro`.
