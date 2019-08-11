const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username : {
        type : String,
        required : true
    }
},{ timestamps : true });

class User {

    static getUserById(id) {

        return this.findOne({
            _id : Mongoose.mongo.ObjectID(id)
        }).exec();
    }

    static insertUser({ username }){

        const user = this({
            username
        });

        return user.save();
    }

    static deleteUser(userId) {

        return this.deleteOne({
            _id : Mongoose.mongo.ObjectID(userId)
        })
    }


}

userSchema.loadClass(User);

module.exports = Mongoose.model('User',userSchema)