import { dbConnect } from "@/connection/db.connect";
import { IUsers, UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import validate from 'validator'
import crypto from 'crypto'

await  dbConnect()
export const POST = async(req:NextRequest)=>{
    const {password, phoneNumber,remarks,email,officeEmail,companyEmail,cinPanGst,agreeToTerms,isVerified,isRecruiter,createdAt,updatedAt}:IUsers = await req.json();

    if(!phoneNumber  || !email || !password ){
        return NextResponse.json({success:false ,message:"(Phone No. , Email and Password is required)"}, {status:400})
    }

    if(!validate.isEmail(email)){
        return NextResponse.json({success:false , message:"Invalid email"}, {status:400})
    }
    if(officeEmail && officeEmail.trim()!=='' && !validate.isEmail(officeEmail)){
        return NextResponse.json({success:false, message:"Invalid OfficeEmail"},{status:400})
    }

    if(companyEmail && companyEmail.trim()!=='' && !validate.isEmail(companyEmail)){
        return NextResponse.json({success:false, message:"Invalid CompanyEmail"}, {status:400})
    }
    if(password.length<6 && password.length>16){
        return NextResponse.json({success:false, message:"Password must be lie between  6 to 16 character"})
    }
    const alreadyHave = await UserModel.findOne({$or:[{email}, {phoneNumber}]})
    if(alreadyHave){
        return NextResponse.json({success:false, message:"already listed this user"}, {status:400})
    }
    const hashPassword = await bcrypt.hash(password, 10) as string;
    const newUser = await UserModel.create({
        email,
        phoneNumber,
        officeEmail:officeEmail?officeEmail:"",
        companyEmail:companyEmail?companyEmail:"",
        remarks,
        cinPanGst,
        agreeToTerms,
        isVerified,
        isRecruiter,
        createdAt,
        updatedAt,
        password:hashPassword,
        id:crypto.randomUUID()
    })

    if(!newUser._id){
        return NextResponse.json({success:false, message:"Please try again.."}, {status:500})
    }
    return NextResponse.json({success: true, message:"User added successfully"}, { status:201})
}

export const GET = async()=>{
    const getUser = await UserModel.find()
    if(getUser.length<=0){
        return NextResponse.json({success:true, message:"No users found"}, {status:200})
    }

    return NextResponse.json(getUser, {status:200})
}