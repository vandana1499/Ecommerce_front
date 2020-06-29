import axios from "axios"

export const addItem=(item,next)=>{

    let cart=[]
    if(typeof window!=="undefined")
    {
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count:1
        })
        cart=Array.from (new Set(cart.map(p=>p._id))).map(id=>{
            return cart.find(p=>p._id===id)
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next()
    }
}

export const itemTotal =()=>{
    if(typeof window !== "undefined")
    {
        if(localStorage.getItem("cart"))
        {
            return JSON.parse(localStorage.getItem("cart")).length
        }
    }
    return 0;

}
export const getCart =()=>{
    if(typeof window !== "undefined")
    {
        if(localStorage.getItem("cart"))
        {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
    return [];

}

export const updateItem=(id,count)=>{
    let cart={}
    
    if(typeof window !== "undefined")
    {
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"))

        }
     

            cart.map((item,i)=>{
                if(item._id===id)
                {
                    cart[i].count=count
                }
            })

            localStorage.setItem("cart",JSON.stringify(cart))
    }

}


export const removeItem=(id)=>{
    let cart={}
    
    if(typeof window !== "undefined")
    {
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"))

        }
     

            cart.map((item,i)=>{
                if(item._id===id)
                {
                    cart.splice(i,1)
                }
            })

            localStorage.setItem("cart",JSON.stringify(cart))
    }

}

export const removeAllCart=()=>{

    if(typeof window !=="undefined")
    {
        localStorage.removeItem("cart")
       
       
    }
}

export const order=(userId,token,orderData)=>{


 
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
       
    }
    return axios.post(process.env.REACT_APP_API_URL + "/order/"+userId,orderData, {
        headers: headers
    })
        .then((res) => {

            return res

        })
        .catch((err) => {

           
                //console.log(err.response.data)
                return err
            

        })

}