import  "./NavBar.css";
import {NavLink,Outlet} from "react-router-dom";
import HomeIcon from  "../../assets/home.png";
import Basket from "../../assets/basket.png";
import Cart from "../../assets/cart.png";
import LogOut from "../../assets/Log Out.png";
import Login from "../../assets/Log in.png";
import {useValue} from '../../context/productContext.js';
import { useNavigate } from "react-router-dom";

const NavBar = ()=>{

    const {setter,log, fuller, handleLogout} = useValue();
    const navigate = useNavigate();

    function handleLogoutAndNavigate() {
      handleLogout(); // ✅ First, log the user out
      setTimeout(() => navigate("/"), 500); // ✅ Navigate to home after logout
  }


    return(
        <>
        <div className="naviB">
            <p> Busy Buy</p>
            <div id='cluster'>
                <NavLink to="/" id="ho"> <img src={HomeIcon} alt="Home" className="icon" 
                onClick={()=>setter(false)}  /> Home</NavLink>
                {/* <NavLink style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
                 to="/orders" id="ho"> <img src={Basket} alt="Basket" className="icon"  /> My Orders</NavLink>
                <NavLink style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
                      to="/cart" id="ho"> <img src={Cart} alt="Cart" className="icon" 
                      onClick={()=>setter(true)} /> Cart</NavLink> */}
 {!log && ( <>   <NavLink 
      style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
      to="/orders" 
      id="ho" > 
      <img src={Basket} alt="Basket" className="icon" /> My Orders
    </NavLink>

    <NavLink 
      style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
      to="/cart" 
      id="ho" > 
      <img src={Cart} alt="Cart" className="icon" onClick={() => setter(true)} /> Cart
    </NavLink>
  </>
)}

                      {log ? (
                         <NavLink to="/login" id="ho"  >
                         <img src={Login} alt="Cart" className="icon" /> Signin
                       </NavLink>

                      ) : (
                        // <NavLink to="/" id="ho"> <img src={LogOut} alt="Cart" className="icon" onClick={handleLogout}  /> Log Out</NavLink>
                        <button
                        id="ho"
                        onClick={handleLogoutAndNavigate} >
                        <img src={LogOut} alt="Log Out" className="icon" /> Log Out
                    </button>

                      )}
                      
               

            </div>

        </div>
        <Outlet />
        </>
        
    )
}

export default NavBar;