import Title from './Title'
import { Link } from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { useContext } from 'react'
import { CartContext } from './CartContext'

export default function Checkout() {
  let {cartItems} = useContext(CartContext)

  let cartEmpty = cartItems.length <=0 ? true:false
  let grandTotal = cartItems.reduce((total,product)=>{
    return total += product.price*product.quantity
  },0)
  const freeShippingPrice = 99

  return (
    <div>
        <Title mainTitle="Your Cart"/>

        {cartEmpty &&
        <div>
          <div>
            The Shopping Cart is Empty<br/>
            <Link to="/">Go to the Product List</Link>
          </div>
        </div>

        }

        {
        !cartEmpty &&
          <div>
          <div id="cartSection">
              {/*Product list */
                cartItems.map((product)=>(
                  <div key={product.id}>
                    <img src={process.env.PUBLIC_URL+'/img/'+product.image}/>
                    {product.name}
                    {product.description}
                    {product.price}
                    Quantity{product.quantity}
                    <QuantityBtn productInfo={product}/>                    
                  </div>
                ))
              }
          </div>
          <div id="checkOutSection">
              <div>Amount</div>
              <div>${grandTotal}</div>
              {/*Amount + free delivery*/
                grandTotal >= freeShippingPrice?
                <div>Free delivery</div>:
                <div>Free delivery for ${freeShippingPrice}<br/>
                     buy ${freeShippingPrice-grandTotal}product can have free delivery</div>
              }
          </div>
        </div>}

    </div>
  )
}
