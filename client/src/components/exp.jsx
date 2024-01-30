
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
var b=[]
function bound(x,y,w,h){
x1=x
x2=x+w
y1=y
y2=y-h
return [[x1,x2][y1,y2]]
}
const func=()=>{
    console.log("hello")
}
function getcoords(){
   
    console.log("i am draged")
}
function flush(){
   window.removeEventListener("mousemove",func)
    
   
}
function Exp(){
const divRef=useRef(null)
useEffect(()=>{
    console.log(divRef.current.getBoundingClientRect())
},[])
const [a,seta]=useState("hello")

return <>
<div ref={divRef} style={{marginTop:200,marginLeft:300,backgroundColor:"red"}}>
{a}
</div>
<div onMouseDown={getcoords} style={{position:"absolute"}}></div>
</>
}


export default Exp