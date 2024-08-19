// const db=require("../routes/db-config")
// const bcrypt = require('bcryptjs');
// const registers = async(req, res) => {
//     console.log(req.body);
//     const { name, email, password, repassword } = req.body;
//     db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (results.length > 0) {
//                 return res.send( {
//                     error: 'The email is already in use'
//                 })
//             } else if (password != repassword) {
//                 return res.send( {
//                     error: 'Password dont match'
//                 });
//             }
//         }

   

//         let hashedPassword = await bcrypt.hash(password, 8);
//         console.log(hashedPassword);
        
//         db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 return res.send( {
//                     success: 'User registered'
//                 });
//             }
//         })
//     })
   
// }

// module.exports=registers
const db = require("../routes/db-config");
const bcrypt = require('bcryptjs');


const registers = async (req, res) => {
    console.log(req.body);
    const { name, email, password, repassword } = req.body;

    try {
        // Check if email already exists
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ status: 'error',error:"Some errro occurs" });
            } 
            
            if (results.length > 0) {
                return res.send({ status:'error',error:"Email already exist" });
            }

            // Check if passwords match
            if (password !== repassword) {
                return res.send({status:"error",error: 'Passwords do not match' });
            }

            // Hash the password
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            // Insert the new user into the database
            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({status:"error",error: 'Internal Server Error' });
                } 
                return res.send({status:"success",success: 'User registered' });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:"error",error: 'Something went wrong' });
    }
}

module.exports = registers;
