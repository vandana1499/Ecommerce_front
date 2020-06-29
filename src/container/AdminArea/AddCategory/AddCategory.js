import React from 'react'
import Layout from '../../../component/Layout/Layout'
import { isAuthenticated } from '../../../Auth/index';
import { createCategory } from "../../../AdminApi/AdminApi"
import { Link } from "react-router-dom"
import { Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
class AddCategory extends React.Component {
    state = {
        name: "",
        error: [],
        success: false
    }
    nameChangeHandler = (event) => {
        this.setState({ name: event.target.value, error: [], success: false })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ success: false, error: "" })
        const _id = isAuthenticated().user._id
        const token = isAuthenticated().token
        createCategory(this.state.name, _id, token)
            .then((data) => {

                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)
                    // console.log(error)
                    this.setState({ error: error, success: false })
                    // console.log(error)
                }
                else if (!data.error) {
                    //  console.log(data)
                    this.setState({ name: "", success: true })
                }

            })
    }
    render() {


        const categoryForm = (
            <div className="form-div">

                <Form onSubmit={this.handleSubmit}>
                    <h5>Add Category</h5>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faBook} style={{ color: "#6e8efb" }} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="text"
                                placeholder="Name of the Category"
                                value={this.state.name}
                                onChange={this.nameChangeHandler}
                                required

                            />
                        </InputGroup>


                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Create Category
                    </Button>
                </Form>
            </div>
        )
        const showError = (

            this.state.error.length > 0 ?
                this.state.error.map((e, i) => {

                    if (typeof e == "object") {
                        return (e.map((item, j) => (
                            <Alert variant="danger" key={j}>
                                <p>
                                    {item}
                                </p>
                            </Alert>

                        )))

                    }
                    else {

                        return (<Alert variant="danger" key={i}>
                            <p>
                                Category {e}
                            </p>
                        </Alert>)
                    }

                }) : null

        )
        const showSuccess = (
            this.state.success ? <Alert variant="success">

                <p>
                    Category Added!
            </p>
            </Alert> : null
        )

        const goBack = (
            <Alert  style={{
                textAlign:"center",
                width:"fit-content",
                background:"linear-gradient(135deg, #6e8efb, #a777e3)",
                color:"#fff",
                borderRadius:"10px",
                boxShadow: "14px 10px 10px -4px rgba(209,207,214,1)"}}>

                <Link
                    to="/admin/dashboard"
                    style={
                        { 
                            color:"#fff",
                            textDecoration:"none",
                            
                         }}>
                    Back to the dashboard <FontAwesomeIcon icon={faArrowCircleRight} style={{ color:"#fff"}}  />
                </Link>

            </Alert>
        )

        return (
            <Layout title="Add a new Category" description="Add a category to be show to user">
                {showError}
                {showSuccess}
                {categoryForm}
                {goBack}
            </Layout>


        )
    }
}
export default AddCategory