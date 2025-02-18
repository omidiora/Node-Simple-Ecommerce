const { expressjwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: `/\/api\/v1\/products(.*)/`, method: ['GET', 'OPTIONS'] },
            { url: `/\/api\/v1\/categories(.*)/`, method: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

async function isRevoked(req, token) {
    console.log(token.payload, '🔍 Debugging Token Payload');

    // Ensure payload exists before accessing properties
    if (!token.payload || !token.payload.isAdmin) {
        return true; // Revoke access if isAdmin is missing or false
    }

    return false; // Allow access if isAdmin is true
}

module.exports = authJwt;
