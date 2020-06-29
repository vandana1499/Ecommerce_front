import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card, Button, Badge,InputGroup,FormControl } from 'react-bootstrap'
import moment from "moment"
import "./Card.scss"
import { addItem,updateItem,removeItem } from "../../CartApi/CartApi"
import { isAuthenticated } from '../../Auth'


class Cards extends React.Component {
    state = {
        redirect: false,
       
     
    }
    addToCart = () => {
       
        addItem(this.props.product, () => {
            this.setState({ redirect: true })
        })
    }
    showRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
   
    // shouldComponentUpdate(nextProps,nextState)
    // {
    //     if(this.props.product !== nextProps.product)
    //     {
    //         console.log("helloo")
    //       return true
    //     }
    //     return false
    // }

    render() {
        const id = this.props.product._id

        const API = process.env.REACT_APP_API_URL

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



        return (
            <Card
                className="products-card"
                style={{

                }}>

                {/* {this.showRedirect(this.state.redirect)}
                 */}
                <Card.Img
                    variant="top"
                    alt={this.props.product.name}

                    style={{
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        border: "none",
                        maxWidth: "100%",
                        maxHeight: "100%",

                    }}
                    src={`${API}/product/image/${id}`} />
                <Card.Body>
                    <Card.Title>{this.props.product.name}</Card.Title>
                    <Card.Text className="lead">
                        {this.props.product.description.substring(0, 100)}

                    </Card.Text>
                    <Card.Text style={{ fontWeight: "700" }} >
                        ₹ {this.props.product.price}
                    </Card.Text>
                    <Card.Text style={{ fontWeight: "500" }}>
                        Category: {this.props.product.category.name}
                    </Card.Text>

                    <Card.Text style={{ fontWeight: "400" }}>
                        Added on: {moment(this.props.product.createdAt).fromNow()}
                    </Card.Text>
                    {showStock(this.props.product.quantity)}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}>
                        {this.props.showBtn ?
                            <Link
                                to={`/product/${id}`}
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
                            </Link> : null}

                        {!this.props.showCartBtn && isAuthenticated() ?
                            <Button variant="info"
                                onClick={this.addToCart}
                                style={{ background: "#a777e3", border: "none", outline: "none", height: "38px" }}>
                                Add to Cart
                            </Button> : null}


                    </div>
                   
                </Card.Body>
            </Card>

        )
    }
}
export default Cards