const mongoose = require("mongoose")

const db = async () => {
    await mongoose.connect("mongodb+srv://arzumavani1:Pj5UVvTjXVt97A77@cluster0.u5wb5ct.mongodb.net/Blog");
    console.log("Data base is connected");
}

module.exports = db;
