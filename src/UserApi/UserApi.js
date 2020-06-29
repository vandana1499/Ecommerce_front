import axios from 'axios'

export const update = (userId, token, user) => {

console.log(user)

    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
    return axios.patch(process.env.REACT_APP_API_URL + "/user/" + userId, user, {
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


export const read = (userId, token) => {
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
    return axios.get(process.env.REACT_APP_API_URL + "/user/" + userId, { headers: headers })
        .then((res) => {

            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {


                return err
            }

        })

}
export const getPurchaseHistory= (userId, token) => {
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
    return axios.get(process.env.REACT_APP_API_URL + "/orders/" + userId, { headers: headers })
        .then((res) => {

            return res

        })
        .catch((err) => {

            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {


                return err
            }

        })

}
export const updateUser =(user,next)=>{

    
    if(typeof window !=="undefined")
    {
        if(localStorage.getItem("JWT"))
        {
            let auth=JSON.parse(localStorage.getItem("JWT"))
            auth.user=user
            localStorage.setItem("JWT",JSON.stringify(auth))
            next()
        }
      
    }

}