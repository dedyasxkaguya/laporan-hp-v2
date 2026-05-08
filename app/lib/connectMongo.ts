import mongoose from "mongoose"

const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Connected with mongo : ", connection.connection.host)
    } catch (error) {
        console.log("Error with : " ,error)
    }
}

export default connectMongo