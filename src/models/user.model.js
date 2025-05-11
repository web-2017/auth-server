import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        age: {
            type: Number,
        },
        role: {
            type: String,
            default: 'User',
        },
    },
    { timestamps: true },
)

const User = mongoose.model('User', userSchema)
export default User
