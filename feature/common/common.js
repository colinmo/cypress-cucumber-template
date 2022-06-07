import {
    Given,
    When,
    Then,
    Before
} from "cypress-cucumber-preprocessor/steps";

// BEHAT TO CYPRESS //
function findElement(something) {
    var me = cy.get('body').within(() => {
        cy.get(something)
    });
    if (me) {
        return me;
    }
    me = cy.get("*").contains(something);
    if (me) {
        return me;
    }
}

function findElements(something) {
    return findElement(something)
}

function goToPage(page) {
    if (page.substring(0, 3) != 'htt') {
        page = baseUrl + page;
    }
    cy.log(baseUrl)
    cy.log(page);
    cy.visit(page);
}

Given(/(?:User is|I am) on "(.*)"/, goToPage);
When(/(?:User is|I am) on "(.*)"/, goToPage);
Then(/(?:User is|I am) on "(.*)"/, goToPage);
Given(/(?:User goes|I go) to "(.*)"/, goToPage);
When(/(?:User goes|I go) to "(.*)"/, goToPage);
Then(/(?:User goes|I go) to "(.*)"/, goToPage);

function reloadPage() {
    cy.reload();
}
Given(/(?:User reloads|I reload) the page/, reloadPage);
When(/(?:User reloads|I reload) the page/, reloadPage);
Then(/(?:User reloads|I reload) the page/, reloadPage);

function moveBackwardOnePage() {
    cy.go('back');
}
Given(/(User goes|I go) back one page/, moveBackwardOnePage)
When(/(User goes|I go) back one page/, moveBackwardOnePage)
Then(/(User goes|I go) back one page/, moveBackwardOnePage)

function moveForwardOnePage() {
    cy.go('forward');
}
Given(/(User goes|I go) forward one page/, moveForwardOnePage)
When(/(User goes|I go) forward one page/, moveForwardOnePage)
Then(/(User goes|I go) forward one page/, moveForwardOnePage)

function pressButton(lookFor) {
    if (lookFor.indexOf(' ') > -1) {
        cy.get(`button,input[type=submit]`).contains(lookFor).click()
    } else {
        cy.get(`button${lookFor},input${lookFor}[type=submit]`).click()
    }
}
Given(/(?:User presses|I press) "([^"]*)"\s*$/, pressButton)
When(/(?:User presses|I press) "([^"]*)"\s*$/, pressButton)
Then(/(?:User presses|I press) "([^"]*)"\s*$/, pressButton)

function pressButtonSpecificer(lookForText, LookForCSS) {
    cy.get(LookForCSS).contains(lookForText).click();

    cy.wait(500)
      .get('body')
      .should('exist');
}
Given(/(?:User presses|I press) "([^"]*)" "([^"]*)"/, pressButtonSpecificer)
When(/(?:User presses|I press) "([^"]*)" "([^"]*)"/, pressButtonSpecificer)
Then(/(?:User presses|I press) "([^"]*)" "([^"]*)"/, pressButtonSpecificer)

function followLink(lookFor) {
    cy.get(`body`)
    .find('a')
    .contains(new RegExp(`^\\s*${lookFor}\\s*$`))
    .click()
    cy.wait(500)
      .get('body')
      .should('exist');
}
Given(/(?:User follows|I follow) "(.*)"/, followLink)
When(/(?:User follows|I follow) "(.*)"/, followLink)
Then(/(?:User follows|I follow) "(.*)"/, followLink)

function fillInElement(text, lookFor) {
    cy.contains('label', lookFor)
        .invoke('attr', 'for')
        .then((id) => {
            cy.get('#' + id).type(text)
        })
}

Given(/(?:User fills|I fill) in "(.*)" for "(.*)"/, fillInElement)
When(/(?:User fills|I fill) in "(.*)" for "(.*)"/, fillInElement)
Then(/(?:User fills|I fill) in "(.*)" for "(.*)"/, fillInElement)

function fillInElementCSS(text, lookFor) {
    cy.get(lookFor).type(text)
}

Given(/(?:User fills|I fill) in "(.*)" for css "(.*)"/, fillInElementCSS)
When(/(?:User fills|I fill) in "(.*)" for css "(.*)"/, fillInElementCSS)
Then(/(?:User fills|I fill) in "(.*)" for css "(.*)"/, fillInElementCSS)

function elementShouldContain(lookFor, contents) {
    cy.get(lookFor).should('contain', contents)
}

Given(/the "(.*)" element should contain "(.*)"/, elementShouldContain)
When(/the "(.*)" element should contain "(.*)"/, elementShouldContain)
Then(/the "(.*)" element should contain "(.*)"/, elementShouldContain)


function elementIsSelected(element, selector) {
    cy
  .get('h6').contains('Privacy').find('.bp3-button-text')
  .should('have.text', 'Show only my datasets')
}

Given(/"(.*)" is selected for "(.*)"/, elementIsSelected)
When(/"(.*)" is selected for "(.*)"/, elementIsSelected)
Then(/"(.*)" is selected for "(.*)"/, elementIsSelected)