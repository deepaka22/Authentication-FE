
// import { useEffect, useState } from "react";

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const GetData = () => {

  const navitoGetstu = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("x-auth-token")) navitoGetstu("/")
  }, [])
 

    return (
      <div className="background-color">
        <nav class="navbar bg-body-tertiary bg-light">
  <div class="container-fluid">
    <a class="navbar-brand heading-color">Authentication App</a>
    <form class="d-flex" role="search">
      <button class="btn btn-danger" type="submit" onClick={()=>{
    localStorage.removeItem("x-auth-token")
      }}>Log Out</button>
    </form>

  </div>
</nav>
        <h1 className="text-center mt-4">Welcome to your Dashboard</h1>
        
      </div>
    )
  
};

export default GetData;