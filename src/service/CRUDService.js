import bcrypt from "bcrypt";
import db from "../models/index";

const saltRounds = 10;
let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
            });

            resolve('create successful')
        } catch (error) {
            reject(error);
        }
    });
};

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await bcrypt.hash(password, saltRounds);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUser: createUser,
};
