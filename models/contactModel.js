const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
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
