import React from 'react'

const Home = () => {
    const logout = () =>{
      localStorage.removeItem("loginAuth");
      localStorage.removeItem("user")
        window.location.reload();
    }
    
  return (
    <div>
      Home
      <button onClick={logout} >Logout</button>
    </div>
  )
}

export default Home
