import * as dotenv from "dotenv"
import { Logger } from "@nestjs/common"


dotenv.config()

export type ConfigType = {
    PORT: number
    DB_URL: string
    GOOGLE_OAUTH_CLIENT_ID: string
    GOOGLE_OAUTH_CLIENT_SECRET: string
}

const requiredVariables = [
    "PORT",
    "DB_URL",
    "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET"
]

const missingVariables = requiredVariables.filter((variable) => {
	const value = process.env[variable];
	return !value || value.trim() === "";
});

if (missingVariables.length > 0) {
	Logger.error(`Missing or empty required environment variables: ${missingVariables.join(", ")}`);
	process.exit(1);
}

export const config: ConfigType = {
    PORT: parseInt(process.env.PORT as string, 10),
    DB_URL: process.env.DB_URL as string,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET
}