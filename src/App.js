import { Routes, Route } from "react-router-dom"; // imported from router package..

import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm";
import GetData from "./visibilityDatas/GetData";
import PassChange from "./Forms/PassChange";
import ResetPassword from "./Forms/ResetPassword";

function App() {
  return (
    <div className="App">
      {/* messgae --  navbar components */}
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/NewUser" element={<SignupForm />}></Route>
        <Route path="/GetDetails" element={<GetData />}></Route>
        <Route path="/ChangePassword" element={<PassChange />}></Route>
        <Route
          path="/users/passwordReset/:id/:token"
          element={<ResetPassword />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
