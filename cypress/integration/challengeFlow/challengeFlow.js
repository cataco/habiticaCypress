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

Given(`I navigate to public challenges`, () => {
    cy.get('.nav-link[href="/challenges/myChallenges"]').click();
    cy.get('.nav-link[href="/challenges/findChallenges"]').click();
});

Then(`I join a public challenge and see the tasks in my tasks dashboard`, () => {
    cy.get('.challenge-title p').first().click();
    cy.get('.member-count').should('be.visible');
    cy.get('.btn-success').click();
    //Validate tasks from public challegne have been added to the tasks dashboard
    cy.get('.task-wrapper')
        .its('length')
        .then(lengthOfTasks => {
            cy.get('.nav-link[href="/"]').click();
            cy.get('.task-wrapper').should('have.length', lengthOfTasks)
        });
});

Then(`I navigate to my challenges`, () => {
    cy.get('.nav-link[href="/challenges/myChallenges"]').click();
});

Then(`I select the challenge I joined`, () => {
    cy.get('.challenge-title p').first().click();
});

Then(`I select the challenge I joined`, () => {
        cy.get('.btn-danger').click(); 
        cy.get('.modal-body .btn-danger').click();
        cy.get('.nav-link[href="/challenges/myChallenges"]').first().click();
        cy.contains("You don't have any Challenges.").should('be.visible');
        cy.get('.nav-link[href="/"]').click();
        cy.get('.task-wrapper').should('not.exist');
});

Then(`I can leave the public challenge`, () => {
    cy.get('.btn-danger').click(); 
    cy.get('.modal-body .btn-danger').click();
    cy.get('.nav-link[href="/challenges/myChallenges"]').first().click();
    cy.contains("You don't have any Challenges.").should('be.visible');
});

Then(`I do not see tasks from public challegne have been added to the tasks dashboard`, () => {
    cy.get('.nav-link[href="/"]').click();
    cy.get('.task-wrapper').should('not.exist');
});

Then(`I search for public challenge {string}`, (title) => {
    cy.get('[placeholder="Search"]').clear().type(title);
});

Then(`I should see challenge {string} as first in the list`, (title) => {
    cy.get('.challenge-title p').first().should('have.text', title);
});

