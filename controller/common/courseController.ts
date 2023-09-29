import { Request, Response } from "express";
import Joi from "joi";
import Course from "../../model/Course";
import { RESPONSES, RES_MSG } from "../../responses";
import UniversityModel from "../../model/UniversityModel";
import { MessageUtil } from "../../utils/message";


class Courses {
    public courses = async (req: Request, res: Response) => {

        //   console.log(req,"requestttt");

        try {
            const { university, name, level } = req.body
            const schema = Joi.object({
                name: Joi.string().trim(),
                university: Joi.string().trim(),
                level: Joi.string()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                throw {
                    message: error.details[0].message,
                    status: RESPONSES.BADREQUEST,
                    error: true,
                }
            }

            const result = await Course.findOne({
                level: level

            })
            console.log(result,"result");
            
            if (result) {
                return MessageUtil.error(res, {
                    message: RES_MSG.REGISTER.ALREADY,
                    status: RESPONSES.INVALID_REQ,
                    error: true,
                })
            }
            const course: object = {
                university: university,
                name: name,
                level: level
            }
            console.log("course", course);

            const result1 = await Course.create(course);
            if (result1) {
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
    };



    // . Write a MongoDB query to find the level  for each course.
    public common = async (req: Request, res: Response) => {
        try {
            const dataSchema = await Course.aggregate([
                { $unwind: "$university" },
                { $group: { _id: "$level", avg: { $avg: "$university.name" } } }
            ])
            console.log(dataSchema, "dataSchema");
            res.status(200).json({
                message: "fetched"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "an error occured while processing the request"
            })

        }

    };

    // . Write a MongoDB query to find the name  for each course.
    public getName = async (req: Request, res: Response) => {
        try {
            const dataSchema = await Course.aggregate([
                { $unwind: "$university" },
                { $group: { _id: "$name", name: { $min: "$course.name" } } }
            ])
            console.log(dataSchema, "dataSchema");
            res.status(200).json({
                message: "fetched"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "an error occured while processing the request"
            })

        }

    };

    // . Write a MongoDB query to find the name  for each university in the course.
    public getUniversity = async (req: Request, res: Response) => {
        try {
            const dataSchema = await Course.aggregate([
                // { $unwind: "$course" },
                { $match: { "$university.name": "ipu" } },
                { $group: { _id: "$name" } }
            ])
            console.log(dataSchema, "dataSchema");
            res.status(200).json({
                message: "fetched"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "an error occurred while processing the request"
            })

        }

    }



}
export default new Courses