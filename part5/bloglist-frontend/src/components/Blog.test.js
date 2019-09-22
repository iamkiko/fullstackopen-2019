import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"
import { bloglistAfterDelete, addLike } from "../App"

describe("Blog tests", () => {

  let component

  beforeEach(() => {

    const mockHandler = jest.fn()
    const user = {
      username: "iamkiko",
      name: "Christos"
    }

    const testBlog = {
      title: "ela kentro",
      author: "kiko",
      url: "www.ela.com",
      likes: 76,
      user: [{ username: "iamkiko", name: "Christos" }]
    }

    component = render(
      <Blog 
        blog={testBlog} 
        onClick={mockHandler} 
        user={user}
      />
    )
  })

  test("only name and author shown by default", () => {

    const basicInfo = component.container.querySelector('.basicInfo')
    const fullInfo = component.container.querySelector('.fullInfo')

    expect(basicInfo).toHaveTextContent('ela kentro')
    expect(basicInfo).toHaveTextContent('kiko')
    expect(fullInfo).toHaveStyle('display: none')
  })

  test("when blogpost is clicked - all info is visible", () => {
    const basicInfo = component.container.querySelector('.basicInfo')
    const fullInfo = component.container.querySelector('.fullInfo')

    fireEvent.click(basicInfo)

    expect(basicInfo).toHaveTextContent("ela kentro")
    expect(basicInfo).toHaveTextContent("kiko")

    expect(fullInfo).not.toHaveStyle("display: none")
  })
})