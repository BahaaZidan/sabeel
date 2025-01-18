import { signIn, providerMap } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions = { default: signIn } satisfies Actions;

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (session?.user) redirect(303, `/`);

	return {
		providerMap
	};
};
