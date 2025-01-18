import { signOut } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions = { default: signOut } satisfies Actions;

export const load: PageServerLoad = async () => {
	redirect(303, `/`);
};
