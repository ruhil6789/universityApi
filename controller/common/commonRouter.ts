import express from "express";
import controller from "./controller"
import courseController from "./courseController";
export default express
    .Router()
    .post("/university", controller.register)
    .post("/course", courseController.courses)
    .post("/co", courseController.common)
    .post("/cou", courseController.getName)
    .post("/cour", courseController.getUniversity)


