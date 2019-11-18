import React from "react"
import { render, waitForElement } from "react-testing-library"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
  let component

  beforeEach(() => {
    component = render(
      <App />
    )
  })

  it("if no user logged, notes are not rendered", async () => {
    component.rerender(<App />)

    await waitForElement(() => component.getByText("Log in"))

    expect(component.container).toHaveTextContent("Log in")
    expect(component.container).toHaveTextContent("Log in to application")
    expect(component.container).toHaveTextContent("Username")
    expect(component.container).toHaveTextContent("Password")
    expect(component.container).not.toHaveTextContent("Dan Abramov")
  })

  it("if no user logged, notes are not rendered2", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "MR. TEST"
    }

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))

    component.rerender(<App />)

    await waitForElement(() => component.getByText("create"))

    expect(component.container).not.toHaveTextContent("Username")
    expect(component.container).not.toHaveTextContent("Password")
    expect(component.container).toHaveTextContent("Dan Abramov")
    expect(component.container).toHaveTextContent("Martin Fowler")
  })
})