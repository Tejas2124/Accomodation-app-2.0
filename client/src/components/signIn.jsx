
import { useContext, useState } from "react"
import SignUp from "./signup"
import { User } from "../App"
import axios from "axios"
import {URL} from "../main"
import PrioritySetter from "./setpriority"
import { degree_packet } from "./setpriority"
import './main.css'
import './util.css'

const stay_time={
  inday:null,
  outday:null,
  inmonth:null,
  outmonth:null,
  outyear:null,
  inyear:null,
}
function mutate_stay_time(e){
var name=e.target.name
if(name=="day_in"){
stay_time["inday"]=e.target.value
}else if(name=="day_out"){
stay_time["outday"]=e.target.value
}else if(name=="month_in"){
stay_time["inmonth"]=e.target.value
}else if(name=="month_out"){
stay_time["outmonth"]=e.target.value
}else if(name=="year_in"){
stay_time["inyear"]=e.target.value
}else{
  stay_time["outyear"]=e.target.value
}
console.log(stay_time)
}

export function Book({id,value}){
  var date=new Date()
  var [x,setx]=useState(date.getFullYear())
  var [message,setmessage]=useState()
   function submit(){

   }
   async function dateAvailibility(){
    const result=await axios.post(`${URL}checkTime`,{stay:stay_time,hotel_id:id,price:value})
    console.log(result.data)
    
    if(result.data.code==101){
      setstate2(<>
      <div style={{
        
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          position: 'relative', // To use absolute positioning
          // top: '61%',           // Align the top of the element to the middle of the screen
          // left: '45.5%',          
          fontWeight: 'bold',
          fontSize: '20px',
          backgroundColor: '#f0f0f0',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          color: '#333',
          marginTop: '20px',
          marginBottom:'20px',
          display: 'inline-block',
          border: '2px solid #3A0CA3'
        }}>
          Pay: {result.data.payload.price}
        </div>
      </div>


      <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
        <button
          onClick={async () => {
            const result = await axios.post(`${URL}book`, { stay: stay_time, hotel_id: id, price: value, user: sessionStorage.getItem("user") });

            if (result.data.code === 103) {
              setstate2(<div style={{
                position:'relative',
                top:'50%',
                left:'45%',
                textAlign: 'center',
                marginTop: '20px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#3A0CA3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                display: 'inline-block'
              }}>Successfully booked</div>);
            } else if (result.data.code === 104) {
              setstate2(<div style={{
                marginTop: '20px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                transition: '0.3s',
                display: 'inline-block'
              }}>Sorry, already booked</div>);
            }
          }}
          style={{
            position: 'relative', // To use absolute positioning
            // top: '72%',           // Align the top of the element to the middle of the screen
            // left: '48%',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: '0.3s',
            display: 'inline-block'
          }}
        >
          Pay
        </button>
      </div>

      </>)

    }
   }

   return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '47vh',
      fontFamily: 'Arial, sans-serif',
      background: '#f0f0f0'
    }}>
      <div style={{
        width: 'fit-content',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
      }}>
        <div style={{
          fontWeight: 'bold',
          marginBottom: '10px',
          fontSize: '20px'
        }}>Check In</div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            onChange={mutate_stay_time}
            placeholder="Day"
            type="text"
            name="day_in"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '5px'
            }}
          />
          <input
            onChange={mutate_stay_time}
            placeholder="Month"
            type="text"
            name="month_in"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '5px'
            }}
          />
          <input
            onChange={mutate_stay_time}
            placeholder="Year"
            type="text"
            name="year_in"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '20px' }}>Check Out</div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            onChange={mutate_stay_time}
            placeholder="Day"
            type="text"
            name="day_out"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '5px'
            }}
          />
          <input
            onChange={mutate_stay_time}
            placeholder="Month"
            type="text"
            name="month_out"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '5px'
            }}
          />
          <input
            onChange={mutate_stay_time}
            placeholder="Year"
            type="text"
            name="year_out"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>
        <button
          onClick={dateAvailibility}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3A0CA3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            transition: '0.3s',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          Submit
        </button>
        <div style={{ marginTop: '10px', color: 'blue' }}>{message}</div>
      </div>
    </div>
  );
  
  
}
function book(e){
console.log(e.target.id)
setstate2(<Book value={e.target.value} id={e.target.id}/>)
}
async function sendDegreePacket(){

// await axios.post(`${URL}solutions`,degree_packet)
navigator.geolocation.getCurrentPosition(
    async function(position) {
      // Success: Access position data
      var latitude=position.coords.latitude
      var longitude=position.coords.longitude
       const result=await axios.post(`${URL}solutions`,{"latitude":latitude,"longitude":longitude,packet:degree_packet})
       setstate2(result.data.map((item)=>{
        console.log(item._id)
        return (
          <div id={item._id} style={{ margin: 30, border: '1px solid #ccc', padding: 20, borderRadius: 8 }}>
            <div style={{ marginBottom: 10 }}>
              Name: {item.name}
            </div>
            <div style={{ marginBottom: 10, fontStyle: 'italic' }}>
              Address: {item.address}
            </div>
            <div style={{ marginBottom: 10, color: 'green' }}>
              Price: {item.price}
            </div>
            <div style={{ marginBottom: 10, backgroundColor: '#f7f7f7' }}>
              Sleeps: {item.sleeps}
            </div>
            <button id={item._id} value={item.price} onClick={book} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 4 }}>
              Book
            </button>
          </div>


        )
       }))
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
    },
    function(error) {
      // Error: Handle error messages
      console.error('Error getting location:', error.message);
    }
  );
  

}
var setstate2=null
export function DegreeSet(){
const [show,setshow]=useState()
setstate2=setshow
var a=[{label:"Choose degree for expense",id:1},{label:"Choose degree for capacity",id:2},{label:"Choose degree for distance",id:3}]
const [booked_list,setBookedList]=useState()
return <>
<button 
    onClick={async () => {
        try {
            var res = await axios.post(`${URL}user`, { username: sessionStorage.getItem("user") });
            console.log(res.data);
            var book_list = res.data;
            console.log(book_list);
            res = await axios.post(`${URL}hotel`, { bookList: book_list });
            console.log(res);

            const bookList = res.data.map((item) => (
              <div key={item.id} style={{
                textAlign: 'right',
                backgroundColor: '#f2f2f2',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                display: 'inline-block', // Set display to inline-block
                margin: '5px' // Optional margin between items
              }}>
                {item.name}
              </div>
            ));

            setBookedList(
              <div style={{
                display: 'flex',
                flexDirection: 'column', // Align items to the top right
                flexWrap: 'wrap', // Allow items to wrap to the next line
                justifyContent: 'flex-start', // Start from the rightmost position
                alignItems: 'flex-end' // Align items to the top
              }}>
                {bookList}
              </div>
            );
        } catch (error) {
            console.error(error);
        }
      }
    }
    style={{
        position: 'relative', // To use absolute positioning
        left: '91.8%',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#008CBA',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif'
    }}
>
    See booked
</button>


  {booked_list}
{a.map((item)=><PrioritySetter label={item["label"]} id={item["id"]}/>)}
<button 
    onClick={sendDegreePacket} 
    style={{ 
        padding: '10px 20px', 
        fontSize: '16px', 
        backgroundColor: '#3A0CA3', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
        transition: '0.3s', 
        cursor: 'pointer', 
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        top: '80%',
        left: '47%',
        // transform: 'translate(-50%, -50%)'
    }}
>
    Submit
</button>

<br />
{show}
</>
}
function username(e){
    console.log(e.target.value)
    if( e.target.value.trim()==""){


    }else{
        packet["username"]=e.target.value.trim()
    }

}
function password(e){
console.log(e.target.value)
if( e.target.value.trim()==""){


}else{
    packet["password"]=e.target.value.trim()
}
}

