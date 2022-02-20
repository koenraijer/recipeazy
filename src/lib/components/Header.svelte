<script>
    	import {session} from '$app/stores'
        import {signOut} from '$lib/services'
</script>
<nav class="flex justify-between items-center py-4">
    <h1 class="title prose text-xl md:text-3xl font-bold text-accent"><a class="no-underline font-bold" href="/">Recipeazy</a></h1>
    <div class="flex items-center">
        <button class="btn btn-outline" on:click={signOut}>Sign out</button>
        {#if $session}
            <a class="btn ml-4 btn-primary" href="/account">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </a>
        {/if}
    </div>
</nav>