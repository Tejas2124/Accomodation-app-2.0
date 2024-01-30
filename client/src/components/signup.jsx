import axios from "axios"
import {URL} from "../main"
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
async function submit(e){
	e.preventDefault();
    if (packet.username==null || packet.password==null){

    }else{
        var res=await axios.post(`${URL}signup`,packet)
        console.log(res.data)
    }
}
const packet={username:null,password:null}
function SignUp(){
    // root

    return (
        //HTML for SignUp
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-form-title" id="abc">
					<span className="login100-form-title-1">
						Register
					</span>
				</div>
				<br /><br />

				{/* <form className="login100-form validate-form"> */}
					<div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<span className="label-input100">Username</span>
						<input className="input100" type="text"  name="username" placeholder="Enter username" onChange={username}></input>
						<span className="focus-input100"></span>
					</div>


					<div className="wrap-input100 validate-input m-b-26" data-validate = "Password is required">
						<span className="label-input100">Password</span>
						<input className="input100" type="password"  name="pass" placeholder="Enter password" onChange={password}></input>
						<span className="focus-input100"></span>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={submit}>
							Register
						</button>
					</div>
				{/* </form> */}
			</div>
		</div>
	</div>
    )
}
export default SignUp