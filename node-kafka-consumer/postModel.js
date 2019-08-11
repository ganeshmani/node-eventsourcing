const Mongoose = require('mongoose');

const postSchema = new Mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    bodyMessage : {
        type : String,
        required : true
    }
},{ timestamps : true });

class Post {

    static getPostById(id) {
        return this.findOne({
            _id : Mongoose.mongo.ObjectID(id)
        }).exec();
    }

    static getPostsOfUser(userId){

        return this.find({
            userId
        }).exec();

    }

    static insertPost({ userId,title,bodyMessage }){

        const post = this({
            userId,
            title,
            bodyMessage
        })

        return post.save();
    }

    static deletePosts(userId) {

        console.log("deletePosts",userId)
        return this.deleteMany({
            userId : userId
        }).exec();
        
    }

}

postSchema.loadClass(Post);

module.exports = Mongoose.model('Post',postSchema)