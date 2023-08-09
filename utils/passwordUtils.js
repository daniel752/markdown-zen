import bcrypt from "bcryptjs";

export async function hashPassword(password)
{
    // Hashing user password with 10 rounds of salting
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function comparePassword(password, hashedPassword)
{
    return await bcrypt.compare(password, hashedPassword);
}