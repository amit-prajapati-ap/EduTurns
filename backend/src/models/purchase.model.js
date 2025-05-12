import {Schema, model} from 'mongoose'

const purchaseSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    amount: {
        type : Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }

}, {timestamps: true})

export const Purchase = model('Purchase', purchaseSchema)