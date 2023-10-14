import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        require: true,
        minlength: 5
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'not specified'],
        default: 'not specified'
    },
    userMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]

}, {
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema)