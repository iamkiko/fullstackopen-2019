describe("blog-app-testing", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000")
  })

  it("Log in page appears", function() {
    cy.contains("Log in to application")
  })

  //log in functionality
  beforeEach(function() {
    cy.visit("http://localhost:3000")
    cy.get("#username").type("italo")
    cy.get("#password").type("italo")
    cy.get("[data-cy=login]").click()
  })

  it("Shows logged in user", function() {
    cy.contains("italo logged in")
  })

  it("Can open blogs", function() {
    cy.contains("Important blogpost").click()
  })

  it("Can add comments to blogs", function() {
    cy.contains("test my blog").click()
    cy.get("#comment").type("cypress comment")
    cy.get("[data-cy=commentbutton").click()
  })

  it("Can successfully log out once logged in", function() {
    cy.get("[data-cy=logout]").click()
  })

  it("User is signed out", function() {
    cy.contains("Log in to application")
  })
})
