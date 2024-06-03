import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import {login} from "@/app/api/login/route";

export async function currentUser(req, res){
    try{
        const user = await User.findById(req.auth._id);
        res.json({ok:true});
    }catch(error){
        console.log("Error while verifying id", error);
        res.sendStatus(400);
    }
}

export async function POST(req) {
    return currentUser(req);
}