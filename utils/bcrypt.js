const bcrypt = require('bcrypt')

module.exports = {
    hashpassword: (password) => {
        return bcrypt.hash(password, 10)
    }
}