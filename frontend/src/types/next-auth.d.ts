import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		token;
		user: {
			id: string;
			name?: string;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			id: string
			name?: string;
		};
	}
}
