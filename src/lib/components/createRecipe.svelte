<script>
    import supabase from "$lib/db";
    import {createPost} from '$lib/services'
    import {addIngredient} from '$lib/services'
    import {addInstruction} from '$lib/services'

    let title = ''
    let introduction = ''
    let ingredients = []
    let ingredient = ''
    let instructions = []
    let instruction = ''

    let createPostPromise = Promise.resolve({})

    function handleCreatePost() {
        createPostPromise = createPost({user: supabase.auth.user().email, title: title, introduction: introduction, ingredients: ingredients, instructions: instructions})
    }
</script>

<div class="flex flex-col gap-12 my-12 flex-nowrap">
    <div class="grid md:grid-cols-2 gap-12">
        <form on:submit|preventDefault={handleCreatePost} class="col-span-1 card bg-base-100 shadow-xl">
            <div class="card-body">
            <h2 class="card-title">New recipe</h2>
            <label for="recipeTitle" class="label mt-6">Title</label>
            <input type="text" id="recipeTitle" required bind:value={title} class="input border-white focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200">
            
            <label for="recipeIntro" class="label mt-6">Introduction (optional)</label>
            <textarea id="recipeIntro" bind:value={introduction} class="textarea border-white focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200"></textarea>
            
            <label for="recipeIngredient" class="label mt-6">Add an ingredient</label>
            <div class="flex justify-between">
                <input id="recipeIngredient" bind:value={ingredient} class="input w-full mr-6 border-white focus:outline-none border border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200">
                <button class="btn btn-outline px-6" type="button" on:click={addIngredient}>
                    Add
                </button>
            </div>   
            <label for="recipeInstruction" class="label mt-6">Add an instruction</label>
            <div class="flex justify-between">
                <input id="recipeInstruction" bind:value={instruction} class="input w-full mr-6 border-white focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200">
                <button type="button" class="btn px-6 btn-outline" on:click={addInstruction}>
                    Add
                </button>
            </div>
            <div class="justify-end mt-6 card-actions">
            {#await createPostPromise}
                <button disabled type="button" class="btn btn-primary">Publish recipe</button>
            {:then {data, error}}
                <button  class="btn btn-primary">Publish recipe</button>
                {#if data}
                    <strong class="text-green-600">Successfully created recipe!</strong>
                    <!--{window.location.reload(true)}-->
                {:else if error}
                    <span class="w-full text-red-400">Error: {error.message}</span>
                {/if}
            {/await}
            </div>
            </div>
        </form>

        <div class="card w-full bg-base-200 shadow-xl">
            <div class="flex flex-col flex-nowrap justify-between card-body">
                <div>
                    <h2 class="card-title">{title ? title : "This is an example of a recipe"}</h2>
                    <p class="grow-0">{introduction ? introduction : "As soon as you start adding content, this text will disappear."}</p>
                </div>
                <div>
                    <h3 class="font-semibold mb-2 mt-4">Ingredients</h3>
                    <ul class="ml-6 list-disc">
                        {#if ingredients.length}
                            {#each ingredients as ingredient}
                                <li>{ingredient}</li>
                            {/each}
                        {:else}
                            <li>Mockup bananas</li>
                            <li>Fake peanuts</li>
                            <li>Moldy cheese</li>
                        {/if}
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-2 mt-4">Instructions</h3>
                    <ol class="ml-6 text-base-neutral list-decimal">
                        {#if instructions.length}
                            {#each instructions as instruction}
                                <li>{instruction}</li>
                            {/each}
                        {:else}
                            <li>Buy proper bananas</li>
                            <li>Feed dog (proper dog food)</li>
                            <li>Put on the kettle and make a cuppa</li>
                        {/if}
                    </ol>
                </div>
            </div>
        </div>
    </div>

    

</div>