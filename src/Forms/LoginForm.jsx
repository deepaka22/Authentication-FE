import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import GetData from "../visibilityDatas/GetData";
import { useNavigate } from 'react-router-dom';

const LoginForm = ()=>{

    const [name, setName] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassord] = useState("");
    const[recData, SetrecData] = useState(false);


    const navitoGetstu = useNavigate();

    
    
    const formHandler= async (e)=>{

        e.preventDefault();
      
        const assignedValue = {name:name,email:email,password:password};
        console.log(JSON.stringify(assignedValue));

        // post request doesnt nee header as content type, however it comes only when the header is there.
try {
  
          const request = await fetch("https://sampleauthentication.onrender.com/users/login", {
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "name": name,
                "email":email,
                "password":password
              })
            })
  
            console.log(request);
            console.log(request.status);
            const response = await request.json();
            console.log(response);
  // request is sent and if the response is 201, then navigate to Getdetails pg, and set the token rec from BE
            if(request.status===201){
              navitoGetstu("/GetDetails");
              localStorage.setItem("x-auth-token", response.token )
            }
            if (request.status===200){
              SetrecData("true");
            }
  
} catch (error) {
  console.log(error);
}

    }
// usedEffect - if aldready the user has loged in once, and user doesn need to login once again til user clicks logout btn
    useEffect(()=>{
      if(localStorage.getItem("x-auth-token")) navitoGetstu("/GetDetails")
    }, [])

    return(

<div className="background-color">
<div className="container ">
{ recData ? 
  <div className="row">
    <div className="col-sm-12">
    <div className="alert alert-danger text-center mt-4" role="alert">
      <b>Invalid Email or Password !  Kindly check and enter valid Email or Password</b>
    </div>
    </div>
    </div> : null}
  
<div className="row form-color">
    <div className="col-sm-6 mt-4">
        <div className="first-column" >
            <div>
        <h1 className="heading-color">Authentication App</h1>
        <h4>Application written in Node.js, React.js, Mongodb, Bootstarp </h4>
        </div>
        </div>

    </div>

    <div className="col-sm-6  form-color">

        <div className="form-height "> 
        <form >
        <div >          
        <div className="form-outline from-width mb-4">
            <input type="name" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter your user name"  onChange={(e)=>{
                setName(e.target.value)
              }} />
          </div>

          <div className="form-outline from-width mb-4">
            <input type="email" id="form2Example2" className="form-control form-control-lg"
              placeholder="Enter a valid email address" required onChange={(e)=>{
                setEmail(e.target.value)
              }} />
          </div>

          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" required onChange={(e)=>{setPassord(e.target.value)}} />
          </div>

          <div className="d-grid gap-2">
          <button  className="btn btn-primary btn-lg" type="submit" onClick={(e)=>{formHandler(e)}}><b>Log in</b></button>
          </div>
            
{/* End of Logins JS process */}

          <div className="d-flex justify-content-between align-items-center">

            <div className="form-check mb-0 mt-4">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="/ChangePassword" className="text-body">Forgot password?</a>
          </div>

          <hr></hr>

          <div className="d-grid gap-4">
          <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?</p>
          <button type="submit" className="btn btn-success btn-lg" onClick={()=>{
            navitoGetstu("/NewUser")
          }} ><b>Create new account</b></button>
          </div>

</div>
          </form>
          </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;