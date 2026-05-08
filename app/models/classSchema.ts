import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
    grade:{type:String, required:true},
    name:{type:String, required:true},
    vocation:{type:String, required:true},
    uuid:{type:String, required:true},
    teacher_name:{type:String, required:true},
    classroom:{type:String, required:true},
})

const Class = mongoose.models.Class || mongoose.model("Class",classSchema)

export default Class