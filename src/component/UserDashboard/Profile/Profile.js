import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { Form, InputGroup, Button ,Alert,Card} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom"
import { read, update, updateUser } from "../../../UserApi/UserApi"
import { isAuthenticated } from '../../../Auth';


const Profile = (props) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    const { name, email, password, error, success } = values;
    const { token } = isAuthenticated()

    const getUser = (userId) => {

        read(userId, token)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: true })

                    // console.log(error)
                }

                else if (!data.error) {

                    setValues({ ...values, name: data.data.name, email: data.data.email, password: data.data.password })
                }

            })

    }
    useEffect(() => {
        getUser(props.match.params.userId)
    }, [])

    const handleChangeName = (event) => {
        setValues({ ...values, name: event.target.value })
    }
    const handleChangeEmail = (event) => {
        setValues({ ...values, email: event.target.value })
    }
    const handleChangePassword = (event) => {
        setValues({ ...values, password: event.target.value })
    }


    const handleSubmit = event => {
        event.preventDefault()
        update(props.match.params.userId, token, { name, email, password })
            .then((data) => {
                if (typeof data === "string") {
                    setValues({ ...values, error: data })

                }

                else {


                    updateUser(data.data, () => {
                        setValues({ ...values, name: data.data.name, email: data.data.email, success: true })

                    })
                }
                console.log(typeof data)
                console.log(data)

            })
    }
   
    const showErrorMessage = (error) => {

        if (error.length > 0)
             return (<Alert variant="danger" >
                <p>
                    {error}
                </p>
            </Alert>)
    }
    const showSuccessMessage=(success)=>{
        if(success)
        return (<Alert variant="success" >
        <p>
            Successfully updated
        </p>
        <Link to="/">Link to home page</Link>
         </Alert>)
    }


    const profileUpdateForm = (name, email, password) => (

        <div className="form-div">

            <Form onSubmit={handleSubmit}>
                <h5>Upadate Profile</h5>
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
                            value={name}
                            onChange={handleChangeName}
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
                            value={email}
                            onChange={handleChangeEmail}

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
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </InputGroup>

                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        </div>
    )

   

    return (<Layout title="Profile Page" description="Update your Profile">
        <h2 style={{ marginLeft: "2rem" }}>Update Profile</h2>
        {showSuccessMessage(success)}
        {showErrorMessage(error)}
        {profileUpdateForm(name, email, password)}
     
    </Layout>)
}
export default Profile