const {sql} = require('../dbConnection');

exports.Register = async (user) => {
    const result = await sql.begin(async (sql) => {
        const [newUser] = await sql`
            INSERT INTO vartotojai (vardas, email, roles) 
            VALUES (${user.vardas}, ${user.email}, ${user.roles || "user"})
            RETURNING *`;

        await sql`
            INSERT INTO vartotoju_informacija (vartotojo_id, password) 
            VALUES (${newUser.id}, ${user.password})
            RETURNING *`;

        return newUser;
    });

        return result;
}

exports.getUserEmail = async (email) => {
    const user = await sql`
    SELECT *
    FROM vartotojai
    WHERE email = ${email}
    `
    return user[0];
}