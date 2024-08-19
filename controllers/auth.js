const express=require("express")
const router=express.Router()
const login=require("./login")
const register=require("./registers")
const logout=require("./logout")
router.post("/regis",register)
router.post("/logout",logout)
router.post("/login",login)
module.exports = router;