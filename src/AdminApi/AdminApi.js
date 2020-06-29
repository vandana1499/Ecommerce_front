import axios from 'axios'

export const createCategory = (name, _id, token) => {


    const data = {
        name,

    }
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
    return axios.post(process.env.REACT_APP_API_URL + "/category/create/" + _id, data, {
        headers: headers
    })
        .then((res) => {

            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

                //console.log(err.response.data)
                return err.response.data
            }

        })
}



export const createProduct = (product, _id, token) => {


    
    const headers = {
        // Accept: "application/json",
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
    }
    return axios.post(process.env.REACT_APP_API_URL + "/product/create/" + _id, product, {
        headers: headers
    })
        .then((res) => {
            console.log(res)
            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

                //console.log(err.response.data)
                return err.response.data
            }

        })
}



export const productList= () => {
    return axios.get(process.env.REACT_APP_API_URL + "/products?limit=100")
        .then((res) => {

            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

                //console.log(err.response.data)
                return err
            }

        })

}

export const getSingleProduct= (productId) => {
  
    return axios.get(process.env.REACT_APP_API_URL + "/product/"+productId)
        .then((res) => {

            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

                //console.log(err.response.data)
                return err
            }

        })

}

export const updateProduct= ( product,userId, token,productId) => {

  
        
        const headers = {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        return axios.patch(process.env.REACT_APP_API_URL + "/product/"+productId+"/" + userId,product, {
            headers: headers
        })
            .then((res) => {
              
                return res
    
            })
            .catch((err) => {
               
                if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) 
                {
    
                    //console.log(err.response.data)
                    return err.response.data
                }
    
            })
    }


    export const deleteProduct= (productId,userId, token) => {

     
        
            const headers = {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
            return axios.delete(process.env.REACT_APP_API_URL + "/product/"+productId+"/" + userId, {
                headers: headers
            })
                .then((res) => {
                    console.log(res)
                    return res
        
                })
                .catch((err) => {
                    console.log(err)
                    if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) 
                    {
        
                        //console.log(err.response.data)
                        return err.response.data
                    }
        
                })
        }