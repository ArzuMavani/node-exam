const multer = require('multer');
const fs = require('fs')
const blog = require('../models/blog.schema')
const user = require('../models/user.schema')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadImg = multer({ storage: storage }).single("image")

let articleId;

// GET Data Section

const registerPage = (req, res) => {
    return res.render("register")

}
const logInPage = (req, res) => {
    return res.render("login")
}

const logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        console.log('logout Successfully');
        return res.redirect('/login')
    })
};

const home = async (req, res) => {
    try {
        let data = await blog.find();
        return res.render("myArticles", { blogs: data })
    } catch (error) {
        console.log(error)
    }
}

// const articleForm = async (req, res) => {
//     return res.render("articleForm")
// }

const getArticles = async (req, res) => {
    let { id } = req.query;
    articleId = id
    if (id) {
        try {
            let data = await blog.findById(id);
            return res.render("editArticles", { data })
        } catch (error) {
            console.log(error)
        }
    } else {
        return res.render("articleForm")
    }

}

const deleteArticles = async (req, res) => {
    let { id } = req.query;
    try {
        await blog.findByIdAndDelete(id).then((singleRecode) => {
            fs.unlinkSync(singleRecode.image)
            return res.redirect("/");
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

// POST Data Section

const register = async (req, res) => {
    console.log(req.body);
    let data = await user.create(req.body);
    return res.redirect("/logIn");
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    let User = await user.findOne({ email: email })

    if (User && User.password === password) {
        return res.redirect("/")
    } else {
        console.log("Email or password must be wrong");
        return res.redirect("/logIn")
    }
}

const addUpdateArticles = async (req, res) => {
    if (articleId) {
        if (req.file) {
            blog.findById(articleId).then((singleRecode) => {
                fs.unlinkSync(singleRecode.image)
            }).catch((err) => {
                console.log(err);
            })

            let image = req.file.path

            try {
                let data = await blog.findByIdAndUpdate(articleId, { ...req.body, image })
                return res.redirect("/");
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                let data = await blog.findByIdAndUpdate(articleId, req.body)
                return res.redirect("/");
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        let image = req.file.path
        try {
            let data = await blog.create({ ...req.body, image });
            return res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { home, getArticles, deleteArticles, addUpdateArticles, uploadImg, logIn, register, logout, logInPage, registerPage }