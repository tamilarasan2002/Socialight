import { db } from "../connect.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";



export const register = (req,res)=>{
    // USER NAME ALREADRY EXIST OR NOT
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(error,data)=>{
        // console.log(data);
        if(error) return res.status(500).json(error);
        if(data.length) return res.json({err:"user already exists"});
        
        // HASH THE PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hashedPasswords = bcrypt.hashSync(req.body.password,salt);
        
        // POST THE ALL DA TO USER TABLE
        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

        const value = [req.body.username,req.body.email,hashedPasswords,req.body.name]

        db.query(q,[value],(error,data)=>{
            if(error) return res.status(500).json(error)
            // console.log(data);        
            const q = "SELECT * FROM users WHERE id = ?"
            db.query(q,[data.insertId],(error,logindata)=>{
                // console.log(logindata);
                if(error) return res.status(500).json(error);
                // console.log(error,logindata[0].id);
                const { password, ...other } = logindata[0];
                
                const token = jwt.sign({id:logindata.id},"secretkey") ;
                res.cookie("accessToken", token, {
                    httpOnly:true,
                }).status(200).json({ "msg":"user has been created","auth":true, 'err':null, 'data' : other })
            })    
        })
        
    })
    

}
export const login = (req, res)=>{
    
    console.log(req.body);
    const validatequery = req.body.query;
    const q = `SELECT * FROM users WHERE ${validatequery} = ?`;
    const value = req.body[validatequery];

    db.query(q, [value],(err,data) => { 
        if(err) return res.status(500).json(err);
        console.log(data);
        if(data.length===0) return res.json({ "err":`${validatequery} not found!`, 'auth':false });

        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password);

        if(!checkPassword) return res.json({ 'err': "Wrong Password or User",'auth':false });

        const token = jwt.sign({id:data[0].id},"secretkey") ;
        const { password, ...other } = data[0];
            res.cookie("accessToken", token, {
                httpOnly:true,
            }).status(200).json({ "msg":other,"auth":true, 'err':null })
        
    })
    
}



export const logout = (req, res)=>{
    res.clearCookie("accessToken", {
        secure:true,
        sameSite: "none"
    }).status(200).json("User has been logged out!")
}