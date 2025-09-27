import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";

export default async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function checkPassword(password, hashedPassword){
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}