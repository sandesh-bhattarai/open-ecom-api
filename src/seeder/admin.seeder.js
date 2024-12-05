const bcrypt = require("bcryptjs");
const UserModel = require("../modules/auth/user.model");

const adminUsers = [
    {
        name: "Admin User",
        email: "sandesh@broadwayinfosys.com",
        role: "admin",
        password: bcrypt.hashSync("Admin123#"),
        gender: "male",
        status: "active"
    }
]

const populateAdmin =async () => {
    try {
        const listUsers = [];

        for(let user of adminUsers) {
            let existingUser  = await UserModel.findOne({email: user.email});
            if(!existingUser) {
                let newObj = new UserModel(user);
                listUsers.push(newObj.save())
            }
        }
        await Promise.allSettled(listUsers)
    } catch(exception) {
        console.log("Error populating Admin users....", exception);
        throw exception;
    }
}

module.exports = populateAdmin