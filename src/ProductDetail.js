import {useParams,Link} from "react-router-dom"
import QuantityBtn from "./QuantityBtn"
import Title from './Title'
import { useState,useEffect } from "react"

export default function ProductDetail() {

    let params = useParams()
    let [productDetail,setProductDetail] = useState(null) 

    useEffect(()=>{
      fetch ('https://hoyinleung.github.io/demoapi/react-basic-product.json')
          .then(Response=>Response.json())
          .then(data=>{
            let productInfo = data.find((eLement)=>{ 
                return eLement.id === parseInt(params.id) ///params.id = the i of the url http://www..../i that will use for find the product id, use parseInt for change to int to check with json
            })
            setProductDetail(productInfo)
          })   
    },[])

  return (
    <div>
        {
          productDetail && // for set the web after load the json from the url to show the information, if not set the useState will be null will show nothing the conslo will show error 
          <div>
            <Title mainTitle={productDetail.name+'Product Information'}/>
            <img src={process.env.PUBLIC_URL+'/img/'+productDetail.image}alt={productDetail.name}width="400"/>
            <p>Name : {productDetail.name}</p>
            <p>Price :{productDetail.price}</p>
            <p>Description : {productDetail.description}</p>
            <QuantityBtn productInfo={productDetail}/>
          </div>
        }
    </div>
  )
}
