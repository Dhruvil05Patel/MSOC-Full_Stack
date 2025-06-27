const express = require('express')
const router = express.Router()

const loggingMiddleware = function (req, res, next){
    console.log("i am logging");
    next();
}
router.use(loggingMiddleware);

const authorization = function (req, res, next){
    console.log("i am authorization");

    req.user = {
        name : "dhruvil",
        role : "student",
    }

    if(req.user){
        next();
    }
    else{
        res.json({
            success : false,
            message : "Not a Valid User",
        });
    }
}

const isStudent = function (req, res, next){
    console.log("Student Verification");
    if(req.user.role === "student"){
        next();
    }
    else{
        res.json({
            success : false,
            message : "Only authorized for students"
        });
    }
}

const isAdmin = function (req, res, next){
    console.log("admin Verification");
    if(req.user.role === "admin"){
        next();
    }
    else{
        res.json({
            success : false,
            message : "Only authorized for admins"
        });
    }
}

router.get("/student", authorization, isStudent, (req, res) => {
    console.log("I verify Students");
    res.send("Student Page");
})

router.get("/admin", authorization, isAdmin, (req, res) => {
    console.log("I verify Admins");
    res.send("Admin Page");
})

module.exports = router
