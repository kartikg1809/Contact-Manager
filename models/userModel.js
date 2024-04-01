const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Pls add the Username"],
    },
    email:{
        type:String,
        required:[true,"Pls add the email"],
        unique:[true,"Email already registered"],
    },
    password:{
        type:String,
        required:[true,"Pls add the password"],
    },
},{
    timeStamps:true,
});

module.exports=mongoose.model('User',contactSchema);
