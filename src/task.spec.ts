/**
 * @jest-environment jsdom
 **/

import "@testing-library/jest-dom/extend-expect"

import {
    screen,
    render,
    fireEvent,
} from "@testing-library/svelte"

import Task from "./task.svelte"

describe("Tsak.svelte", (): void => {
    test("must render properly", (): void => {
        const testTitle = "write better unit tests"
        render(Task, {title: testTitle})
    
        const title = screen.getByText(testTitle)
        expect(title).toBeInTheDocument()
    })

    test("must display when it is done", async () => {
        const testTitle    = "write better unit tests"
        const mockCallback = jest.fn()
        
        const {component} = render(Task, {
            title:          testTitle,
        })
        component.$on("complete", mockCallback)

        const checkbox = screen
            .getByTitle("mark task completed")
        await fireEvent.change(
            checkbox,
            {target: {value: true}}
        )

        const taskElement = screen
            .getByTestId("task-element")

        expect(taskElement.classList.contains("--completed"))
            .toBeTruthy()

        expect(mockCallback.mock.calls).toHaveLength(1);
    })

    test("must dispatch event when deleted", (): void => {
        const testTitle    = "write better unit tests"
        const mockCallback = jest.fn()
        
        const {component} = render(Task, {
            title:          testTitle,
        })
        component.$on("delete", mockCallback)

        const button = screen
            .getByTitle("delete task")
        fireEvent.click(button)

        expect(mockCallback.mock.calls).toHaveLength(1)
    })
})
