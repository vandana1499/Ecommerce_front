import React from 'react'
import Layout from '../../../component/Layout/Layout'
import { isAuthenticated } from '../../../Auth/index';
import { getSingleProduct, updateProduct } from "../../../AdminApi/AdminApi"
import { getCategories } from "../../../HomeApi/HomeApi"
import { Link } from "react-router-dom"
import { Form, Button, Alert, InputGroup, FormControl, Dropdown, DropdownButton, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faArrowCircleRight, faCommentAlt, faLayerGroup } from "@fortawesome/free-solid-svg-icons";


class UpdateProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            description: "",
            price: "",
            categories: [],
            category: "",
            quantity: "",
            image: "",
            error: [],
            formData: "",
            success: false,
            loading: false,
            redirect: false,
            createdProduct: "",
            title: "Choose Categories"
        }

    }
    loadCategory = () => {

        getCategories()
            .then((data) => {


                if (data.error) {

                    this.setState({ error: data.error })

                }
                else {
                    let cat = [...this.state.categories]
                    cat = data.data
                    this.setState({ categories: cat })
                    if (this.state.categories.result ) {
                        this.state.categories.result.forEach((item) => {
                            if (item._id === this.state.category) {
                                this.setState({ title: item.name })
                            }
                        })
                    }
                }
            })
           
    }
    loadFunction = (productId) => {
        getSingleProduct(productId)
            .then((data) => {

                if (typeof data === "string") {

                    this.setState({ error: data })
                }
                else {
                    this.setState({
                        name: data.data.name,
                        description: data.data.description,
                        price: data.data.price,
                        category: data.data.category._id,
                        quantity: data.data.quantity,
                        formData: new FormData()

                    }
                    )
                    
                    this.loadCategory()

                }
            })

    }
    componentDidMount() {


        this.loadFunction(this.props.match.params.productId)


    }



    nameChangeHandler = (event) => {
        this.setState({ name: event.target.value, error: [], success: false })
    }
    imageHandler = (event) => {


        this.setState({ image: event.target.files[0], error: [], success: false })
    }
    productHandler = (event) => {
        this.setState({ description: event.target.value, error: [], success: false })
    }
    priceChangeHandler = (event) => {
        this.setState({ price: event.target.value, error: [], success: false })
    }
    quantityChangeHandler = (event) => {
        this.setState({ quantity: event.target.value, error: [], success: false })
    }
    categoryHandler = (event) => {
        // console.log(event)
        if (this.state.categories.result && event) {
            this.state.categories.result.forEach((item) => {
                if (item._id === event) {
                    this.setState({ title: item.name })
                }
            })
        }
        this.setState({ category: event, error: [], success: false })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ success: false, error: "", loading: true })
        const _id = isAuthenticated().user._id
        const token = isAuthenticated().token
        const form_Data = this.state.formData
        form_Data.set("name", this.state.name)
        form_Data.set("description", this.state.description)
        form_Data.set("price", this.state.price)
        form_Data.set("quantity", this.state.quantity)
        form_Data.set("category", this.state.category)
        form_Data.set("image", this.state.image)
        // console.log(form_Data)
        this.setState({ formData: form_Data })
        updateProduct(this.state.formData, _id, token, this.props.match.params.productId)
            .then((data) => {

                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)
                    // console.log(error)
                    this.setState({ error: error, success: false })
                    // console.log(error)
                }
                else if (!data.error) {
                    //  console.log(data.data.result.name)
                    this.setState({
                        name: "",
                        description: "",
                        price: 0,
                        quantity: 0,
                        image: "",
                        category: "",
                        loading: false,
                        success: true,
                        title: "Choose Product",
                        createdProduct: data.data.result.name

                    })
                    // console.log(this.state.createdProduct)
                }

            })
    }


    render() {

        const productForm = (
            <div className="form-div" >

                <Form onSubmit={this.handleSubmit} >
                    <h5>Update Product</h5>
                    <Form.Group>
                        {/* <Form.File 
                        id="exampleFormControlFile1" 
                        label="Image" name="image" accept="image/*"/> */}
                        <Form.File
                            id="custom-file"
                            label="Image of Product"
                            custom
                            name="image"
                            accept="image/*"
                            onChange={this.imageHandler}

                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product</Form.Label>
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

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product Description</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faCommentAlt} style={{ color: "#6e8efb" }} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                                as="textarea"
                                placeholder="Product description"
                                required
                                onChange={this.productHandler}
                                value={this.state.description}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product Price</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" style={{ color: "#6e8efb", fontWeight: "bold" }}>
                                    ₹
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                                type="number"
                                placeholder="Product Price"
                                value={this.state.price}
                                onChange={this.priceChangeHandler}
                                required
                                min={0}

                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product Quantity</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" style={{ color: "#6e8efb" }}>
                                    <FontAwesomeIcon icon={faLayerGroup} style={{ color: "#6e8efb" }} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                                type="number"
                                placeholder="Product Quantity"
                                value={this.state.quantity}
                                onChange={this.quantityChangeHandler}
                                required
                                min={0}

                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Choose Category</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" style={{ color: "#6e8efb" }}>
                                    <FontAwesomeIcon icon={faBook} style={{ color: "#6e8efb" }} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Choose Category"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={this.state.title}
                                placeholder="Choose Category"
                                disabled

                            />

                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title=""
                                drop="left"
                                id="input-group-dropdown-2"
                                onSelect={this.categoryHandler}>
                                {
                                    this.state.categories.result
                                        ?
                                        (this.state.categories.result.map(item => (
                                            <Dropdown.Item
                                                key={item._id}
                                                eventKey={item._id}

                                            >{item.name}</Dropdown.Item>)
                                        )
                                        )
                                        : null
                                }




                            </DropdownButton>

                        </InputGroup>
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Update Product
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
                                {e}
                            </p>
                        </Alert>)
                    }

                }) : null

        )
        const showSuccess = (
            this.state.success ? <Alert variant="success">

                <p>
                    {this.state.createdProduct} is Updated!
            </p>
            </Alert> : null
        )
       

        const showLoading = (
            this.state.loading ? <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            Loading...
          </Button>
                : null
        )

        const goBack = (
            <Alert style={{
                textAlign: "center",
                width: "fit-content",
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                color: "#fff",
                borderRadius: "10px",
                boxShadow: "14px 10px 10px -4px rgba(209,207,214,1)"
            }}>

                <Link
                    to="/admin/dashboard"
                    style={
                        {
                            color: "#fff",
                            textDecoration: "none",

                        }}>
                    Back to the dashboard <FontAwesomeIcon icon={faArrowCircleRight} style={{ color: "#fff" }} />
                </Link>

            </Alert>
        )


        return (
            <Layout title="Add a new Product" description="Add a product to be show to user">
                {showLoading}
                {showError}
                {showSuccess}
                {goBack}
                {productForm}
                
            </Layout>


        )
    }
}
export default UpdateProduct