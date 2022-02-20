<script>
    import supabase from '$lib/db'
    import {session} from '$app/stores'
    import {browser} from '$app/env'
    import CreateRecipe from '$lib/components/createRecipe.svelte'

    let email = ''
    function assignEmail() {
            email = $session.user.email;
            return email
    }

    if(browser) {
        assignEmail()
    }

    async function getUserRecipes() {
        const {data: recipes, error} = await supabase
            .from('recipes')
            .select()
            .eq('user', email)
            if (error) throw new Error(error.message)

            return recipes

    }

    console.log(supabase.auth.user())
</script>

<CreateRecipe/>

<h2 class="text-3xl font-bold">All recipes</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 items-stretch gap-12 my-12 ">
        {#await getUserRecipes()}
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