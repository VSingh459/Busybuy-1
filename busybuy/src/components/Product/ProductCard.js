import "./Product.css";

import {useValue} from '../../context/productContext.js';
import adder from '../../assets/addCircle.png';
import minus from '../../assets/minusCircle.png';

function PCard({id,image,name,price,flag,quantity}) {

    const {addToCart, increaseQuantity, decreaseQuantity, rem} = useValue();

    return(
         <div className="pp">
            <img src={image} alt="Product" id="prodIcon" />
            <p id="name">  {name}</p>

            <div id='paral'>
            <p id="price"> Rs {price} </p>
            {flag && (
                <div id="imo">
                    <button id="bA" onClick={()=>increaseQuantity(id)} >  <img src={adder} alt="add Circle" id="aa"   /> </button>
                   
                    <p id="qu"> {quantity}</p>
                    <button id='qM' onClick={()=>decreaseQuantity(id)}>  <img src={minus} alt="add Circle" id="mm" /></button>
                   
                    </div>
)}

            </div>
            

            { flag ? ( 
                <button id='red' onClick={()=>rem(id)} > Remove From Cart </button>

            ) : (
                <button id='pipo' onClick={()=>addToCart(id,image,name,price,quantity)}> Add To Cart </button>
            )}
            
         </div>

    );

}

export default PCard;