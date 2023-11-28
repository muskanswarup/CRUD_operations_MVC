// Contains entire MVC architecture 
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

// Creating schema for db

const schemaData = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
}, {
  timestamps: true
})

const userModel = mongoose.model("user" , schemaData)


// READ API --> Get method is used
//  http://localhost:8080
app.get('/' , async(req , res) =>{
  const data = await userModel.find({})

  res.json({success: true , data: data})
})

// CREATE API --> Use POST
//  http://localhost:8080/create 
/*
  name,
  email,
  mobile
*/
app.post('/create' , async(req , res) =>{
  console.log(req.body)
  const data = new userModel(req.body)
  await data.save()
  res.send({success : true, message: "Data saved successfully"})
})

// UPDATE API --> Use PUT
//  http://localhost:8080/update
/*
  name,
  email,
  mobile
*/

app.put('/update' , async(req, res) =>{
  console.log(req.body)
  const{id, ...rest} = req.body

  console.log(rest)
  await userModel.updateOne({_id: id} , {name: "dotdotdot"})
  res.send({success: true, message: "Data updated successfully"})
})

// DELETE API --> Use delete
/*
app.delete('/delete/:id' , async(req, res) =>{
  const id = req.params.id

  console.log(id)

  const data = await userModel.deleteOne(_id : id)
  res.send({success: true , message: "Data deleted successfully"})
})
*/
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  console.log(id);

  try {
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting data" });
  }
});


// app.get('/' , (req , res) =>{
//   res.json({message: "Server is runnning"} )
// })
  
// mongoose.connect("mongodb://localhost:27017/crudoperation").then(() =>{
mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(() =>
{ 
  console.log("Connected to Database")
  app.listen(PORT, () =>{
    console.log("Server is running")
  })
}).catch((err) =>{
  console.log("Error : " + err)
})


