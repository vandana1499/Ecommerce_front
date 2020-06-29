import React from 'react'
import Layout from '../../../component/Layout/Layout'
import { Form, Button, Alert, InputGroup } from 'react-bootstrap'
import "../User.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";

import {Link} from 'react-router-dom'
import {signupHandler} from '../../../Auth/index'

class Signup extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: [],
        success: false
    }
    nameChangeHandler = (event) => {
        this.setState({ name: event.target.value ,error:[]})
    }
    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value ,error:[]})
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value ,error:[]})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        signupHandler(this.state.name, this.state.email, this.state.password)
            .then((data) => {
                if (data.error ) {
                    const error = [...this.state.error]
                    error.push(data.error)
                    this.setState({ error: error, success: false })
                    // console.log(error)
                }
                else if(!data.error && (data.status===400 || data.status===401||data.status===404))
                {
                    // console.log(data)
                    const error=[...this.state.error]
                    error.push(data)
                    this.setState({error:error,success:false})
                }
                else if(!data.error)
                {
                    //  console.log(data)
                    this.setState({ name: "", email: "", password: "", error: "", success: true })
                }

            })


    }


    render() {

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
        const showSuccess=(
            this.state.success?<Alert  variant="success">
           
            <p>
              Account Created Successfully!! Please <Link to="/signin">Signin</Link>
            </p>
          </Alert>:null
        )
        const signupForm = (
            <div className="form-div">
                
                <Form onSubmit={this.handleSubmit}>
                    <h5>Create Account</h5>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={this.state.name}
                                onChange={this.nameChangeHandler}
                            />
                        </InputGroup>
                    </Form.Group>
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
                        Signup
        </Button>

                </Form>



            </div>
        )
        return (
            <Layout title="Sign up" description="Books E-commerce App">
                {showError}
                {/* {showError} */}
                {showSuccess}
                {signupForm}
            </Layout>
        )
    }
}
export default Signup