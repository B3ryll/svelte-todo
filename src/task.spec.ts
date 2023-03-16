/**
 * @jest-environment jsdom
 **/

import {describe, expect, test} from "@jest/globals"
import "@testing-library/jest-dom"

import {
    screen,
    render,
    fireEvent,
} from "@testing-library/svelte"

import Task from "./task.svelte"

describe("Tsak.svelte", (): void => {
    test("must render properly", (): void => {
        const testTitle = "write better unit tests";
        render(Task, {title: testTitle})
    
        const title = screen.getByText(testTitle)
        expect(title).toBeInTheDocument()
    })
})
