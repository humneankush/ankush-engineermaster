const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../model/User")

// updating the user
router.put("/:id",async(req,res)=>{
    
        if(req.body.userId === req.params.id){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
            try {
                const updateUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,

                    },
                    {new:true}
                )
                const {password,...info} = updateUser._doc
                res.status(200).json(info)

                
            } catch (error) {
                 res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can update only your account!");

        }
   
})






module.exports = router