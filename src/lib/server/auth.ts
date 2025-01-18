import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import type { Provider } from "@auth/sveltekit/providers";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "./db";
import {
	accountsTable,
	authenticatorsTable,
	sessionsTable,
	usersTable,
	verificationTokensTable
} from "./db/schema";

const providers: Provider[] = [GitHub];

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers,
	pages: {
		signIn: "/login",
		signOut: "/logout"
	},
	trustHost: true,
	adapter: DrizzleAdapter(db, {
		accountsTable,
		usersTable,
		authenticatorsTable,
		sessionsTable,
		verificationTokensTable
	})
});

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});
