describe('Access Test', function() {
  it('can access top page', function() {
    cy.visit('/')

    cy.get('h1').should('contain', 'freks blog')
  })
})
