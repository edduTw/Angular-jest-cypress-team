describe('cypress angular app e2e test', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/')
  })
  it('app open', () => {
    cy.contains('Angular Password Generator');
  });
  it('insert length value', () => {
    cy.get(`[formcontrolname="passLength"]`).type('3', {force: true})
    cy.get('button#btnGenerate').should('be.disabled')
  });
  it('button with length > 4 and checkbox', () => {
    cy.get(`[formcontrolname="passLength"]`).type('6', {force: true})
    cy.get('[type=checkbox]#2').check({force: true});
    cy.get('button#btnGenerate').should('not.be.disabled');
    cy.get('[type=checkbox]#2').uncheck({force: true});
    cy.get('button#btnGenerate').should('be.disabled');
  });
  it('button with length < 4 and checkbox', () => {
    cy.get(`[formcontrolname="passLength"]`).type('3', {force: true})
    cy.get('[type=checkbox]#1').check({force: true});
    cy.get('button#btnGenerate').should('be.disabled');
  });
  it('generate password of same length of field', () => {
    let rndVal = (Math.random() * 10 + 4).toFixed();
    cy.get(`[formcontrolname="passLength"]`).type(rndVal.toString(), {force: true})
    cy.get('[type=checkbox]#0').check({force: true});
    cy.get('button#btnGenerate').should('not.be.disabled');
    cy.get('button#btnGenerate').click({force: true});
    cy.get(`[formcontrolname="newPassword"]`).invoke('val').should('have.length', rndVal);
  });
})



