const  userModel = require('../models/userModel');

// Read operation
exports.getAllUsers = async(req , res) =>{
  try{
    const data = await userModel.find({})
    res.json({success: true , data: data})
  } catch(error){
    res.status(500).send({success: false , message: "Error fetching data"})
  }
};

// Create operation
exports.createUser = async(req , res) =>{
  try{
    const data = new userModel(req.body);
    await data.save();

    res.send({success: true , message: "Data saved successfully"})
  } catch(err){
    res.status(500).send({success: false, message: "Error saving data"} )
  }
};

// Update operation
exports.updateUser = async(req, res) =>{
  try{
    const {id, ...rest} = req.body;
    await userModel.updateOne({_id : id} , rest);

    res.send({success: true , message: "Data updated successfully"});
  }catch(err){
    res.status(500).send({success: false, message: "Error updating data"});
  }
}

// Delete operation
exports.deleteUser = async(req, res) =>{
  const id = req.params.id;
  try{
    await userModel.deleteOne({_id: id});
    res.send({success:true , message: "Data deleted successfully"});
  } catch(err){
    res.status(500).send({success: false, message: "Error deleting user"});
  }

}