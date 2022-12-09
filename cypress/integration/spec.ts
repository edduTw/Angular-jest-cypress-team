describe('Password generador app', () => {

  it('loads examples', () => {
    cy.visit('/');
    cy.contains('Angular Password Generator');
  });

  it('should display components ', () => {
    cy.visit('/');
    cy.get('label').should('have.length', 5)
    cy.get(':checkbox').should('have.length', 3)
    cy.get('button').should('be.disabled')

  })

  it('at least one checkbox must be selected', () => {
    cy.visit('/')
    // cy.get('button').should('be.disabled')
    cy.check(':checkbox').check()
  })
});
