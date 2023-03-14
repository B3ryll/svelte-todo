<script lang="ts">
    import Task from "./Task.svelte"

    let isTaskFormOpen: bool = false
    const formButtonClicked = () => {
        isTaskFormOpen = !isTaskFormOpen
    }
     
    let newTaskName: string = ""
    const taskFormChanged = (event) => {
        newTaskName = event.target.value
    }

    const idLimit = 10000
    const handleTaskForm  = (values) => {
        if (newTaskName == "")
            return;

        tasks = [
            ...tasks, 
            {
                title: newTaskName,
                isCompleted: false,
                id: Math.floor(Math.random() * idLimit),
            }, 
        ]
        newTaskName = ""
    }

    const onTaskGotDeleted = ({detail}) => {
        const taskIndex = tasks
            .findIndex(({id}) => detail.task.id == id)

        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1, tasks.length),
        ]
    }

    let tasks = [
        {
            title: "add new tasks",
            isCompleted: false,
            id: 3,
        },
    ];
</script>

<main class="todo">
    <ul class="todo__list">
        {#each tasks as task}
            <li class="todo__list-item">
                <Task {...task}
                      on:delete={onTaskGotDeleted}/>
            </li>
        {/each}
    </ul>

    <form on:submit|preventDefault={handleTaskForm}
          class="todo__new-task">
        <input type="text"
               name="title"
               class="todo__task-title-field"
               value={newTaskName}
               on:change={taskFormChanged}/>
    </form>

    <button class="todo__add-button"
            on:click={formButtonClicked}>
        {#if isTaskFormOpen}
            &#10799;
        {:else}
            +
        {/if}
    </button>
</main>

<style>
    :global(:root)
    {
        --background-color: #2297f6;
        --app-default-font: Arial;
    }

    :global(body)
    {
        background-color: var(--background-color);
        padding: 0px;
    }

    .todo
    {
        width: 100%;
        padding: 0px;
    }

    .todo__list
    {
        padding: 0px;
        list-style: none;
    }
    
    .todo__list-item
    {
        margin: 15px 0px;
    }

    .todo__add-button
    {
        position: fixed;
        bottom: 15px;
        right:  15px;

        padding: 0px;
        height:  35px;
        width:   35px;

        border: 1px solid #999;
        border-radius: 100%;

        color: #666;

        font-size: 25px;
    }
    
    .todo__new-task
    {
        position: fixed;
        display:  block;
        bottom:   15px;
        padding:  2px 10px;
        width:    100%;
    }
    
    .todo__task-title-field
    {
        padding: 5px;
        width:   calc(100% - 100px);

        border-radius: 5px;
        border: 1px solid #DDD;
    }
    .todo__task-title-field:focus
    {
        border: 1px solid #777;
    }

</style>
