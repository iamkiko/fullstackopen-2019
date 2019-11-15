describe("blog-app-testing", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "test",
      username: "cypresstester",
      password: "test",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  describe("7.18", function() {
    it("User can add new blogs & subsequently comment", function() {
      cy.get("#username").type("cypresstester")
      cy.get("#password").type("test")
      cy.get("[data-cy=login]").click()
      cy.contains("create new").click()
      cy.get("#title").type("cypress title")
      cy.get("#author").type("cypress tester")
      cy.get("#url").type("www.cypress.io")
      cy.get("[data-cy=createblog]").click()
      cy.reload()
      cy.contains("cypress title").click()
      cy.contains("by cypress tester")
      cy.get("#comment").type("cypress comment")
      cy.get("[data-cy=commentbutton").click()
      cy.contains("Comment added!")
    })

    // it("User can comment on new blogs", function() {
    //   cy.get("#username").type("cypresstester")
    //   cy.get("#password").type("test")
    //   cy.get("[data-cy=login]").click()
    //   cy.contains("cypress title").click()
    //   cy.get("#comment").type("cypress comment")
    //   cy.get("[data-cy=commentbutton").click()
    // })
  })

  //Previous tests, with original database. Not compatitible with tests above

  //   describe("Original log process and tests..", function() {
  //     it("Log in page appears", function() {
  //       cy.contains("Log in to application")
  //     })

  //     //log in functionality
  //     beforeEach(function() {
  //       cy.visit("http://localhost:3000")
  //       cy.get("#username").type("italo")
  //       cy.get("#password").type("italo")
  //       cy.get("[data-cy=login]").click()
  //     })

  //     it("Shows logged in user", function() {
  //       cy.contains("italo logged in")
  //     })

  //     it("Can open blogs", function() {
  //       cy.contains("Important blogpost").click()
  //     })

  //     it("Can add comments to blogs", function() {
  //       cy.contains("test my blog").click()
  //     })

  //     it("Can add comments to blogs", function() {
  //       cy.contains("testing routes").click()
  //       cy.get("#comment").type("cypress comment")
  //       cy.get("[data-cy=commentbutton").click()
  //     })

  //     it("Can successfully log out once logged in", function() {
  //       cy.get("[data-cy=logout]").click()
  //     })

  //     it("User is signed out", function() {
  //       cy.contains("Log in to application")
  //     })
  //   })
})
