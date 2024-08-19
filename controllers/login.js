const db=require("../routes/db-config")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const login = async(req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please Provide an email and password"
            })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err,results) => {
            if (!results || !await bcrypt.compare(password, results[0].password)) {
                res.status(401).send({status:"error",
                    error: 'Email or Password is incorrect'
                })
            } else {
                const id = results[0].id;
                console.log(id);
                const token = jwt.sign({ id }, "rahul123", {
                    expiresIn: 1000000
                });

                console.log("the token is " + token+"Hello");

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + 10000 * 24 * 60 * 60 * 1000
                    ),
                    
                }
                res.cookie('userSave', token, cookieOptions);
                  res.status(200).json({ status: "success", redirectUrl: "/" });
            }
        })
    } catch (err) {
        console.log(err);
    }
}
module.exports= login