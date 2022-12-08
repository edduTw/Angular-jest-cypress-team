it('loads examples', () => {
  cy.visit('/');
  cy.contains('app is running!');
  cy.contains('Angular Password Generator');
});

it('validate length field required', () => {
  cy.get('input#length').type('3', { force: true });
 
  cy.contains('required');
});
