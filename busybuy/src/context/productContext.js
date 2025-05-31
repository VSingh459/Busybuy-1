import {createContext} from "react";
import{useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import data from '../utils/data.js';


const prodContext = createContext([]);

function useValue() {
    const value = useContext(prodContext);
    return value;
}

function CustomProdContext({children}) {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(100000);  // Default max price
    const [cartArr, setCartArr] = useState([]);
    const [flag,setFlag] = useState(false);
    const [total, setTotal] = useState();
    const [orders, setOrders] = useState([]);
    const [log, setLog] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState();
    const [token, setToken] = useState();

    function handleSignup() {
        console.log('name');
        console.log('email');
        if (!name || !email || !password) {
            alert("Please fill in all fields!Thanku");
            return;
        }
    
        fetch("http://localhost:3700/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.text())  // Assuming server returns token as plain text
        .then(token => {
            console.log("Received Token:", token);
            setToken(token);  // Store the token
            fuller();
        })
        .catch(error => {
            console.error("Signup Failed:", error);
            alert("Signup failed! Please try again.");
        });
    }
    

    function handleLogout() {
        if ( !token) {
            console.log("User not logged in.");
            return;
        }
        console.log('Hello Hello');
        console.log("Token before logout request:", token);

        console.log("Logging out... Sending Cart and Orders Data");
        console.log("Cart:", cartArr);
        console.log("Orders:", orders);
    
        fetch("http://localhost:3700/users/logout", {  // ✅ Adjust API URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token  
            },
            body: JSON.stringify({
                cart: cartArr,  // ✅ Send cart state
                orders: orders  // ✅ Send orders
            }),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Logout Successful:", data);
            setToken(null);  // ✅ Clear token
            setCartArr([]);  // ✅ Clear cart
            setOrders([]);   // ✅ Clear orders
            fuller();        // ✅ Toggle login state
        })
        .catch(function(error) {
            console.error("Logout Failed:", error);
            alert("An error occurred while logging out.");
        });
    }
    
  

    function handleLogin(e) {
        e.preventDefault();
    
        if (!email || !password) {
            alert("Please enter both email and password!");
            return;
        }
    
        fetch("http://localhost:3700/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(function(response) {
            return response.text();  // ✅ Use .text() because the server sends plain text
        })
        .then(function(token) {
            console.log("Received Token:", token);
            setToken(token);  // ✅ Store token in useState
            fuller();  // ✅ Update login state
           
        })
        .catch(function(error) {
            console.error("Login Failed:", error);
            alert("An error occurred. Please try again.");
        });
    }
    

    function fuller() {
        setLog(prevLog => !prevLog);
    }
    

    function placeOrder() {
        if (cartArr.length === 0) return; // Prevent empty orders
    
        const newOrder = {
            date: new Date().toISOString().split("T")[0], // Current date
            products: cartArr.map(({ id, name, quantity, price }) => ({
                id, title: name, quantity, price
            })),
            totalPrice: total
        };
    
        setOrders(prevOrders => [...prevOrders, newOrder]); // ✅ Update orders properly
        setCartArr([]); // ✅ Clear cart after placing order
    }
    

    function rem(id) {
        setCartArr(prevCart => prevCart.filter(item => item.id !== id));
    }
    

    useEffect(() => {
        let newTotal = 0;
        
        for (let product of cartArr) {
            newTotal += product.quantity * product.price;
        }
        
        setTotal(newTotal);
    }, [cartArr]);
    

    function increaseQuantity(id) {
        setCartArr(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }
    
    function decreaseQuantity(id) {
        setCartArr(prevCart =>
            prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0) // Remove if quantity becomes 0
        );
    }
    
    

    function setter(val){
        setFlag(val);
    }

   
    function addToCart(id, image, name, price) {
        setCartArr(prevCart => {
            // Check if the product already exists in cart
            const existingProduct = prevCart.find(item => item.id === id);
    
            if (existingProduct) {
                // If product exists, increase quantity
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If product does not exist, add it with quantity 1
                return [...prevCart, { id, image, name, price, quantity: 1 }];
            }
        });
    }
    

    
    const filteredProducts = data.filter(product => 
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price <= priceRange
    );

    return(
        <prodContext.Provider value={{setSelectedCategories, setPriceRange, priceRange,
                       addToCart , filteredProducts, setter, flag,cartArr, increaseQuantity,
                       decreaseQuantity, total, rem, placeOrder,orders,log, fuller,
                       setPassword, setEmail, handleLogin,token,handleLogout,setName,handleSignup}}>
            {children}
        </prodContext.Provider>
    )
}

export {prodContext};
export default CustomProdContext;
export {useValue};