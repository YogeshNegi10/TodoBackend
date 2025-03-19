
import mongoose from 'mongoose'

//Using dotenv to access Environmental varialbles


//Function To Connect with Datatbase
const connectDb = () =>{

   mongoose.connect(process.env.MONGO_URI,{
      dbName:'TodoApi',
    }).then(()=>{
        console.log(`DB Connected...`)
    }).catch((err)=>{
        console.log(err)
    })
}

export default connectDb;