const faker = require("faker");

context('Habitica Tests - To Do CRUD', () => {
    let title = faker.random.word();

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new To Do with title ' + title, () => {
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-todo').click();
        cy.get('.input-title').type(title);
        cy.get('input.checklist-item').type('Worker 1')
            .get('.new-icon').click()
            .get('[placeholder="New checklist item"]').type('Worker 2')
        cy.get('.btn-primary.btn-footer').click();
        cy.contains(title).should('be.visible');
    });

    it('reads a new To Do task with title ' + title, () => {
        cy.wait(1000)
            .contains(title).click();
        cy.get('.input-title').should('have.value', title);
        cy.get('.difficulty-item.isButton').contains('Easy').should('be.visible');
        cy.contains('Worker 1').should('be.visible');
        cy.contains('Worker 2').should('be.visible');
    });

    it('edits a new To Do task with title ' + title, () => {
        cy.get('.input-title').clear().type(title + ' - EDIT');
        cy.get('.new-icon').click()
            .get('[placeholder="New checklist item"]').type('Worker 3')
        cy.get('.m-auto').click();
        cy.contains(title + ' - EDIT').click();
        cy.get('.input-title').should('have.value', title + ' - EDIT');
        cy.contains('Worker 1').should('be.visible');
        cy.contains('Worker 2').should('be.visible');
        cy.contains('Worker 3').should('be.visible');
    });

    it('deletes a To Do with title ' + title, () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains(title + ' - EDIT').should('not.be.visible');

    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(2000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click()
            .wait(1000).get('body').type('{esc}', { force: true });
    }
});

