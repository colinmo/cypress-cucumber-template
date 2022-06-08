/// <reference types="cypress" />
// https://on.cypress.io/introduction-to-cypress

const specTitle = require("cypress-sonarqube-reporter/specTitle");
Cypress.config('baseUrl', 'https://analysis-tools.dev.ecocommons.org.au');

describe(specTitle('In order to use the analysis features; as a User; I should be able to find the options and see analysis progress'), () => {
    beforeEach(() => {
        cy.clearCookies()
    })

    it('The page prompts me with options', () => {
        // Given I am on the home page
        cy.visit('/')
        // Then the Analysis Hub should be active
        cy.get('div[data-active-tab="analysis-hub"]')
        // And I should see "Modelling Wizards"
        cy.get('div').should('contain', 'Modelling Wizards')
        // And I should see "Coding Cloud"
        cy.get('div').should('contain', 'Coding Cloud')
    })

    it('I can sign in', () => {
        cy.visit('/')
        cy.get('button')
            .should('contain', 'Sign in / Register')
        cy.login()
    })

    it('Modelling Wizards shows bccvl and risk mapping', () => {
        cy.visit('/');
        cy.get('a').contains('Modelling Wizards').click()
        cy.get('a[href^="https://bccvl-job-composer.dev.ecocommons.org.au"]')
            .should('contain', 'Biodiversity and Climate Change Virtual Laboratory')
        cy.get('a[href^="https://workflow.dev.ecocommons.org.au/template?create=bsrmap"]')
            .should('contain', 'Risk Mapping')
    })

    it('Coding Cloud servers requires login', () => {
        cy.visit('/');
        cy.get('a').contains('Coding Cloud').click()
        cy.get('button')
            .should('not.contain', 'Launch notebook server', {
                timeout: 2000
            })
    })

    it('Coding Cloud server "Notebook" can be started', () => {
        cy.login()
        cy.get('a')
            .contains('Coding Cloud')
            .click()
        cy.get('button', {
                timeout: 120000
            })
            .should('contain', 'Launch notebook server')
        cy.get('button').filter(':contains("Launch notebook server")').click()

        // Modal popup to choose type
        cy.get('label > input[value="ecocommons-scipy-environment"]')
            .parent()
            .click()
        // NOTE: The label doesn't contain the label, this is not accessible
        cy.get('.bp3-dialog-footer button')
            .filter(':contains("Launch")')
            .click()

        // Pending machine start
        cy.get('td', {timeout: 10000})
            .should('contain', 'PENDING')
        cy.get('td')
            .should('contain', 'EcoCommons SciPy environment')

        cy.get('td', {
                timeout: 120000
            })
            .should('not.contain', 'PENDING')

        // Machine running, check launch works
        cy.get('td')
            .should('contain', 'RUNNING')
        cy.window()
            .then((win) => {
                cy.stub(win, 'open').as('redirect');
            });
        cy.get('td button').filter(':contains("Open")').click()

        cy.get('@redirect')
            .should('be.calledWith', 'https://jupyterhub.dev.ecocommons.org.au/hub/oauth_login?next=%2Fhub%2F');

        // Shutdown the machine
        cy.get('td button[title="Shutdown server instance"]').click({force: true})

        cy.get('td', {
                timeout: 120000
            })
            .should('not.contain', 'RUNNING')
    })

    it('Coding Cloud server "Datascience" can be started', () => {
        cy.login()
        cy.get('a')
            .contains('Coding Cloud')
            .click()
        cy.get('button', {
                timeout: 120000
            })
            .should('contain', 'Launch notebook server')
        cy.get('button').filter(':contains("Launch notebook server")').click()

        // Modal popup to choose type
        cy.get('label > input[value="datascience-environment"]')
            .parent()
            .click()
        // NOTE: The label doesn't contain the label, this is not accessible
        cy.get('.bp3-dialog-footer button')
            .filter(':contains("Launch")')
            .click()

        // Pending machine start
        cy.get('td', {timeout: 10000})
            .should('contain', 'PENDING')
        cy.get('td')
            .should('contain', 'Datascience environment')

        cy.get('td', {
                timeout: 120000
            })
            .should('not.contain', 'PENDING')

        // Machine running, check launch works
        cy.get('td')
            .should('contain', 'RUNNING')
        cy.window()
            .then((win) => {
                cy.stub(win, 'open').as('redirect');
            });
        cy.get('td button').filter(':contains("Open")').click()

        cy.get('@redirect')
            .should('be.calledWith', 'https://jupyterhub.dev.ecocommons.org.au/hub/oauth_login?next=%2Fhub%2F');

        // Shutdown the machine
        cy.get('td button[title="Shutdown server instance"]').click({force: true})

        cy.get('td', {
                timeout: 120000
            })
            .should('not.contain', 'RUNNING')
    })

    it('Coding Cloud server "EcoCommons R" can be started', () => {
        cy.login()
        cy.get('a')
            .contains('Coding Cloud')
            .click()
        cy.get('button', {
                timeout: 120000
            })
            .should('contain', 'Launch notebook server')
        cy.get('button').filter(':contains("Launch notebook server")').click()

        // Modal popup to choose type
        cy.get('label > input[value="ecocommons-r-environment"]')
            .parent()
            .click()
        // NOTE: The label doesn't contain the label, this is not accessible
        cy.get('.bp3-dialog-footer button')
            .filter(':contains("Launch")')
            .click()

        // Pending machine start
        cy.get('td', {timeout: 10000})
            .should('contain', 'PENDING')
        cy.get('td')
            .should('contain', 'EcoCommons R environment')

        cy.get('td', {
                timeout: 120000
            })
            .should('not.contain', 'PENDING')

        // Machine running, check launch works
        cy.get('td')
            .should('contain', 'RUNNING')
        cy.window()
            .then((win) => {
                cy.stub(win, 'open').as('redirect');
            });
        cy.get('td button').filter(':contains("Open")').click()

        cy.get('@redirect')
            .should('be.calledWith', 'https://jupyterhub.dev.ecocommons.org.au/hub/oauth_login?next=%2Fhub%2F');

        // Shutdown the machine
        cy.get('td button[title="Shutdown server instance"]').click({force: true})

        cy.get('td', {
                timeout: 120000
            })
            .should('not.contain', 'RUNNING')
    })
})