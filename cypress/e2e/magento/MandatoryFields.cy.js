import {searchElements} from '../../fixtures/pages';

describe('Mandatory fileds', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');
    });

    it('Verify the error messages displayed when clicking on the Add to cart button', () => {
        cy.get(searchElements.searchInput).click().type('Selene Yoga Hoodie').type('{enter}');
        cy.get(searchElements.searchResultsMessage).should('be.visible').and('contain.text', "Search results for: 'Selene Yoga Hoodie'");
        cy.get(searchElements.productItemInfo).first().click();
        cy.get(searchElements.qtyInput).clear();
        cy.get(searchElements.addToCartButton).should('be.visible').click()
        cy.get(searchElements.sizeErrorMessage).should('be.visible').and("have.text", "This is a required field.");
        cy.get(searchElements.colorErrorMessage).should('be.visible').and("have.text", "This is a required field.");
        cy.get(searchElements.qtyErrorMessage).should('be.visible').and('have.text', 'Please enter a valid number in this field.');
    });
});