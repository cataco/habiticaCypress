const faker = require("faker");

context('Habitica Tests - Habit CRUD', () => {
    let title = faker.random.word();

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new habit with title ' + title, () => {
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-habit').click();
        cy.get('.input-title').type(title);
        cy.get('.negative.mx-auto').click();
        cy.get('.btn-primary.btn-footer').click();
        cy.contains(title).should('be.visible');
    });

    it('reads the habit with title ' + title, () => {
        cy.contains(title).click();
        cy.wait(1000);
        cy.get('.input-title').should('have.value', title);
        cy.get('.difficulty-item.isButton').contains('Easy').should('be.visible');
        cy.get('button span.label').contains('Daily').should('be.visible');
        cy.get('.input-group input').should('have.value', '0');
    });

    it('edits the habit with title ' + title, () => {
        cy.get('.input-title').clear().type(title + ' - EDIT');
        cy.get('.input-group input').clear().type('1');
        cy.get('button span.label').contains('Daily').click();
        cy.get('span.label').contains('Weekly').click();
        cy.get('.m-auto').click();
        cy.contains(title + ' - EDIT').click();
        cy.get('.input-title').should('have.value', title + ' - EDIT');
        cy.get('.difficulty-item.isButton').should('be.visible');
        cy.get('button span.label').contains('Weekly').should('be.visible');
        cy.get('.input-group input').should('have.value', '1');
    });

    it('deletes the habit with title ' + title, () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains(title + ' - EDIT').should('not.be.visible');
        cy.screenshot();

    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click()
            .wait(1000).get('body').type('{esc}', { force: true });
    }
});

