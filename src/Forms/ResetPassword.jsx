import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const ResetPassword = ()=>{

    const [password, setPassord] = useState();
    const [passwordType, setPassordtype] = useState("password");
    const [esUser, setesUser] = useState(false);
    const {id, token} = useParams();

    const navitoGetstu = useNavigate();


    const passwordHandler = async (e)=>{

    try {
          console.log(password);
          e.preventDefault();
  
          const request = await fetch(`https://sampleauthentication.onrender.com/users/passwordReset/${id}/${token}`, {
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "password":password
              })
            })
  
            const response = await request.json();
            if(request.status===201){
              setesUser(true);
  
              setTimeout(() => {
                navitoGetstu("/")
            }, 2000);
  
            }
            console.log(response);
  
    } catch (error) {
      console.log(error);
    }
    }


    return(
        <div >
          { esUser ? <div className="row">
    <div className="col-sm-12">
    <div className="alert alert-success text-center mt-4" role="alert">
      <b>Password Changed Successfully ! </b> </div> </div> </div> : null}


        <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                <div className="grid-system">                
                    <div className="text-center mt-4  mb-4"><h2>update Password</h2></div>
                 <div className="form-outline from-width mb-4">
            <div className="text-center mb-4"><h6>Enter your new Password</h6></div>
            <input type={passwordType} id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter your password " required onChange={(e)=>{setPassord(e.target.value)}}  />
              <input className="mb-3 mt-3 margin-box"  type="checkbox" onChange={()=>{
            setPassordtype("text");
          }}/>&nbsp; Show Password
          
<div className="d-flex justify-content-center">
              <button className="btn btn-danger btn mt-4" onClick={(e)=>{passwordHandler(e)}}>Update Password</button>
</div>    
          </div>

          </div>

                    {/* </div> */}
            </div>
            <div className="col-sm-3"></div>
        </div>
    </div>
    )
}
export default ResetPassword;