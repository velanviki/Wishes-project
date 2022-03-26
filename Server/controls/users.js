import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from '../modols/users.js';

export const signin = async(req,res) => {
const {email,password} = req.body;

try {
    const existUser = await  User.findOne({email});

    if (!existUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: existUser.email, id: existUser._id }, 'test', { expiresIn: "1h" });
    res.status(200).json({ result: existUser, token });

} catch (error) {
    res.status(500).json({ message: "Something went wrong" });
}
}


export const signup = async(req,res) => {
    const { email, password, firstName, lastName } = req.body;
    // console.log(req.body);
    try {
        const existUser = await User.findOne({ email });
    
        if (existUser) return res.status(400).json({ message: "User already exists" });
        
    //     const confirmPassword = await req.body.password;
    //     const isPasswordCorrect = await bcrypt.compare(password, confirmPassword);
    // if (isPasswordCorrect !== confirmPassword) return res.status(400).json({ message: "PW doesn't match" });


        const hashedPassword = await bcrypt.hash(password, 12);
    
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    
        const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );
    
        res.status(201).json({ result, token });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        
        console.log(error);
      }
};