import{BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import {CartContext} from './CartContext'; ///import the cartcontext for share the quantity in the web 
import { useState } from 'react';


function App() {

  const [cartItems,setCartItems] = useState([]) /// set the const of the cartitems and the cart default is null

  return (
    <BrowserRouter>
      <CartContext.Provider value={{cartItems,setCartItems}}> {/*The range of share the data in cartcontext  Start,use the value to link the conts done before*/}

      <Link to="/">Home Page</Link>
      <Link to="/checkout">Checkout</Link>

      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/checkout" element={<Checkout/>}/>

        <Route path="/product" element={<ProductDetail/>}>
            <Route path=":id" element={<ProductDetail/>}/>
        </Route>
        
        <Route path="*" element={<p>404 Not Found</p>}/>  {/*The path="*" mean the path out of the path which is setted will show this page */}

      </Routes>
      </CartContext.Provider>{/*The range of share the data in cartcontext  End*/}
    </BrowserRouter>
  );
}

export default App;
