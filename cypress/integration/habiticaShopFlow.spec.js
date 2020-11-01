context('Habitica Tests - Shop Flow', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })

    it('Tries to shop item', () => {
        cy.screenshot("step_before_click_shop_menu");
        cy.get('.nav-link[href="/shops/market"]').click();
        cy.screenshot("step_after_click_shop_menu");
        cy.wait(2000);
        cy.screenshot("step_before_click_item");
        cy.get('.item-wrapper').first().click()
            .get('button.notEnough').should('exist')
            .wait(1000)
            .get('.close-icon').click({ force: true });
        cy.screenshot("step_after_click_item");
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

