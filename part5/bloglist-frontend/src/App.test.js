import React from "react"
import {
  render, waitForElement, cleanup
} from "@testing-library/react"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
  afterEach(cleanup)
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText("Login!")
    )

    // expectations here
    const notLoggedInBlogs = component.container.querySelectorAll(".basicInfo")

    expect (notLoggedInBlogs.length).toBe(0)

  })

  test("blogs appear when user is logged in", async () => {
    const user = {
      username: "MR TEST",
      name: "TEST",
      token: 1231231214
    }

    localStorage.setItem("loggedBlogUser", JSON.stringify(user))
    const component =  render(<App/>)
    component.rerender(<App/>)

    await waitForElement(
      () => component.getByText("Logout")
    )

    const loggedInBlogs = component.container.querySelectorAll(".basicInfo")
    expect(loggedInBlogs.length).toBe(2)
  })
})