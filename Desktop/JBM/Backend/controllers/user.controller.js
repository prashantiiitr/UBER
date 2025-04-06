import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedpassword,
      phoneNumber,
      role,
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {}
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.role !== role) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const tokenData = {
      userId: user._id,
    };
  

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
          message: "Logged out successfully.",
          success: true
      })
  } catch (error) {
      console.log(error);
  }
}

export const updateProfile = async (req, res) => {
  try {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
      


      let skillsArray;
      if(skills){
          skillsArray = skills.split(",");
      }
      const userId = req.id; // middleware authentication
      let user = await User.findById(userId);

      if (!user) {
          return res.status(400).json({
              message: "User not found.",
              success: false
          })
      }
    
      if(fullname) user.fullname = fullname
      if(email) user.email = email
      if(phoneNumber)  user.phoneNumber = phoneNumber
      if(bio) user.profile.bio = bio
      if(skills) user.profile.skills = skillsArray
    
    

      await user.save();

      user = {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
      }

      return res.status(200).json({
          message:"Profile updated successfully.",
          user,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}