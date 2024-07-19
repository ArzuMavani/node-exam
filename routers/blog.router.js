const passport = require('passport');
const { Router } = require('express');
const { home, addUpdateArticles, uploadImg, getArticles, deleteArticles, logIn, register, logout, logInPage, registerPage } = require('../controllers/blog.controller');
const { userAuth } = require('../middleware/blog.auth');



const router = Router();

router.get('/login', logInPage);
router.get('/register', registerPage);
router.get("/", userAuth, home);
router.get("/addUpdateArticles", getArticles);
router.get("/deleteArticles", deleteArticles);
router.get('/logout', logout);

router.post("/addUpdateArticles", uploadImg, addUpdateArticles)
router.post('/register', register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router