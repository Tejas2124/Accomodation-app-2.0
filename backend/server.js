require("./database.js")
const express=require("express")
const cors=require("cors")
const {User,Hotel}=require("./database.js")
const app=express()



app.use(cors())
app.use(express.json())
app.post("/signup",async (req,res)=>{
var result=await User.find({username:req.body.username})
if (result.length==0){
    try{
    result= await   User.create({username:req.body.username,password:req.body.password})
    res.send({code:1})
    }catch(e){
        res.send({code:0})
    }
}else{
res.send({code:0})
}})

app.post("/signin",async (req,res)=>{
    console.log("hello")
    var result=await User.find({username:req.body.username})
    console.log(result)
    const password=result[0].password
if (result.length!=0){
    if (password===req.body.password){
        res.send({code:1})
    }else{
        res.send({code:0})
    }
}else{
    res.send({code:0})
}


})

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  
  // Example coordinates (New York City and Los Angeles)
 

app.post("/solutions",async (req,res)=>{
//expense,caapcity,distance
const packet=req.body.packet
function minmax(key){
var max=-Infinity
a=[]
for (var i=1;i<result.length;i++){
a.push(result[i][key])

}


return [Math.max(...a),Math.min(...a)]
}
var lat=req.body.latitude
var long=req.body.longitude

var result=await Hotel.find()
var h=[...result]
result=result.map((item)=>{ return {price:item["price"],capacity:item["sleeps"],distance: calculateDistance(lat,long,item["lat"],item["long"])}})
console.log(result)
// console.log(minmax("price"),minmax("capacity"),minmax("distance"))
minmax_rooms=[minmax("price"),minmax("capacity"),minmax("distance")]
result=result.map((item)=>{ return [item["price"],item["capacity"],item["distance"]]})
for(var i=0;i<3;i++){
for(var j=0;j<result.length;j++){
result[j][i]=((minmax_rooms[i][0]-result[j][i])/(minmax_rooms[i][0]-minmax_rooms[i][1]))

}

}
console.log(result)
for(var i=0;i<result.length;i++){
result[i][3]=i
}
console.log(result)
for(var i=0;i<result.length;i++){
result[i]=[Math.sqrt(Math.pow(result[i][0]-packet["1"],2)+Math.pow(result[i][1]-packet["2"],2)+Math.pow(result[i][2]-packet["3"],2)),result[i][3]]
}
console.log(result)
result.sort((a,b)=>b[0]-a[0])
console.log(result)

var toRender=[]
for (var i=0;i<10;i++){
toRender.push(result[i][1])
}
console.log(toRender)
var Tosend=[]

for(var i=0;i<toRender.length;i++){
Tosend.push(h[toRender[i]])
}
console.log(Tosend)
res.send(Tosend)
})

app.post("/checkTime",async (req,res)=>{
    console.log(req.body)
    const id =req.body.hotel_id
    console.log(id)
    var price=req.body.price
    const stay=req.body.stay
    
    console.log(stay)
     const result=await Hotel.find({_id:id})
     
     var rooms=result[0].rooms
     console.log(rooms)
     for(var i=0;i<rooms.length;i++){
     console.log(rooms[i].bookTime)
     }
     //check
     //allocate
     var x= new Date(`${stay.inyear}-${stay.inmonth}-${stay.inday}`)
     var y= new Date(`${stay.outyear}-${stay.outmonth}-${stay.outday}`)

     x=x.getTime()
     y=y.getTime()
     console.log(x,y)
     console.log(price)
     var total_amount=(parseInt(price)*((y-x)/(1000*60*60*24)))
     console.log(total_amount+"amount is")
     for(var i=0;i<rooms.length;i++){
        var push=true
        if(rooms[i].bookTime.length==0){
         
         
         res.send({code:101,payload:{price: total_amount}})
         return
        }
        for (var j=0;j<rooms[i].bookTime.length;j++){

            var s=rooms[i].bookTime[j][0]
            var e=rooms[i].bookTime[j][1]
           
            if ((x>=s && y<=e )){
                push=false
                
            }
                
            
             
            
        }
        if (push==true){
         //push
         
        
         res.send({code:101,payload:{price: total_amount}})
         return 
        }
     }
     
res.send({code:102})
})

app.post("/book",async (req,res)=>{
    console.log(req.body)
    const id =req.body.hotel_id
    console.log(id)
    const user=req.body.user
    console.log("user is",user)
    const price=req.body.price
    const stay=req.body.stay
    console.log(stay)
     const result=await Hotel.find({_id:id})
     
     var rooms=result[0].rooms
     console.log(rooms)
     for(var i=0;i<rooms.length;i++){
     console.log(rooms[i].bookTime)
     }
     //check
     //allocate
     var x= new Date(`${stay.inyear}-${stay.inmonth}-${stay.inday}`)
     var y= new Date(`${stay.outyear}-${stay.outmonth}-${stay.outday}`)

     x=x.getTime()
     y=y.getTime()
     console.log(x,y)
  
     for(var i=0;i<rooms.length;i++){
        var push=true
        if(rooms[i].bookTime.length==0){
         rooms[i].bookTime.push([x,y])
         await Hotel.updateOne({_id:id},{$set:{"rooms":rooms}})
         await User.updateOne({username:user},{$push:{booked:id}})
         res.send({code:103})
         return
        }
        for (var j=0;j<rooms[i].bookTime.length;j++){

            var s=rooms[i].bookTime[j][0]
            var e=rooms[i].bookTime[j][1]
           
            if ((x>=s && y<=e )){
                push=false
                
            }
                
            
             
            
        }
        if (push==true){
         //push
         rooms[i].bookTime.push([x,y])
         await Hotel.updateOne({_id:id},{$set:{"rooms":rooms}})
         await User.updateOne({username:user},{$push:{booked:id}})
         res.send({code:103})
         return 
        }
     }
     
res.send({code:104})
})


app.post("/user",async (req,res)=>{
var result=await User.find({username:req.body.username})
res.send(result[0].booked)
})
app.post("/hotel",async (req,res)=>{
    console.log(req.body.bookList)
var result=await Hotel.find({_id:{$in:req.body.bookList}})
console.log("bookes",)
res.send(result)
})
// console.log(process.env.PASS)
app.listen(800)


async function update_database(){
    var rooms=[]
    for (var i=0;i<10;i++){
      rooms.push({id:i,bookTime:[]})
    }



    try{
        var res=await Hotel.updateMany({},{$set:{rooms:rooms}})
        var res=await Hotel.find()
        console.log(res[0])

       
    }catch(e){
      console.log(e)
    }
}
// update_database()