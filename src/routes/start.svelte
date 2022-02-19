<script>
    import supabase from '$lib/db'
    import {goto} from '$app/navigation'

    import * as THREE from 'three'
    import * as SC from 'svelte-cubed'

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

    let spin = 0

    SC.onFrame(() => {
        spin += .01
    })
</script>

<h1 class="title prose text-6xl md:text-9xl font-bold text-accent mx-auto text-center my-8">Recipeazy</h1>
<div class="absolute w-[90vw] h-[90vh] -translate-y-[10vh] -z-10 left-[50vw] transform -translate-x-[50%] mx-auto">
    <SC.Canvas class="absolute w-56 h-56" antialias background={new THREE.Color(250, 247, 245)} >
        <SC.Mesh geometry={new THREE.TorusKnotGeometry()} rotation={[spin, spin, spin]}/>
        <SC.PerspectiveCamera />
        <SC.AmbientLight intensity={0.6} />
	    <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
    </SC.Canvas>
</div>
<div class="card w-full bg-base-100 my-8 mx-auto shadow-xl">
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