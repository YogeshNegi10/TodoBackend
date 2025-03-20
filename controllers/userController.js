import bcrypt from "bcrypt";
import { User } from "../modals/userModal.js";
import sendCookie from "../utils/features.js";
import ErrorHandler from "../utils/error.js";



// Function for creating User..

export const createUser = async (req, res,next) => {

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({email})

    if(user)  return next(new ErrorHandler('Email Already Exists..',404))

  const hashpassword = await bcrypt.hash(password, 10);


    user = await User.create({
    name,
    email,
    password: hashpassword,
  });

  sendCookie(user,res,"User Created....",201);

  } catch (error) {
     
      next(error)
  }
  
  
};

// User Login function..

export const loginUser = async (req, res,next) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (!user) {
      return next(new ErrorHandler('Register First',404))
  
    } else {
  
      const IsMatched = await bcrypt.compare(password, user.password);
  
      if (!IsMatched)  return next(new ErrorHandler('Incorrect password..',404))

        
       sendCookie(user,res,`Welcome Back, ${user.name}`,200);

    }
  } catch (error) {
    next(error)
  }
 
};


// LogOut Function... 


export const logOut = (req,res) =>{
     
    res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });


  res.status(200).json({
    success:true,
    message: "Logged Out...",
  });

}


// To Get my Details...

export const getMyDetails = (req,res) =>{


      res.status(201).json({
        sucess:true,
        message:"User Fetched...",
        user:req.user 
      })
}
