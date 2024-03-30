const asyncHandler=require('express-async-handler')
const Contact=require("../models/contactModel")

const getContacts=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find();
    res.status(200).json(contacts);
})
const createContact=asyncHandler(async (req,res)=>{
    console.log(req.body);
    const{name,email}=req.body;
    if(!name||!email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
    });
    res.status(201).json(contact);
})
const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('No Contact Found')
    }
    res.status(200).json(contact);
})
const updateContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('No Contact Found')
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
})
const deleteContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('No Contact Found')
    }
    await Contact.remove();
    res.status(200).json(contact);
})
module.exports={getContact,createContact,deleteContact,updateContact,getContacts};