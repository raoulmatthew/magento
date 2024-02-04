import {categoryElements} from '../fixtures/pages';

Cypress.Commands.add('verifyCategoryLink', (linkSelector, expectedText) => {
    cy.get(linkSelector).should('have.text', expectedText).and('be.visible');
    cy.get(linkSelector).click();
    cy.get(categoryElements.baseElement).should('have.text', expectedText).should('be.visible');
});

Cypress.Commands.add('verifyChartPrice', () => {
    cy.get('[data-th="Price"]')
        .invoke('text')
        .then((text) => {
            const priceValue = parseFloat(text.replace(/[^\d.]/g, ''));
            cy.get('[data-th="Qty"]')
                .find('[data-cart-item-id="MH07-L-Green"]')
                .invoke('attr', 'value')
                .then((text) => {
                    const quantityValue = parseFloat(text);
                    cy.get('.cart')
                        .find('[data-th="Subtotal"]')
                        .invoke('text')
                        .then((text) => {
                            const subtotalValue = parseFloat(text.replace(/[^\d.]/g, ''));
                            expect(priceValue * quantityValue).to.equal(subtotalValue);
                        });
                    cy.get('.cart-totals')
                        .find('[data-th="Subtotal"]')
                        .invoke('text')
                        .then((text) => {
                            const summarySubtotalValue = parseFloat(text.replace(/[^\d.]/g, ''));
                            expect(priceValue * quantityValue).to.equal(summarySubtotalValue);
                        });
                });
        });
});