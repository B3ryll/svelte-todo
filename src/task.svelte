<script lang="ts">
    import {createEventDispatcher} from "svelte"

    export let title: string     = "task"
    export let isCompleted: bool = false
    export let id: number        = 0

    const onCheckboxChanged = () => {
        dispatch("complete", {
            task: {id},
        })

        isCompleted = !isCompleted
    };

    const dispatch = createEventDispatcher()
    const onDelButtonClick = () => {
        dispatch("delete", {
            task: {id},
        })
    }
</script>

<div class="task"
     data-testid="task-element"
     class:--completed={isCompleted}>
    <input type="checkbox"
           title="mark task completed"
           on:change={onCheckboxChanged}
           checked={isCompleted}/>
    <span class="task__title">
        {title}
    </span>

    <button title="delete task"
            on:click={onDelButtonClick}>
        delete
    </button>
</div>

<style>
    .task
    {
        font-family: var(--app-default-font), sans-serif;
        background-color: #d7dde1;
        box-shadow: 1px 1px 1px rgba(40, 40, 40, .3);

        width: calc(100% - 20px);
        padding: 5px 10px;
    }

    .task.--completed
    {
        color: #999;
    }
</style>
