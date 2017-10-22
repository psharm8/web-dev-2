const express=require('express');
const app=express();

app.get("/compute-results", async (req, res)=>{
    res.json({done:false, working:true});
});
