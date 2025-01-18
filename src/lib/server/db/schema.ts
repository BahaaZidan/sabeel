import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("user", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text(),
	email: text().unique(),
	emailVerified: integer({ mode: "timestamp_ms" }),
	image: text()
});

export const accountsTable = sqliteTable(
	"account",
	{
		userId: text()
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		// TODO: .$type<AdapterAccountType>()
		type: text().notNull(),
		provider: text().notNull(),
		providerAccountId: text().notNull(),
		refresh_token: text(),
		access_token: text(),
		expires_at: integer(),
		token_type: text(),
		scope: text(),
		id_token: text(),
		session_state: text()
	},
	(account) => ({
		compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] })
	})
);

export const sessionsTable = sqliteTable("session", {
	sessionToken: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	expires: integer({ mode: "timestamp_ms" }).notNull()
});

export const verificationTokensTable = sqliteTable(
	"verificationToken",
	{
		identifier: text().notNull(),
		token: text().notNull(),
		expires: integer({ mode: "timestamp_ms" }).notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token]
		})
	})
);

export const authenticatorsTable = sqliteTable(
	"authenticator",
	{
		credentialID: text().notNull().unique(),
		userId: text()
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		providerAccountId: text().notNull(),
		credentialPublicKey: text().notNull(),
		counter: integer().notNull(),
		credentialDeviceType: text().notNull(),
		credentialBackedUp: integer({
			mode: "boolean"
		}).notNull(),
		transports: text()
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID]
		})
	})
);
