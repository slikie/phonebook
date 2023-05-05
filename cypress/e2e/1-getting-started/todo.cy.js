describe('front page can be opened', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('displays some ui', () => {
	 cy.contains('Numbers')
	 cy.contains('Filter show with:')
  })
})
