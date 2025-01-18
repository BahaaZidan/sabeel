<script lang="ts">
	// import MdiGithub from '~icons/mdi/github';

	// const providerIcons: Record<string, typeof MdiGithub> = {
	// 	github: MdiGithub
	// };

	let { data } = $props();
</script>

<div>
	<div class="flex w-full flex-col items-center gap-2">
		<h2>Login Options</h2>

		{#each data.providerMap as provider}
			<form method="POST" action="/login">
				<input type="hidden" name="providerId" value={provider.id} />
				<button type="submit" class="btn btn-neutral btn-wide">
					<div class="flex items-center gap-2">
						{provider.name}
						<!-- <svelte:component this={providerIcons[provider.id]} /> -->
					</div>
				</button>
			</form>
		{/each}
	</div>
</div>
