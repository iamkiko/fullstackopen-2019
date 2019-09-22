import React from "react"
import {
  render, waitForElement
} from "@testing-library/react"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText("Login!")
    )

    // expectations here
    const notLoggedInBlogs = component.container.querySelectorAll(".blogInfo")

    expect (notLoggedInBlogs.length).toBe(0)

  })
})