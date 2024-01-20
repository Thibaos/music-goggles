import type { Config } from "@planetscale/database";

import { env } from "~/env";

export default {
	host: env.DATABASE_HOST,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
} satisfies Config;
