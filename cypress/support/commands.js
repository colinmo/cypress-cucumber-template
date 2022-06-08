Cypress.Commands.add('login', (_host, username, password) => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('.bp3-button-text')
        .contains('Sign in / Register', {
            timeout: 5000
        }).click();
    cy.get('#zocial-keycloak-local-account', {
        timeout: 5000
    }).click();
    cy.get('#username').type(username ?? Cypress.env('USERNAME'));
    cy.get('#password').type(password ?? Cypress.env('PASSWORD'));
    cy.get('#kc-form-login').submit();
    cy.get('.bp3-icon-caret-down').should('exist', {
        timeout: 10000
    });
});

Cypress.Commands.add('getResponse', (request) => {
    cy.wait(request)
        .its('response')
        .then((r) => {
            expect(r.statusCode).to.be.oneOf([200, 201]);
            cy.wrap(r.body).as(`response${request}`)
        });
});