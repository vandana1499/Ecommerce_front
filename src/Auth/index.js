import axios from 'axios'
 export const signupHandler = (name, email, password) => {
    const data = {
        name,
        email,
        password
    }
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',

    }
    return axios.post(process.env.REACT_APP_API_URL + "/signup", data, {
        headers: headers
    })
        .then((res) => {

            return res

        })
        .catch((err) => {

              if(err.response.status===400 ||err.response.status===401 ||err.response.status===404   )
              {
                // console.log(err.response)
                return err.response.data
               }
            //    else if(err.request)
            //    {
            //     console.log(err.request)   
            //    }
            //    else
            //    {
            //     console.log(err)
            //    }
            // this.setState({error:err})
        })
}



export const signinHandler = ( email, password) => {
    const data = {
        email,
        password
    }
    const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',

    }
    return axios.post(process.env.REACT_APP_API_URL + "/signin", data, {
        headers: headers
    })
        .then((res) => {

            return res

        })
        .catch((err) => {

              if(err.response.status===400 ||err.response.status===401 ||err.response.status===404   )
              {
                // console.log(err.response)
                return err.response.data
               }
            //    else if(err.request)
            //    {
            //     console.log(err.request)   
            //    }
            //    else
            //    {
            //     console.log(err)
            //    }
            // this.setState({error:err})
        })
}

export const authenticate=(data,next)=>{
    // console.log(typeof window)
    if(typeof window !=="undefined")
    {
        localStorage.setItem("JWT",JSON.stringify(data))
        next()
    }
}

export const signout=(next)=>{
    if(typeof window !=="undefined")
    {
        localStorage.removeItem("JWT")
        next()
        return axios.get(process.env.REACT_APP_API_URL + "/signout")
            .then((res)=>{
            //console.log(res)
            })
            .catch((err)=>{
              //  console.log(err)
            })
    }
}

export const isAuthenticated=()=>{
    if(typeof window =="undefined")
    {
        return false
    }
    if(localStorage.getItem("JWT"))
    {
        return JSON.parse(localStorage.getItem("JWT"))
    }
    else
    {
        return false
    }
}


