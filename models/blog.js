const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    description: String,
    image: String,
    date: Date,
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: "USER"
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
const Blog = mongoose.model("BLOG", blogSchema);

module.exports = {
    Blog,
    create: async (body) => {
        try {
            await Blog.create(body)
            return true
        } catch (err) {
            console.log('Create blog Error', err);
            return false;
        }
    },
    fetchAll: async () => {
        try {
            const blog = await Blog.find({ status: 'ACTIVE' });
            return blog
        }
        catch (err) {
            return false;
        }
    },
    fetchById: async (id) => {
        try {
            const blog = await Blog.findOne({ _id: id });
            return blog
        }
        catch (err) {
            return false
        }
    },
    deleteById: async (id) => {
        try {
            const blog = await Blog.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        status: "DELETED"
                    }
                })
        }
        catch (err) {
            return false;
        }
    },
    update: async (body) => {
        try {
            const blog = await Blog.findOneAndUpdate(
                { _id: body.id },
                {
                    $set: body
                })
        }
        catch (err) {
            return false;
        }

    }
}
