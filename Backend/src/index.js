import 'dotenv/config'
import connectDB from './db/index.js'
import app from './app.js'
import dns from 'dns'
dns.setServers(['8.8.8.8','1.1.1.1'])


connectDB()
         .then(()=>{
            app.listen(process.env.PORT || 8000, ()=>{
                console.log(`SERVER IS RUNNING AT PORT : ${process.env.PORT || 8000}`)
            })
         })
         .catch((err)=>{
            console.log("Mongodb Connection Failed !!!",err)
         })



















//          connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
// })
