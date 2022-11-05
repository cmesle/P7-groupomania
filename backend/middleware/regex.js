const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.+[A-Za-z0-9])(?!.*[^A-Za-z0-9]).{8,}$/

// checking if the entries match the regEx email format and the one for password strength,
// allowing user to proceed if so, sending error message if not.

module.exports = (req, res, next) => {
    try {
        if (emailRegEx.test(req.body.email) && passwordRegex.test(req.body.password)) {
            next()
        } else {
            res.status(400).json({ message: 'please check email format (example@example.xx) and/or password format (min 8 char., at least 1 upper case, at least lower case, at least 1 digit, no special char.)' })
        }
    } catch { () => res.status(400).json({ error }) }
}
