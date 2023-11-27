import { useState } from "react";
import "./PassChange.css"
import { useNavigate } from 'react-router-dom';

const PassChange= () => {

    const [email, setEmail] = useState();
    const [eUser, setEuser] = useState(false);
    const [esUser, setEsuser] = useState(false);

    const navitoGetstu = useNavigate();

    const passwordHandler = async (e)=>{

        console.log(email);
        e.preventDefault();

      try {
          const request = await fetch("https://sampleauthentication.onrender.com/users/forgotPassword", {
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "email":email
              })
            })
  
            console.log(request);
            if (request.status == 200){
              setEuser('true');
  
              setTimeout(() => {
                  navitoGetstu("/")
              }, 3000);
  
            }
            if (request.status == 400){
              setEsuser('true');
            }
  
            const response = await request.json();
          
  
            console.log(response);
  
      } catch (error) {
        console.log(error);
      }
    }

return(
    <div >
        
        { eUser ? <div className="row">
    <div className="col-sm-12">
    <div className="alert alert-success text-center mt-4" role="alert">
      <b>Verification Link set to your Mail ! </b> </div> </div> </div> :  null}

      { esUser ? <div className="row">
    <div className="col-sm-12">
    <div className="alert alert-danger text-center mt-4" role="alert">
      <b>Email is Invalid or Not an existing User ! </b> </div> </div> </div> : null}


        <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                <div className="grid-system">                
                    <div className="text-center mt-4  mb-4"><h2>Password Reset</h2></div>
                 <div className="form-outline from-width mb-4">
            <div className="text-center mb-4"><h6>Enter your Email</h6></div>
            <input type="name" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter your Email " required onChange={(e)=>{setEmail(e.target.value)}}  />
<div className="d-flex justify-content-center">
              <button className="btn btn-danger btn mt-4" onClick={(e)=>{passwordHandler(e)}}>Reset Password</button>
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

export default PassChange;