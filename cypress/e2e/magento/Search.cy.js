import {searchElements} from '../../fixtures/pages';

describe('Magento Search Functionality', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');
    });

    it('Verify that the Search functionality works as expected', () => {
        cy.get(searchElements.searchInput).click().type('Maxima Drawstring Short').type('{enter}');

        cy.get(searchElements.searchResultsMessage).should('be.visible').and('contain.text', "Search results for: 'Maxima Drawstring Short'");

        cy.get(searchElements.productItemInfo).first().click();

        cy.get(searchElements.sizeOption).type('29');
        cy.get(searchElements.colorOption).click();

        cy.get(searchElements.colorOption).should('be.visible').and('have.css', 'background-color', 'rgb(235, 103, 3)');

        cy.get(searchElements.qtyInput).clear().type(3);
        cy.get(searchElements.addToCartButton).should('be.visible').click();

        cy.get(searchElements.cartCounter).should('contain', 3);
        cy.get(searchElements.successMessage).should('contain', 'You added Maxima Drawstring Short');
    });
});