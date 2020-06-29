import React from 'react'
import Layout from '../Layout/Layout'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { isAuthenticated } from '../../Auth';
import "./Admindashboard.scss"
import { Link } from "react-router-dom"
class AdminDashboard extends React.Component {
    render() {
        const {
            user,token } = isAuthenticated()
        const { name, email, role } = user

        const adminLinks = (

            <div className="front">
                <div className="maincard-front-link " >
                    <div className="blue-background">

                        <h5>Admin Links</h5>

                    </div>
                    <div className="user-info">
                        <div className="qoute">
                            <blockquote>
                                <Link
                                    className="nav-link"
                                    to="/create/category">
                                        Create Category
                                    </Link>
                            </blockquote>
                            <blockquote>
                                <Link
                                    className="nav-link"
                                    to="/create/product">
                                        Create Product
                                    </Link>
                            </blockquote>
                            <blockquote>
                                <Link
                                    className="nav-link"
                                    to="/admin/products">
                                        Manage Products
                                    </Link>
                            </blockquote>
                           
                        </div>


                    </div>
                </div>

            </div>
        )
        const adminProfile=(
            <div className="front">
            <div className="maincard-front">
                <div className="blue-background">

                    <h5>Admin information</h5>

                </div>
                <div className="user-info">

                    <div className="full-name">
                        <h3>{name}</h3>
                    </div>
                    <div className="qoute">
                        <blockquote>{email}</blockquote>
                        <blockquote> {role === 1 ? "Admin" : "Registred User"}</blockquote>
                    </div>


                </div>
            </div>

        </div>
        )
       

        return (
            <Layout title="Dashboard" description="Dashboard">
                <div className="userProfile">
                <div className="Userinfo" >
                        {adminLinks}
                    </div>

                    <div className="Userinfo" >
                        {adminProfile}
                       

                    </div>
                  
                </div>


            </Layout>
        )
    }
}
export default AdminDashboard