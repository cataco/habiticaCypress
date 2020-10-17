const faker = require("faker");

context('Habitica Tests - Reward CRUD', () => {
    let title = faker.random.word();

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new Reward with title ' + title, () => {
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-reward').click();
        cy.get('.input-title').type(title);
        cy.get('.btn-primary.btn-footer').click();
        cy.contains(title).should('be.visible');
    });

    it('reads a new Reward with title ' + title, () => {
        cy.wait(1000)
            .contains(title).click();
        cy.get('.input-title').should('have.value', title);
        cy.get('input[type="number"]').should('have.value', '10');
    });

    it('edits a new Reward with title ' + title, () => {
        cy.get('.input-title').clear().type(title + ' - EDIT');
        cy.get('input[type="number"]').clear().type('21');
        cy.get('.m-auto').click();
        cy.contains(title + ' - EDIT').click();
        cy.get('.input-title').should('have.value', title + ' - EDIT');
        cy.get('input[type="number"]').should('have.value', '21');
    });

    it('deletes a Reward with title ' + title, () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains(title + ' - EDIT').should('not.be.visible');

    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(2000)
            .get('#usernameInput').type('myname123fff')
            .get('#passwordInput').type('myname123fff')
            .get('.btn-info[type="submit"]').click()
            .wait(1000).get('body').type('{esc}', { force: true });
    }
});

