import {categoryElements} from '../../fixtures/pages';

describe('Magento Shopping Page', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');
    });

    it("Verify that the What's New link is working properly", () => {
        cy.verifyCategoryLink(categoryElements.whatsNew, "What's New");
    });

    it('Verify that the Women link is working properly', () => {
        cy.verifyCategoryLink(categoryElements.women, 'Women');
    });

    it('should verify that the Men link is working properly', () => {
        cy.verifyCategoryLink(categoryElements.men, 'Men');
    });

    it('Verify that the Gear link is working properly', () => {
        cy.verifyCategoryLink(categoryElements.gear, 'Gear');
    });

    it('Verify that the Training link is working properly', () => {
        cy.verifyCategoryLink(categoryElements.training, 'Training');
    });

    it('Verify that the Sale link is working properly', () => {
        cy.verifyCategoryLink(categoryElements.sale, 'Sale');
    });
});