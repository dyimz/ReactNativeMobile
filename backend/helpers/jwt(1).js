// const expressjwt = require('express-jwt');
const { expressjwt: jwt } = require("express-jwt");
function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({
        secret,
        algorithms: ['HS256'],
        // isRevoked: isRevoked
    })
    .unless({
        path: [
            { url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] },
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/categories`,
            `${api}/users`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt