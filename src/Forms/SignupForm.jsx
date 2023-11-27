import { useState } from "react"
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom';


const SignupForm = ()=>{

    const navitoGetstu = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassord] = useState();
    const [passwordType, setPassordtype] = useState("password")
    const [recData, SetrecData] = useState(false);
    const [esUser, setEsuser] = useState(false);

    const formHandler= async (e)=>{

        e.preventDefault();

        console.log({name:name, email:email, password:password +"from here"});

        const postrequest =  await fetch("https://sampleauthentication.onrender.com/users/signup",{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "name": name,
              "email":email,
              "password":password
            })
          });
          
        //  requests tatus 201 - if sucess, and request status 400 if email aldready exists 
        console.log(postrequest.status); 

        const postresponse = await postrequest.json();
        console.log(postresponse); // acknowledged :true,
// request is sent and if the response is 201, then navigate to Getdetails pg, and set the token rec from BE
          if(postrequest.status===201){
            setEsuser(true);
            setTimeout(() => {
                  navitoGetstu("/");              
            }, 3000);
          }
          if (postrequest.status===400){
            SetrecData("true");
          }

    }

    return(
        <div className="background-color">
            <div className="row"> 
        <div className="col-sm-12">
            <h2 className="text-center heading-color mt-4">Authentication App </h2>

{ recData ? <div className="row">
    <div className="col-sm-12">
    <div className="alert alert-danger text-center mt-4" role="alert">
      <b>Email adready exists ! </b> </div> </div> </div> :  null}

 { esUser ? <div className="row">
    <div className="col-sm-12">
    <div className="alert alert-success text-center mt-4" role="alert">
      <b>Signuped sucessfully ! </b> </div> </div> </div> :  null}

</div>
            </div>

            <div className="row"> 
                <div className="col-sm-3">
                </div>
                <div className="col-sm-6">
                <div className="form-height  "> 
        <form >
        <div >          
        <div className="form-outline  margin-box mb-4">
            <input type="name" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter your user name" onChange={(e)=>{
                setName(e.target.value)
              }} />
          </div>

          <div className="form-outline margin-box from-width mb-4">
            <input type="email" id="form2Example2" className="form-control form-control-lg"
              placeholder="Enter a valid email address" required onChange={(e)=>{
                setEmail(e.target.value)
              }} />
          </div>

          <div className="form-outline margin-box mb-3">
            <input type={passwordType} id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" required onChange={(e)=>{setPassord(e.target.value)}} />
          </div>
          
          <div className="form-outline margin-box mb-3">
            <input type="tel" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter phone number"  />
          </div>

          <input className="mb-3 margin-box"  type="checkbox" onChange={()=>{
            setPassordtype("text");
          }}/>&nbsp; Show Password
          
          <div className="d-grid gap-2 margin-box">
          <button  className="btn btn-primary btn-lg" type="submit" onClick={(e)=>{formHandler(e)}}><b>Sign Up</b></button>
          </div>
            
{/* End of Logins JS process */}


</div>
          </form>
          </div>
                </div>
                <div className="col-sm-3">
                </div>
            </div>
            
        </div>
   )
}

export default SignupForm;