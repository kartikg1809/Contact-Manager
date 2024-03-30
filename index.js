const express=require('express');
const dotenv=require('dotenv').config();
const app=express();

const port = process.env.PORT || 5000;

app.get('/',(req, res) =>{
    res.status(200).send("Hello");
});
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});