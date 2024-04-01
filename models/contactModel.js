const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true,"Pls add the name"],
    },
    email:{
        type:String,
        required:[true,"Pls add the email"],
    }
},{
    timeStamps:true,
});

module.exports=mongoose.model('Contact',contactSchema);
