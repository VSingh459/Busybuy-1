import data from '../../utils/data.js';
import PCard from './ProductCard.js';
import {useContext} from 'react';
import {prodContext} from '../../context/productContext.js';
import "./ProductList.css";
import {useValue} from '../../context/productContext.js';

function PList() {
    const {filteredProducts} = useValue();

    return(
        <div className="pContainer">
            {filteredProducts.map(product=>(
                <PCard 
                  key={product.id}
                  id={product.id}
                  image = {product.image}
                  name = {product.title}
                  price = {product.price}
                  flag={false}
                  quantity={1} />
            ))}

        </div>

    )
}

export default PList;