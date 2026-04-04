import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
export const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
}

export const verifyJwt = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}