import { Request,Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { Error } from "mongoose";
import { RESPONSES, RES_MSG } from "../../responses";
import UniversityModel from "../../model/UniversityModel";
import { MessageUtil } from "../../utils/message";
import Course from "../../model/Course";

class CommonApis{
    
  register=async(req:Request,res:Response)=>{
    try {
        const {country,city,name,location,students}=req.body

        const schema = Joi.object({
            country:Joi.string().trim().required(),
            city: Joi.string().trim().required(),
            name: Joi.string().trim().required(),
            // location: Joi.string().trim().required(),
            // students: Joi.string().trim().required(),

        })
        const {error} = schema.validate(req.body)
        
        if (error)
            throw {
                message: error.details[0].message,
                error: true,
                status: RESPONSES.INVALID_REQ,
            };
            // const hashPassword =bcrypt.hashSync(password,8)
            const already_user= await Course.findOne({
                country: country,
                students: students
            })
        console.log("already user", already_user)
            if(already_user){
                return MessageUtil.error(res,{
                    message: RES_MSG.REGISTER.ALREADY,
                    status: RESPONSES.INVALID_REQ,
                    error: true,
                })
            }

       const newStudent:object={
           country:country,
           city:city,
           name:name,
        //    location: location,
        //    student:students
       }
        console.log("newUser", newStudent);
        
        const result = await UniversityModel.create(newStudent);
        if (result) {
            // mailHelper.sendEmail(1, newUser);
            return MessageUtil.success(res, {
                message: RES_MSG.REGISTER.SUCCESS,
                status: RESPONSES.SUCCESS,
                // data: {
                //   email: registerData.email,
                //   wallet_address: registerData.wallet_address,
                //   token: accessToken,
                // },
                error: false,
            });
        }
    } catch (error) {
        console.log(
            "MessageUtilerror",
            error.message,
            error?.status,
            error?.error
        );
        return MessageUtil.error(res, {
            message: error.message,
            status: error?.status || RESPONSES?.INVALID_REQ,
            error: error?.error || true,
        });
    }
    
  }


}

export default new CommonApis