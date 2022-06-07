# Cypress Cucumber - Template

This repository is a template directory structure for use with <https://github.com/colinmo/cypress-cucumber>. `Cypress-Cucumber` builds a docker container that can run Cypress Tests and Cypress-Cucumber Tests via command line. This repository has the directory structure that repository expects.

## Cypress Basic testing

Cypress scripts go under `/cypress`. Use the command `make test-cypress` to run the command against the docker image `cypress2`

## Cypress Cucumber testing

Feature files go under `/feature`, with accompanying cypress commands in a directory with the same name as the feature (e.g. `/feature/cyp2.js`). Use the command `make test-gherk` to run the command against the docker image `cypress2`

# Environment variables

The test files pass through `${ECOUSER}` and `${ECOPASS}` environment variables by default - remove this line in the Makefile if you don't pass environment variables / change it to be your environment variables if you do.

# Troubleshooting

To access the `cypress2` container in interactive mode, run `make interactive`. You can then run commands as required.
