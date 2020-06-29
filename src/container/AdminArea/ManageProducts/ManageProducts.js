import React, { useEffect, useState } from 'react'
import Layout from '../../../component/Layout/Layout'
import { Row, Col, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { productList, deleteProduct } from "../../../AdminApi/AdminApi"
import { isAuthenticated } from "../../../Auth/index"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
const ManageProducts = () => {
    const {
        user, token } = isAuthenticated()
    const [products, setProducts] = useState([])

    const loadProducts = () => {
        productList()
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProducts(data.data)
                }
            })
    }
    const deletingProduct = (productId) => {
        deleteProduct(productId, user._id, token)
            .then((data) => {
                if (data.error)
                    console.log(data.error)
                else {
                    loadProducts()
                }
            })
    }
    useEffect(() => {
        loadProducts()
    }, [])
    return (
        <Layout title="Manage Products" description="Update/Delete the products">
            <h2 className="ml-4">Manage Products</h2>
            <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
                <Col>
                    <h4 className="mt-2 ml-2">Total Products :{products.length}</h4>
                    <hr/>
                    <ListGroup className="mb-4">
                        {products.map((p, i) => (
                            <ListGroupItem key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <strong style={{ width: "40%" }}>{i + 1}.{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <Badge variant="primary" style={{cursor:"Pointer"}} >
                                        Update
                                        <FontAwesomeIcon className="ml-2" icon={faEdit} />
                                    </Badge>
                                </Link>
                                <Badge variant="danger" onClick={() => deletingProduct(p._id)} style={{cursor:"Pointer"}} >
                                    Delete
                                        <FontAwesomeIcon className="ml-2" icon={faTrash} />
                                </Badge>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Layout>
    )
}
export default ManageProducts