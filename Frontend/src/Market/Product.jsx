import { Link } from "react-router-dom"
import '../Profile/Login.css'
export default function Product({product}){
    return(
        <div className="product">
              <img className="product-image"  src={product.images[0].image} alt="product"/>
              
              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <div className="price-div">
                  
                <p className="price">Rs.{product.price}</p>
                <p className="discount">Rs.{product.price}</p>
                </div>
               <Link to={`/product/${product._id}`}><p className="add">View product</p></Link>
              </div>
            </div>
    )
}
