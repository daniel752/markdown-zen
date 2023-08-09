import jwt from 'jsonwebtoken';

export const createJWT = (payload) =>
{
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

    return token;
}

export const verifyJWT = (token) =>
{
    // Verifies user's token with JWT secret and returns the decoded token
    return jwt.verify(token, process.env.JWT_SECRET);
}