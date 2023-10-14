import mongoose, { Schema } from "mongoose";

const mSgSchema = new Schema({

    content: {
        type: String,
        require: true,
        trim: true
    },

    sendTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

export const messageModel = mongoose.model('Message', mSgSchema)