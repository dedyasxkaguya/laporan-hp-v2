import mongoose, { Schema } from "mongoose"

const testSchema = new Schema({
    "username":{type:String,required:true},
    "data":{type:String,required:true},
})

const Tests = mongoose.models.Tests || mongoose.model("Test",testSchema)

export default Tests