const packet={username:null,password:null}
function SignIn(){
   const {setState}=useContext(User)
   
 function changeScreen(){
    setState(<SignUp/>)

 }
 async function submit(){
    
    console.log("hellooooo")
    if (packet.username==null || packet.password==null){

    }else{
      console.log("hey")
      console.log(packet)
       const res= await axios.post(`${URL}signin`,packet)
       if (res.data.code==1){
        sessionStorage.setItem("user",packet.username)
        setState(<DegreeSet/>)
       }  
    }
}

  return (
    //HTML for SignIn
    <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-form-title" id="abc">
          <label className="login100-form-title-1">
            Sign In
          </label>
      </div>
      <br /><br />

      {/* <form className="login100-form validate-form"> */}
        <div className="wrap-input100 validate-input m-b-26">
          <label htmlFor="username" className="label-input100">Username</label>
          <input className="input100" type="text" name="" id="username" placeholder="Enter username" onChange={username}></input>
          <label htmlFor="" className="focus-input100"></label>
        </div>

        <div className="wrap-input100 validate-input m-b-18" >
          <label htmlFor="password" className="label-input100">Password</label>
          <input className="input100" type="password" name=""  id="password" placeholder="Enter password" onChange={password}></input>
          <label htmlFor="" className="focus-input100"></label>
        </div>



        <div className="container-login100-form-btn">
          <button className="login100-form-btn" onClick={submit}>Submit</button>
        </div>
        <br /><br />
        
      {/* </form> */}
      <div onClick={changeScreen} className="login100-form-btn" id="signup"> OR?  
      Sign up</div>  
    </div>
  </div>
  )
}
export default SignIn