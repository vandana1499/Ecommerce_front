import React,{PureComponent} from 'react'
import Layout from '../../component/Layout/Layout'
import { read, listRelated } from '../../HomeApi/HomeApi'
 import Cards from '../../component/Card/Card'
import { Row, Col,Button,Card ,Badge} from "react-bootstrap"
import {Link, Redirect} from "react-router-dom"
import moment from "moment"
import {addItem} from "../../CartApi/CartApi"
class Product extends React.Component{
    state = {
        product: {},
        error: [],
        relatedProduct: [],
        redirect:false

    }
    singleProduct = (productId) => {

        read(productId)
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)

                    this.setState({ error: error })
                }
                else {
                    let values = { ...this.state.values }
                    values = data.data
                    this.setState({ product: values })
                    this.relatedProduct(productId)
                }
            })
    }
    relatedProduct = (productId) => {
        listRelated(productId)
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)

                    this.setState({ error: error })
                }
                else {
                   
                    this.setState({ relatedProduct: data.data })
                }
            })
    }
    componentDidMount() {
        const productId = this.props.match.params.productId
        this.singleProduct(productId)
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.match.params.productId !== nextProps.match.params.productId) {
          return true;
        }
        if (this.state !== nextState) {
          return true;
        }
        return false;
    }
    componentDidUpdate(prevProps)
    {
       if(this.props !== prevProps)
       {
        const productId = this.props.match.params.productId
        this.singleProduct(productId)
        
       }
    }
    addToCart=()=>{
       
        addItem(this.state.product,()=>{
           this.setState({redirect:true})
        })
       
    }
    showRedirect=(redirect)=>{
      
            if(this.state.redirect)
            {
               
                return <Redirect to="/cart"/>
            }
    }
    render() {
       
      

        const API = process.env.REACT_APP_API_URL
        const showStock =(quantity)=>{
            return quantity>0 ? <Badge  pill variant="primary" style={{height:"20px",  marginTop: "0.5rem",
            marginBottom: "1rem"}}>
            In Stock
          </Badge>:<Badge pill variant="danger" style={{height:"20px",  marginTop: "0.5rem",
                                        marginBottom: "1rem"}}>
            Out of stock
          </Badge>
          }

        return (
            <Layout title={this.state.product.name}
                description={this.state.product.description}>
                <Row style={{ marginRight: "0px", marginLeft: "0px" }} >
                    {this.showRedirect(this.state.redirect)}
                    <Col lg={7}>
                        {JSON.stringify(this.state.product) !== JSON.stringify({})
                            ?
                            <Card
                               
                                style={{marginBottom:"2rem"}}
                               >
                                <Card.Img
                                    variant="top"
                                    alt={this.state.product.name}
                                    style={{
                                    
                                        maxWidth: "100%",
                                        maxHeight: "100%",

                                    }}
                                    src={`${API}/product/image/${this.state.product._id}`} />
                                <Card.Body>
                                    <Card.Title>{this.state.product.name}</Card.Title>
                                    <Card.Text className="lead">
                                        {this.state.product.description.substring(0, 100)}

                                    </Card.Text>
                                    <Card.Text style={{ fontWeight: "700" }} >
                                        ₹ {this.state.product.price}
                                    </Card.Text>
                                    <Card.Text style={{ fontWeight: "500" }}>
                                        Category: {this.state.product.category.name}
                                    </Card.Text>

                                    <Card.Text style={{ fontWeight: "400" }}>
                                        Added on: {moment(this.state.product.createdAt).fromNow()}
                                    </Card.Text>
                                    {showStock(this.state.product.quantity)}
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between"
                                    }}>
                                        
                                            <Button 
                                            variant="info" 
                                            onClick={this.addToCart}
                                            style={{ background: "#a777e3", border: "none", outline: "none" }}>
                                                Add to Cart
                                             </Button>

                                    </div>

                                </Card.Body>
                            </Card>

                            : null
                        }
                    </Col>
                    <Col lg={5}>
                        <h2 style={{textAlign:"center"}}>Related Products</h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexWrap: "wrap",
                                alignItems: "center"
                            }}>
                            {this.state.relatedProduct.length > 0 ?
                                this.state.relatedProduct.map((product, i) => (

                                    <Cards showBtn product={product} key={i} />
                                ))
                                :
                                null}
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}
export default Product