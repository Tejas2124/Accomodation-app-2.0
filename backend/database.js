// temporary data inclusion code
require("dotenv").config()
//users
//stay

const mongoose=require("mongoose")
const hotelData=require("./test.js")
const {Schema}=mongoose


    mongoose.connect(`mongodb+srv://adminx:${process.env.PASS}@cluster0.fvvdife.mongodb.net/booking`)
    const UserSchema= new Schema({
        username :String,
        password:String,
        booked:[]
    })
    const HotelSchema= new Schema(
        {
            name:String,
            lat:Number,
            long:Number,
            address:String,
            bookTime: [[Number,Number]],
            sleeps:Number,
            price:Number,
            rooms:[]
    
            
        }
    )
    
    const Hotel= mongoose.model("hotel",HotelSchema)
    // for(var i=0;i<hotelData.length;i++){
    //     var x1=new Hotel({name:hotelData[i].hotelName,lat:hotelData[i].latitude,long:hotelData[i].longitude,address:hotelData[i].address,bookTime:[],sleeps:hotelData[i].maxCapacity,price:hotelData[i].pricePerDay})
    //     x1.save()
        
    // }
    const User=mongoose.model("user",UserSchema)
    module.exports={Hotel,User}
    


// user schema

//stay schema




