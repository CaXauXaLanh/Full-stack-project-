import db from "../models/index";
import bcrypt from "bcrypt";
import CRUDService from "../service/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        res.render("homepage", {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

let getCreateUser = (req, res) => {
    res.render("create");
};

let postCreateUser = async (req, res) => {
    let message = await CRUDService.createUser(req.body);
    console.log(message)
    res.send("ok");
};

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getHomePage: getHomePage,
    getCreateUser: getCreateUser,
    postCreateUser: postCreateUser,
};
