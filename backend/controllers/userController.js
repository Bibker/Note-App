const asyncHandler= require('express-async-handler')
const User= require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req,res)=>{
    const {name, email, password, pic}=req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User Already Exists");
    }

    const user= await User.create({
        name, 
        email, 
        password, 
        pic,
    });

    if(user)
    {
        const token = generateToken(user._id);
        res.cookie("auth", token);
        res.status(201).json({
            status:"User Created Successfully",
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic:user.pic,
            token:token

        });
    }
    else
    {
        res.status(400)
        throw new Error("Error Occured");
    }
    res.json({
        name, 
        email,
    })

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user= await User.findOne({email});
    if(user && (await user.matchPassword(password)))
    {
        const token = generateToken(user._id);
        res.cookie("auth", token);
        res.cookie("user", JSON.stringify(user))
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: token
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid Email or Password");
    }

   
})

module.exports = {registerUser, authUser}