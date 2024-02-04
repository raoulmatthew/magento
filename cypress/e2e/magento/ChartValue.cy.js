describe('Verify that the prices in the Chart are updated correctly', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');
    });

    it('Verify that the prices in the Chart are updated correctly', () => {
        cy.get('.ui-menu').contains('Men').trigger('mouseover');
        cy.get('#ui-id-17').contains('Tops').trigger('mouseover');
        cy.get('#ui-id-20').contains('Hoodies & Sweatshirts').click();

        cy.contains('Hero Hoodie').click();

        cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', 'Hero Hoodie').should('be.visible');

        cy.get('.swatch-attribute-options').contains('L').click();
        cy.get('.swatch-attribute-selected-option').should('have.text', 'L').should('be.visible');

        cy.get('[option-label="Green"]').click();
        cy.get('[option-label="Green"]').should('have.class', 'selected');
        cy.get('.fotorama__img').should('have.attr', 'src').should('contain', 'mh07-green_main_2.jpg');

        cy.get('#qty').clear().type('3').should('be.visible');
        cy.get('#product-addtocart-button').should('have.attr', 'title', 'Add to Cart').should('be.visible');
        cy.get('#product-addtocart-button').click();

        cy.get('.messages').should('contain', 'You added Hero Hoodie to your shopping cart.').should('be.visible');
        cy.get('.messages').contains('shopping cart').click();
        cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', 'Shopping Cart').should('be.visible');

        cy.get('.cart')
            .find('.product-item-name')
            .should(($el) => expect($el.text().trim()).to.equal('Hero Hoodie'))
            .should('be.visible');
        cy.get('.cart')
            .find('.product-item-name')
            .children()
            .should('have.attr', 'href').should('contain', 'hero-hoodie.html');

        cy.verifyChartPrice();

        cy.get('[data-th="Qty"]').find('[data-cart-item-id="MH07-L-Green"]').clear().type('2').should('be.visible');

        cy.intercept({
            method: 'POST',
            url: '/rest/default/V1/guest-carts/*/estimate-shipping-methods',
        }).as('estimateShippingMethods');

        cy.contains('Update Shopping Cart').click();

        cy.wait('@estimateShippingMethods').its('response.statusCode').should('eq', 200);

        cy.verifyChartPrice();
    });
});

