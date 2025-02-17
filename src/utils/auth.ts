import 'server-only'
import { SignJWT, jwtVerify, JWTPayload } from 'jose'

const secretKey = process.env.SECRET_KEY ?? 'default-secret-key'
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2yr')
        .sign(encodedKey)
}

export async function decrypt(session: string) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch {
        console.log('Failed to verify session')
    }
}
