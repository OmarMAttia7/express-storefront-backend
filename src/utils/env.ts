import dotenv from "dotenv";

dotenv.config();

function env(variable: string): string | undefined {
  return process.env[variable];
}

export default env;
