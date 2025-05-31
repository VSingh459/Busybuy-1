
import   './CartPage.css';
import {useValue} from '../../context/productContext.js';
import PCard from '../../components/Product/ProductCard.js';
import { useNavigate } from "react-router-dom";

const CartPage = ()=>{

    const {cartArr, total,placeOrder} = useValue();
    const navigate = useNavigate(); // React Router navigation

    const handlePurchase = () => {
        placeOrder(); // Save order
        navigate("/orders"); // Redirect to OrdersPage
    };
   
    return(
        <div className='cartMain'>
             <div className="minor">
                <p id="tp">Total Price: Rs {total}  </p>
                <button id="pur" onClick={handlePurchase} > Purchase </button>
             </div>

             <div className='cartProducts'>
             {cartArr.map(product=>(
                <PCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name} 
                price={product.price}
                flag={true}
                quantity={product.quantity}/>

             ))}

             </div>

             
        
        </div>
    )


}

export default CartPage;