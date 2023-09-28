import { db } from "../connect.js";

export const ForgotPassword = (req, res)=>{         
    console.log(req.body);
    const validatequery = req.body.query;
    const q = `SELECT * FROM users WHERE ${validatequery} = ?`;
    const value = req.body[validatequery];
    db.query(q, [value],(err,data) => { 
        if(err) return res.status(500).json(err);
        console.log(data);
        if(data.length===0) return res.json({ "err":`${validatequery} not found!`});
        const otp = Math.round(Math.random()*1000000);
        console.log(otp);
        return res.json({'otp':otp })
    })

   
}

export const ResetPassword = (req, res)=>{         
    console.log(req.body);
    const validatequery = req.body.query;
    const q = `SELECT * FROM users WHERE ${validatequery} = ?`;
    const value = req.body[validatequery];
    db.query(q, [value],(err,data) => { 
        if(err) return res.status(500).json(err);
        console.log(data);
        if(data.length===0) return res.json({ "err":`${validatequery} not found!`});

        var digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++ ) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
           
        console.log(otp);
        return res.json({'otp':otp })
    })

   
}