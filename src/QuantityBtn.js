import {useContext,useState} from 'react'
import { CartContext } from './CartContext'

export default function QuantityBtn({productInfo}) {

    const{cartItems,setCartItems} = useContext(CartContext)

    //Check the product is it in the shopping Cart
    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id
    })
    /*findIndex()
      if the product can find in the shopping cart will return the index of the product in the cartItems
      if the product can not find in the cart will return -1 */
  
    let[numInCart,setNumInCart]=useState( //check the product is it in the shopping cart if not in the shopping cart findIndex will set productIndexInCart be -1 and need to show the button of "Add to the cart",if the product in the cart will show the quantitiy of that item 
        (productIndexInCart===-1)? 0:cartItems[productIndexInCart].quantity 
    )

    const handleAdd =()=>{
        if(productIndexInCart===-1)//if the product not in the shopping cart,in the cartitems array add a new element(object)
        {
            setCartItems(
                [{
                    id : productInfo.id,
                    name : productInfo.name,
                    image : productInfo.image,
                    price : productInfo.price,
                    description : productInfo.price,
                    quantity:1
                },
                ...cartItems]
            )
        }
        else //if the cart have that product just add the quantity of that product only
        {
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity++ //here can not use cartItems[procuctIndexIncart].quantity++ ,the is the limit of react should use setOOXX() this function to change the data 
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart+1)
    }

    const handleSubtract =()=>{
        if (cartItems[productIndexInCart].quantity===1) { //if the quantity of the product is 1 need to remove in the cart,splice is the function of javascript to delete the element of array
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1)
            setCartItems(newCartArray)
        } else {
            let newCartArray =[...cartItems]
            newCartArray[productIndexInCart].quantity-- //here can not use cartItems[procuctIndexIncart].quantity-- ,the is the limit of react should use setOOXX() this function to change the data 
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart-1)
    }

    return (
    <div>
        {
            (numInCart ===0)?
            <div onClick={handleAdd}>Add to the cart</div>:
            <div>
                <span onClick={handleSubtract}>-</span>
                {numInCart} in cart
                <span onClick={handleAdd}>+</span>
            </div>
        }
    </div>
  )
}
