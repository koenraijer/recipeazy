<script>
    import {session} from '$app/stores'
    import supabase from '$lib/db'
    import {browser} from '$app/env'
    let email = ''
    function assignEmail() {
            email = $session.user.email;
            return email
    }

    if(browser) {
        assignEmail()
    }

    let loading = true
    let username = null
    let website = null
    let avatar_url = null

    async function getProfile() {
        try {
        loading = true
        const user = supabase.auth.user()

        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single()

        if (error && status !== 406) throw error

        if (data) {
            username = data.username
            website = data.website
            avatar_url = data.avatar_url
        }
        } catch (error) {
        alert(error.message)
        } finally {
        loading = false
        }
    }

    async function updateProfile() {
        try {
        loading = true
        const user = supabase.auth.user()

        const updates = {
            id: user.id,
            username,
            website,
            avatar_url,
            updated_at: new Date(),
        }

        let { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
        })

        if (error) throw error
        } catch (error) {
        alert(error.message)
        } finally {
        loading = false
        }
    }


</script>

<div class="card w-full sm:w-96 bg-base-100 my-8 mx-auto shadow-xl">
    <div class="card-body">
        <div class="avatar placeholder mx-auto">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
                <span class="text-3xl font-semibold capitalize">{email.slice(0, 1)}</span>
            </div>
        </div>
        <form use:getProfile class="mx-auto w-full" on:submit|preventDefault={updateProfile}>
            <div class="text-center">
              <span id="email" type="text" class="text-center text-base-content">{email}</span>
            </div>
            <div class="divider"></div>
            <div>
              <label for="username" class="label">Name</label>
              <input id="username" type="text" class="input border-white focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200" bind:value={username}/>
            </div>  
            <div>
                <label for="website" class="label">Website</label>
                <input type="text" bind:value={website} name="website" id="website" class="input border-white focus:outline-none border-base-100 focus:bg-base-100 focus:border-base-content bg-base-200" placeholder="www.example.com">
            </div>
            <div class="flex justify-end">
              <input type="submit" class="btn btn-primary" value={loading ? 'Loading ...' : 'Update'} disabled={loading}/>
            </div>
        </form>
    </div>
</div>

