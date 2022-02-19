<script>
	import '../app.css';
	import supabase from '$lib/db';
	import {session} from '$app/stores'
	import {browser} from '$app/env'
	import {goto} from '$app/navigation'
	
	if (browser) {
			$session = supabase.auth.session()
			$session ? goto('/') : goto('/start')
			supabase.auth.onAuthStateChange((event, sesh) => {
			// Stores session whenever Auth state changes across the website
			$session = sesh
			$session ? goto('/') : goto('/start')
		})
	}
</script>

<main class="max-w-screen-lg min-h-screen overflow-x-hidden mx-auto px-4 md:px-8">
	<slot />

	<!--
	<pre class="w-96 overflow-scroll">
		{JSON.stringify($session, null, 2)}
	</pre>
	-->
</main>
