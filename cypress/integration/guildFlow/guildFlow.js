import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I login', () => {
    cy.visit('https://habitica.com/static/home');
    cy.get('.login-button').click().wait(1000)
        .get('#usernameInput').type('myname123fff');
    cy.get('#passwordInput').type('myname123fff');
    cy.get('.btn-info[type="submit"]').click();
    cy.wait(1000).get('body').type('{esc}', { force: true });
});

Then('I see main page', () => {
    cy.get(".avatar").should('be.visible');
});

Given(`I navigate to My Guilds`, () => {
    cy.get('[href="/groups/tavern"]').first().click();
});

Then(`I can see the empty guilds dashboard`, () => {
    cy.contains("You aren't a member of any Guilds.").should('be.visible');
});

Then(`I create a new guild with data:`, (dataTable) => {
    let title = dataTable.rawTable[0][0];
    let summary = dataTable.rawTable[0][1];
    let description = dataTable.rawTable[0][2];
    cy.get('.create-group-button').click();
    cy.get(`[placeholder="Enter your guild's name."]`).type(title);
    cy.get('textarea').first().type(summary);
    cy.get('textarea[type=text]').type(description);
    cy.get('.category-select').click({ force: true })
        .get('input[id="category-spirituality"]').check({ force: true });
    cy.contains('Close').click({ force: true });
    cy.get('.btn.btn-primary.btn-md').click();
});

Then(`I can see an alert beacuse I do not have enough gems`, () => {
    cy.on('window:confirm', () => true)
        .get('.close').click()
        .contains("You aren't a member of any Guilds.").should('not.be.visible');
});

