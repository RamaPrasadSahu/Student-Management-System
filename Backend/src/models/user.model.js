import mongoose , {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true
    } ,
    age : {
        type : Number,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    city : {
        type : String,
        required : true
    }
},
{
    timestamps : true
})

userSchema.pre("save" ,async function () {
    if(!this.isModified("password")) return;    
    this.password = await bcrypt.hash(this.password,10);
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}
userSchema.methods.generateAccesstoken = function (){
    return jwt.sign ({
        _id : this._id,
        fullName : this.fullName,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshtoken = function () {
    return jwt.sign ({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
 )
}

export const User = mongoose.model("User",userSchema)