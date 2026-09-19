import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import {uploadoncloudinary} from "../utils/claudinary.js";
import {Asynchandler} from "../utils/Asynchandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"
import mongoose, { set } from "mongoose";

const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accesstoken = user.generateAccesstoken()
        const refreshtoken = user.generateRefreshtoken()
        user.refreshtoken = refreshtoken
            await user.save({validateBeforeSave: false})
            return {accesstoken,refreshtoken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh Token")
    }
}


const AddStudent = Asynchandler(async (req,res)=>{
    const {fullName ,age,course,email,city } =req.body;
    if([fullName ,age,course,email,city].some((field) =>field?.trim()===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }
    const existeduser = await User.findOne({
        $or : [{fullName},{email}]
    })
    if (existeduser) {
        throw new ApiError(400,"User already existed with this email & Fullname")
    }
    const user = await User.create({
        fullName,
        age,
        course,
        email,
        city
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(new Apiresponse(200,"User Registered SuccessFully"))
})

const SearchStudent = Asynchandler(async (req,res)=>{
        const {fullName} = req.query;
        const user = await User.find({
            fullName : { $regex : fullName || '',$options : 'i'}
        })
        if (!user.length===0) {
            throw new ApiError(404,"Student With This Name Is Not Found")
        }
        return res
        .status(201)
        .json(new Apiresponse(200,user,"User Available"))
})

const Getstudents = Asynchandler(async (req,res) =>{
    const students = await User.find({})
    if (!students) {
        throw new ApiError(500,"Unable to Load All Students")
    }
    return res
    .status(201)
    .json(new Apiresponse(200,students,"All Students Loaded"))
})

const UpdateStudents = Asynchandler(async (req,res) =>{
    const {id} = req.params;
    const {fullName ,age,course,email,city} = req.body;
    const user = await User.findByIdAndUpdate(
        id,
        {
        $set:{
           fullName,
           age,
           course,
           email,
           city 
        }
    },
    {
        new : true,
        runValidators : true
    }
    );
    if (!user) {
        throw new ApiError(404,"User Not Found")
    }
    return res
    .status(201)
    .json(new Apiresponse(200,user,"Update finished Successfully"))
})

const DeleteStudent = Asynchandler(async (req,res) =>{
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        throw new ApiError(404,"User Not Found")
    }
    return res
    .status(201)
    .json(new Apiresponse(200,"Student Deleted SuccessFully"))
})

export {AddStudent,SearchStudent,Getstudents,UpdateStudents,DeleteStudent}

