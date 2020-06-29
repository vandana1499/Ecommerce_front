import axios from 'axios'
import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return axios.get(process.env.REACT_APP_API_URL + "/products/?sortBy="+sortBy+"&order=desc&limit=6")
        .then((res) => {

            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

              
                return err
            }

        })

}
export const getCategories = () => {
    return axios.get(process.env.REACT_APP_API_URL + "/categories")
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

export const listProductBySearch = (skip,limit,filters={}) => {


    const data = {
        limit,
        skip,
        filters

    }
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
       
    }
    return axios.post(process.env.REACT_APP_API_URL + "/products/by/search" ,data, {
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


export const list = (params) => {
    const query=queryString.stringify(params)
   
    return axios.get(process.env.REACT_APP_API_URL + "/products/search?"+query)
        .then((res) => {
           
            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

              
                return err
            }

        })

}

export const read =(productId)=>{

    return axios.get(process.env.REACT_APP_API_URL + "/product/"+productId)
    .then((res) => {
       
        return res

    })
    .catch((err) => {

        if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

          
            return err
        }

    })
    
}


export const listRelated =(productId)=>{

    return axios.get(process.env.REACT_APP_API_URL + "/products/realtedProduct/"+productId)
    .then((res) => {
       
        return res

    })
    .catch((err) => {

        if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {

          
            return err
        }

    })
    
}