<script>
    import supabase from '$lib/db'
    import {goto} from '$app/navigation'

    let email, password
    async function signUp() {
        const {user, session: sesh, error} = await supabase.auth.signUp({
            email,
            password
        })
        if (error) return alert(error.message)

        // Reset fields
        email = ''
        password = ''

        goto('/')
    }

    async function signIn() {
        const {user, session: sesh, error} = await supabase.auth.signIn({
            email,
            password
        })

        if(error) return alert(error.message), // Reset fields

        email = '',
        password = ''

         
        goto('/')
    }
</script>

<h1 class="title prose text-8xl font-bold text-accent mx-auto text-center my-8">Recipeazy</h1>
<div class="card w-96 bg-base-100 my-8 mx-auto shadow-xl">
    <div class="card-body">
      <h2 class="card-title my-4">Sign up</h2>
      <div class="">
        <label class="label" for="email">Email</label>
        <input type="email" id="email" name="email" class="input w-full border focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200" required bind:value={email}>
        <label class="label mt-6" for="password">Password</label>
        <input id="password" type="password" name="password" class="input w-full border focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200" required bind:value={password}>
        <div class="card-actions justify-end mt-6">
            <button class="btn btn-primary my-4" on:click={signUp}>Sign up</button>
            <button class="btn btn-secondary my-4" on:click={signIn}>Sign in</button>
        </div>
      </div>
    </div>
  </div>