import mongoose from 'mongoose'

const connectDB = async()=>{
    try{
        mongoose.connection.on("connected",()=>console.log("Mongodb connected"));
        await mongoose.connect(process.env.MONGO_URI);

    }catch(e){
        console.error("Error : ",e);
    }
}
export default connectDB;