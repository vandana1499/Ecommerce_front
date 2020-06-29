import React from 'react'
import Layout from '../../../component/Layout/Layout'
import { Form, Button, Alert, InputGroup ,Spinner} from 'react-bootstrap'

 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";
import "../User.scss"
import {Link, Redirect} from 'react-router-dom'
import {signinHandler,authenticate} from '../../../Auth/index'
import { isAuthenticated } from '../../../Auth';

class Signin extends React.Component {
    state = {
     
        email: "",
        password: "",
        error: [],
        loading: false,
        redirect:false
    }

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value ,error:[]})
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value ,error:[]})
    }
    handleSubmit = (event) => {
        event.preventDefault()
    this.setState({loading:true})
        signinHandler( this.state.email, this.state.password)
            .then((data) => {
                if (data.error ) {
                    const error = [...this.state.error]
                    error.push(data.error)
                    this.setState({ error: error, loading: false })
                    // console.log(error)
                }
                else if(!data.error && (data.status===400 || data.status===401||data.status===404))
                {
                    // console.log(data)
                    const error=[...this.state.error]
                    error.push(data)
                    this.setState({error:error,loading:false})
                }
                else if(!data.error)
                {
                   // console.log(data.data)
                    authenticate(data.data,()=>{
                       
                        this.setState({ redirect:true })
                    })
                    
                }

            })


    }


    render() {
        const {user } = isAuthenticated()
          //const name = user.name
        const profile=user
      let role =0
        for (let obj in profile)
        {
            if(obj==="role")
            {
              role=profile[obj]
            }
        }
       
      

        
        const showError = (

            this.state.error.length > 0 ?
                this.state.error.map((e, i) => {
                  
                   if(typeof e == "object")
                   {
                    return( e.map((item,j)=>(
                        <Alert variant="danger"  key={j}>
                            <p>
                                {item}
                            </p>
                        </Alert>

                     )))
                   
                   }
                   else
                   {
                        
                        return(<Alert variant="danger"  key={i}>
                            <p>
                            {e}
                            </p>
                        </Alert>)
                   }
       
                }) : null

        )
        const showLoading=(
            this.state.loading?<Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        :null
        )
      
       
       const redirectUser=()=>{
            if(this.state.redirect)
            {
                if(profile && role===1)
                 return <Redirect to="/admin/dashboard"/>
                else 
                 return <Redirect to="/user/dashboard"/>
            }
           if(isAuthenticated())
           {
            return  <Redirect to="/"/>
           }


        }

        const signinForm = (
            <div className="form-div">
                
                <Form onSubmit={this.handleSubmit}>
                    <h5>Sign in</h5>
                  
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faMailBulk} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.emailChangeHandler}

                            />
                        </InputGroup>


                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.passwordChangeHandler}
                            />
                        </InputGroup>

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Signin
        </Button>

                </Form>



            </div>
        )
        return (
            <Layout title="Sign in" description="Books E-commerce App">
                {showError}
                {/* {showError} */}
                {showLoading}
                {signinForm}
                {redirectUser()}
            </Layout>
        )
    }
}
export default Signin