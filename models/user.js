const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    image: String,
    phone: String,
    role: String,
    token: String,
    email: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: [
            "ACTIVE", "INACTIVE", "DELETED"
        ],
        default: "ACTIVE"
    },

},
    {
        timestamps: true
    }
)

const User = mongoose.model("USER", userSchema);

module.exports = {
    User,
    create: async (body) => {
        try {
            await User.create(body)
            return true
        }
        catch (err) {
            console.log('Create User', err)
            return false
        }
    },
    fetchAll: async () => {
        try {
            return await User.find()
        }
        catch (err) {
            console.log('Fetch All user Error', err)
            return false
        }
    },
    fetchByEmail: async (email) => {
        try {
            const user = await User.findOne({ email: email });
            return user;
        }
        catch (err) {
            console.log('User Fetch by email error');
            return false
        }
    },
    updateUserTOken: async (userId, token) => {
        try {
            const update = await User.findOneAndUpdate({ _id: userId }, {
                $set: {
                    token: token
                }
            })
            return update
        } catch (err) {
            console.log('Error in Update User Toke', err);
            return false
        }

    },
    findUserById: async (id) => {
        try {
            const user = await User.findOne({ _id: id });
            return user;
        }
        catch (err) {
            console.log('User Fetch by email error');
            return false
        }
    },

}