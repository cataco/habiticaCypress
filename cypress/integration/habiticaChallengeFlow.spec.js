const faker = require("faker");

context('Habitica Tests - Challenge Flow', () => {
    let title = faker.random.word();
    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })

    it('tries to create a public challenge eith title ' + title + ' without prize', () => {
        cy.screenshot("new_challenge_navigate");
        cy.get('.nav-link[href="/challenges/myChallenges"]').click();
        cy.screenshot("new_challenge_click_create");
        cy.get('.create-challenge-button').click();
        cy.screenshot("new_challenge_type");
        cy.get('[placeholder="What is your Challenge name?"]').type(title);
        cy.get('[placeholder="What short tag should be used to identify your Challenge?"]').type(title);
        cy.get('.summary-count').type(faker.random.word());
        cy.get('.description-textarea').type("This is the description of my new cypress challenge");
        cy.get('select').select('00000000-0000-4000-A000-000000000000');
        cy.screenshot("new_challenge_click_category");
        cy.get('.category-select').click({ force: true })
            .get('input[id="challenge-modal-cat-creativity"]').check({ force: true });
        cy.contains('Close').click({ force: true });
        cy.screenshot("new_challenge_click_add");
        cy.contains('Add Challenge Tasks').click();
        cy.get('.close').click();
    });

    it('finds and joins public challenge', () => {
        cy.screenshot("join_challenge_navigate");
        cy.get('.nav-link[href="/challenges/findChallenges"]').click();
        cy.screenshot("join_challenge_select");
        cy.get('.challenge-title p').first().click();
        cy.get('.member-count').should('be.visible');
        cy.get('.btn-success').click();
        cy.screenshot("join_challenge_click");
        //Validate tasks form public challegne have been added to the tasks dashboard
        cy.get('.task-wrapper')
            .its('length')
            .then(lengthOfTasks => {
                cy.get('.nav-link[href="/"]').click();
                cy.get('.task-wrapper').should('have.length', lengthOfTasks)
            });
        cy.screenshot("join_challenge_tasks");
    });

    it('leaves public challenge', () => {
        cy.screenshot("leaves_challenge_navigate");
        cy.get('.nav-link[href="/challenges/myChallenges"]').click();
        cy.screenshot("leaves_challenge_select");
        cy.get('.challenge-title p').first().click();
        cy.screenshot("leaves_challenge_danger");
        cy.get('.btn-danger').click();
        cy.screenshot("leaves_challenge_modal");
        cy.get('.modal-body .btn-danger').click();
        cy.screenshot("leaves_challenge_navigate2");
        cy.get('.nav-link[href="/challenges/myChallenges"]').first().click();
        cy.contains("You don't have any Challenges.").should('be.visible');
        cy.get('.nav-link[href="/"]').click();
        cy.screenshot("leaves_challenge_tasks");
        cy.get('.task-wrapper').should('not.exist');
    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
        cy.wait(1000).get('body').type('{esc}', { force: true });
    }
});

