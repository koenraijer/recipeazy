<script>
    import supabase from '$lib/db'
    import {session} from '$app/stores'
    import {browser} from '$app/env'
    import CreateRecipe from '$lib/components/createRecipe.svelte'
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    let email = ''
    function assignEmail() {
            email = $session.user.email;
            return email
    }

    if(browser) {
        assignEmail()
    }

    async function getData() {
        const {data, error} = await supabase
            .from('recipes')
            .select()
        
            if (error) throw new Error(error.message)

            return data

    }

    getData();

</script>

<div class="flex justify-between items-center py-4">
    <h1 class="title prose text-xl md:text-3xl font-bold text-accent"><a class="no-underline font-bold" href="/">Recipeazy</a></h1>
    <div>
        {#if $session}
            <span class="sm:visible hidden md:px-4">{email}</span>
        {/if}
        <button class="btn btn-primary" on:click={signOut}>Sign out</button>
    </div>
</div>

<CreateRecipe/>

<h2 class="text-3xl font-bold">All recipes</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 items-stretch gap-12 my-12 ">
        {#await getData()}
        <span>Loading...</span>
        {:then data}
            {#each data as recipe}
                <div class="card w-full bg-base-100 shadow-xl">
                    <div class="card-body">
                    <h2 class="card-title">{recipe.title}</h2>
                    <p>{recipe.introduction}</p>
                    <div class="flex justify-between">
                        <div>
                            <h3 class="font-semibold mb-2 mt-4">Ingredients</h3>
                            <ul class="ml-6 list-disc">
                                {#each recipe.ingredients as ingredient}
                                    <li>{ingredient}</li>
                                {/each}
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2 mt-4">Instructions</h3>
                            <ol class="ml-6 text-base-neutral list-decimal">
                                {#each recipe.instructions as instruction}
                                    <li>{instruction}</li>
                                {/each}
                            </ol>
                        </div>
                    </div>
                    </div>
                </div>
            {/each}
        {:catch error}
            <p>Something went terribly wrong!</p>
            <pre>{error}</pre>
        {/await}
    </div>