import mongoose , {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
        unique : true
    } ,
    age : {
        type : String,
        required : true,
        unique : true
    },
    course : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    city : {
        type : String,
        required : true,
        unique : true
    }
},
{
    timestamps : true
})

