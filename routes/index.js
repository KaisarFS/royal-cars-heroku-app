const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const UserController = require("../controllers/UserController")
const { route } = require('./carRoutes')
const loginRouter = require('./loginRoutes')
const carRoutes = require('./carRoutes')


router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)
router.get("/login", UserController.loginForm)
router.post("/login", UserController.postLogIn)
router.get('/logout', UserController.logOut)
router.use(function(req, res, next) {
    if (!req.session.userId) {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`)
    }
    else {
        next()
    }
})
// router.get('/cars', Controller.renderHome)
router.use('/login', loginRouter)
router.use("/cars", carRoutes)

router.get('/', (req, res) => {
    res.redirect('/cars')
})
// router.get('/car', Controller.renderHome)

module.exports = router