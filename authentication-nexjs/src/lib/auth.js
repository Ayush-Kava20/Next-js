import { hash } from "bcryptjs";

export default async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}