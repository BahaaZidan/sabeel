<script lang="ts">
	import "../app.css";
	let { children, data } = $props();
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl font-bold" href="/">Sabeel</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if data.session?.user}
				<li><a href="/dashboard">Dashboard</a></li>
				<li>
					<form method="POST" action="/logout">
						<button type="submit"> Logout </button>
					</form>
				</li>
			{:else}
				<li><a href="/login">Login</a></li>
			{/if}
		</ul>
	</div>
</div>

{@render children()}
