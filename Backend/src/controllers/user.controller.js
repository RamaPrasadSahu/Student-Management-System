import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import {Asynchandler} from "../utils/Asynchandler.js";
import {User} from "../models/user.model.js"

const AddStudent = Asynchandler(async (req,res)=>{
    const {name, age, course, email, city } =req.body;
    const fullName = req.body.fullName || name;
    if([fullName ,age,course,email,city].some((field) => String(field ?? "").trim()===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }
    const existeduser = await User.findOne({
        $or : [{fullName},{email}]
    })
    if (existeduser) {
        throw new ApiError(400,"User already existed with this email & Fullname")
    }
    await User.create({
        fullName,
        age,
        course,
        email,
        city
    })

    return res.status(201).json(new Apiresponse(200,"User Registered SuccessFully"))
})

const SearchStudent = Asynchandler(async (req,res)=>{
        const searchName = req.query.fullName || req.query.name || req.body?.fullName || req.body?.name || "";
        const user = await User.find({
            fullName : { $regex : searchName,$options : 'i'}
        })
        if (!user.length) {
            throw new ApiError(404,"Student With This Name Is Not Found")
        }
        return res
        .status(200)
        .json(new Apiresponse(200,user,"User Available"))
})

const Getstudents = Asynchandler(async (req,res) =>{
    const students = await User.find({})
    if (!students) {
        throw new ApiError(500,"Unable to Load All Students")
    }
    return res
    .status(200)
    .json(new Apiresponse(200,students,"All Students Loaded"))
})

const UpdateStudents = Asynchandler(async (req,res) =>{
    const id = req.params.id || req.query.id || req.body?.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid or missing Student ID");
    }
    const {name, age, course, email, city} = req.body;
    const fullName = req.body.fullName || name;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (age !== undefined && age !== '') updateData.age = Number(age);
    if (course) updateData.course = course;
    if (email) updateData.email = email;
    if (city) updateData.city = city;

    const user = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );
    if (!user) {
        throw new ApiError(404, "User Not Found");
    }
    return res
    .status(200)
    .json(new Apiresponse(200, user, "Update finished Successfully"));
})

const DeleteStudent = Asynchandler(async (req,res) =>{
    const id = req.query.id || req.params.id || req.body?.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid or missing Student ID");
    }
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        throw new ApiError(404,"User Not Found")
    }
    return res
    .status(200)
    .json(new Apiresponse(200,"Student Deleted SuccessFully"))
})

export {AddStudent,SearchStudent,Getstudents,UpdateStudents,DeleteStudent}

