const express= require('express');
const app =express();
const cors = require('cors');
const {sequelize,Notice} = require('./models')

app.use(cors());
app.use(express.json());

app.post("/notice",async(req,res)=>{
    const {expires_at,hostel,poster,description} =req.body;
    try {
        const notice = await Notice.create({expires_at,hostel,poster,description})

        return res.json({notice})

    } catch (error) {
        console.log(`Error`,error.message)
        return res.status(500).json({err:error.message})
    }

})
app.get("/notices",async(req,res)=>{
    try {
        const notice = await Notice.findAll()

        return res.json({notice})

    } catch (error) {
        console.log(`Error`,error.message)
        return res.status(500).json({err:error.message})
    }   
})
app.get("/notice/:date",async(req,res)=>{
    try {
        const {date} =req.params;
        const notice = await Notice.findAll({
            where:{
                expires_at:date
            }
        })
        return res.json({notice})
    } catch (error) {
        console.log(`Error`,error.message)
        return res.status(500).json({err:error.message})
    }   
})

 
app.listen({port:5000},async () =>{
    console.log("Server has started on port 5000");
    await sequelize.authenticate()
    console.log(`Database connected!`)
});