it('load component', () => {
  cy.visit('/');
  cy.contains('app is running!');
  cy.contains('Angular Password Generator');
});

it('validate Generate button is disabled', () => {
   cy.get('button#btnGenerate').should('be.disabled');
});

it('validate length field required', () => {  
  cy.get('input#length').type('3', { force: true });
  cy.get('input#length').blur();
  cy.contains('Minimum value is 4');
});

it('validate Generate button is enabled', () => {
  cy.get('input#length').focus().clear();
  cy.get('input#length').type('5');
  cy.get('input#length').blur();
  cy.get('[type=checkbox]#0').check({force: true});
  cy.get('[type=checkbox]#1').check({force: true});
  cy.get('button#btnGenerate').should('not.be.disabled');
});

it('get random password when clicked on Generate button', () => {
  cy.get('button#btnGenerate').click({ force: true }); 
  cy.get('input#random').invoke('val').should('not.be.empty');
  cy.get('input#random').invoke('val').should('have.length', 5);
});