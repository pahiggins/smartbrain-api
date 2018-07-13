const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx
            .insert({
                hash,
                email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    name,
                    email: loginEmail[0],
                    created: new Date()
                })
                .then(user => {
                    return res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'));
};

module.exports = {
    handleRegister
};