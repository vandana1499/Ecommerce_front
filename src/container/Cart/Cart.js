import React, { useState, useEffect } from "react"
import Layout from "../../component/Layout/Layout"

import { Link } from "react-router-dom"
import { Row, Col, InputGroup, FormControl, Button, Badge, Card } from "react-bootstrap"
import moment from "moment"
import { updateItem, removeItem, getCart } from "../../CartApi/CartApi"
import Checkout from "../../component/Checkout/Checkout"


class Cart extends React.Component {


    state = {
        items: [],
        count: 1
    }
    getItems = () => {
        this.setState({ items: getCart() })
    }
    componentDidMount() {
        this.getItems()
    }

   

    handleChange = (productId, event) => {
        this.setState({ count: event.target.value })
        if (event.target.value > 1) {
            updateItem(productId, event.target.value)
        }
        this.setState({items:getCart()})

    }
    handleRemove = (productId) => {
        console.log(productId)
        removeItem(productId)
        this.setState({ items: getCart() })
    }
    handleCart=(flag)=>{
        if(flag)
        this.setState({items:getCart()})
    }
    render() {

        const showCartUpdate = (id, count) => (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                            Quantity (+/-)
                            </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl

                        type="number"
                        aria-describedby="basic-addon1"
                        value={this.state.count}
                        onChange={(event) => this.handleChange(id, event)}
                        min={1}
                    />
                </InputGroup>
            </div>
        )





        const showRemoveBtn = (id) => (
            <Button variant="info"
                onClick={() => this.handleRemove(id)}
                style={{ background: "#a777e3", border: "none", outline: "none", height: "38px" }}>
                Remove Product
            </Button>
        )

        const showStock = (quantity) => {
            return quantity > 0 ? <Badge pill variant="primary" style={{
                height: "20px", marginTop: "0.5rem",
                marginBottom: "1rem"
            }}>
                In Stock
      </Badge> : <Badge pill variant="danger" style={{
                    height: "20px", marginTop: "0.5rem",
                    marginBottom: "1rem"
                }}>
                    Out of stock
      </Badge>
        }



        const showItems = (<div>
            <h2>Your Cart has {this.state.items.length} items</h2>
            {this.state.items.map((product, i) => (
                <Card
                key={i}
                    style={{ marginBottom: "2rem" }}
                >
                    <Card.Img
                        variant="top"
                        alt={product.name}
                        style={{

                            maxWidth: "100%",
                            maxHeight: "100%",

                        }}
                        src={`${process.env.REACT_APP_API_URL}/product/image/${product._id}`} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text className="lead">
                            {product.description.substring(0, 100)}

                        </Card.Text>
                        <Card.Text style={{ fontWeight: "700" }} >
                            ₹ {product.price}
                        </Card.Text>
                        <Card.Text style={{ fontWeight: "500" }}>
                            Category: {product.category.name}
                        </Card.Text>

                        <Card.Text style={{ fontWeight: "400" }}>
                            Added on: {moment(product.createdAt).fromNow()}
                        </Card.Text>
                        {showStock(product.quantity)}
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>

                            <Link
                                to={`/product/${product._id}`}
                            >
                                <Button variant="primary" style={
                                    {
                                        marginRight: "1rem",
                                        marginBottom: "1rem",
                                        background: "#6e8efb",
                                        border: "none",
                                        outline: "none",
                                        boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9"
                                    }}>
                                    View Product
                   </Button>
                            </Link>
                            
                            {showRemoveBtn(product._id)}
                            {showCartUpdate(product._id, product.count)}
                        </div>

                    </Card.Body>
                </Card>

            ))}
        </div>)

        const showMessage = (<div>
            <h2>Your Cart is Empty</h2>
            <br />
            <Link to="/shop">Link to shop</Link>
        </div>
        )

        return (
            <Layout title="Shopping Cart" description="Manage Your cart">
                <Row style={{ marginRight: "0px", marginLeft: "0px" }} >
                    <Col lg={6}>
                        {this.state.items.length > 0 ? showItems : showMessage}

                    </Col>
                    <Col lg={6}>
                       <h2>Your Cart</h2>
                       <hr/>
                       <Checkout products={this.state.items} handleEmptyCart={this.handleCart} length={this.state.items.length}/>
                    </Col>
                </Row>

            </Layout>

        )

    }



}

export default Cart