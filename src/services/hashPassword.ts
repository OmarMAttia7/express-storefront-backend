import bcrypt from 'bcrypt';
import env from '../utils/env';


export default async function hashPassword(pwd: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(pwd, Number(env('SALT_ROUNDS')));

  return hashedPassword;
}