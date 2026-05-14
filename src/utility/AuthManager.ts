import jwt from 'jsonwebtoken'

const SECRET_KEY = 'secret'

export const signJWT = (payload: any) => {

    try {

        return jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

    } catch (err: any) {

        return err.message
    }
}

export const verifyJWT = (token: string) => {

    try {

        return jwt.verify(
            token,
            SECRET_KEY
        )

    } catch (err: any) {

        return err.message
    }
}