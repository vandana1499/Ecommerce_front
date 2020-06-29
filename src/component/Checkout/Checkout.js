import React, { useEffect, useState } from "react"
import Layout from "../Layout/Layout"
import { Link ,Redirect} from "react-router-dom"
import { isAuthenticated } from "../../Auth/index"
import { Button ,Modal} from "react-bootstrap"
import {order,getCart,removeAllCart, removeItem} from "../../CartApi/CartApi"


const Checkout = ({ products ,handleEmptyCart,length}) => {
      const _id = isAuthenticated().user._id
        const token = isAuthenticated().token
    const [show, setShow] = useState(false);
    const [pay,setPay]=useState(false)
    const handleClose = () => setShow(false);
  

    const getTotal = () => {
        return products.reduce((currentVal, nextVal) => {
            return currentVal + nextVal.count * nextVal.price
        }, 0)
    }
    const payHandler=()=>{
      setShow(true)
      setPay(true)
      const orderData=getCart()
      let data=[]
    

     orderData.forEach((item)=>{
        let d={}
        d={
            _id:item._id,
            name:item.name,
            category:item.category,
            price:item.price,
            count:item.count
        }
        data.push(d)
     })
     data.push({dateOfOrder:new Date()})
      
      order(_id,token,data)
      .then((data)=>{
          if(data.error)
          {
              //console.log(data.err)
          }
          else
          {
          // console.log(data.data)
         
          }
      })
      removeAllCart()
      handleEmpty()
      


       
    }
    const handleEmpty=()=>{
        handleEmptyCart(true)
    }
    const showModal=(showing)=>{
       return( <Modal show={showing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Your order will soon be at your place</Modal.Body>
        
      </Modal>)
    }
    if(pay)
    {   
      
    }
    return (
        
        <div>
            <h3>Total: {getTotal()}</h3>
           

            {isAuthenticated() ? <div>
            
        {length>0? <Button variant="primary" onClick={payHandler} style={{display:"block",marginBottom:"2rem"}} disabled={pay }>
                        Proceed to payment
                    </Button>:null}
                  

                    </div>
            :
                
                  <Link to="/signin">
                    <Button variant="primary">Sign in to Checkout</Button>
                    </Link>
                  
                
            }
            
             {products.length >0 ?showModal(show):null}
            {/* <p>Choosing a way to pay .... payment gateway not implemented</p> */}


        </div>
    )
}
export default Checkout