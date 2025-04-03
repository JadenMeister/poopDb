const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");






router.post("/", async (req, res) =>{
    try{
        const {username, password} = req.body
        console.log("login데이터", {username, password}) // 디버그용, 삭제할것


        const [users]  = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]

        )

        console.log('유저 디비', users)

        if(users.length ===0 ){
            return res.status(400).json({msg: "존재하지 않는 사용자입니다."}) ;
        }

        const user = users[0]

        if(!username || !password || !! users[0].password){
            return res.status(500).json({msg:"서버 내 계정 정보 오류"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({msg: "비밀번호가 일치하지 않습니다."})

        }

        res.session.user ={
            id: user.id,
            username: user.username
        }
        res.status(200).json({
            success: true,
            username: user.username
        })




    } catch(error){
        console.error("로그인 오류:", error)
        res.status(500).json({msg: "서버 오류"})



    }
})


module.exports = router;