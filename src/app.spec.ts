/**
 * @jest-environment jsdom
 **/

import "@testing-library/jest-dom/extend-expect"

import {
    screen,
    render,
    fireEvent,
} from "@testing-library/svelte"

import App from "./app.svelte"

describe("app.svelte", () => {
    test("must render properly", () => {
        render(App, {})

        const todoList = screen.getByTestId("todo-list")
        expect(todoList).toBeInTheDocument()

        const addTaskButton = screen.getByTitle("add task")
        expect(addTaskButton).toBeInTheDocument()
    })

    test("must display task form on btn click", async () => {
        render(App, {})

        let newTaskField = screen
            .queryByTitle("create a new task")
        expect(newTaskField).not.toBeInTheDocument()

        const addTaskButton = screen.getByTitle("add task")
        await fireEvent.click(addTaskButton)

        newTaskField = screen
            .queryByTitle("create a new task")
        expect(newTaskField).toBeInTheDocument()

        // close form
        await fireEvent.click(addTaskButton)
        newTaskField = screen
            .queryByTitle("create a new task")
        expect(newTaskField).not.toBeInTheDocument()
    })

    test("must add new tasks when needed", async () => {
        render(App, {})

        const exampleTaskName = "read manga"
        const inexistentNote = screen
            .queryByText(exampleTaskName)
        expect(inexistentNote).not.toBeInTheDocument()

        const addTaskButton = screen.getByTitle("add task")
        await fireEvent.click(addTaskButton)

        let newTaskForm = screen
            .getByTitle("create a new task")

        const newTaskTextField = screen
            .getByTestId("new-task-name-field")

        await fireEvent.change(
            newTaskTextField,
            {target: {value: exampleTaskName}}
        )
        await fireEvent.submit(newTaskForm) 

        const taskNote = screen
            .queryByText(exampleTaskName)
        expect(taskNote).toBeInTheDocument()

        expect((newTaskTextField as HTMLInputElement).value)
            .toEqual("")

    })
})
