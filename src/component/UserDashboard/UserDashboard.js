import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { isAuthenticated } from '../../Auth';
import "./UserDashboard.scss"
import { Link } from "react-router-dom"
import { getPurchaseHistory } from "../../UserApi/UserApi"
import moment from "moment"
const UserDashboard = () => {


    const { user, token } = isAuthenticated()
    const { _id, name, email, role } = user
    const [history, setHistory] = useState([])

    const getPurchase = (id, token) => {
        getPurchaseHistory(id, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setHistory(data.data)
                }
            })
    }
    useEffect(() => {
        getPurchase(_id, token)

    })

    const userLinks = (

        <div className="front">
            <div className="maincard-front-link " >
                <div className="blue-background">

                    <h5>User Links</h5>

                </div>
                <div className="user-info">
                    <div className="qoute">
                        <blockquote>
                            <Link
                                className="nav-link"
                                to="/cart">My Cart</Link>
                        </blockquote>
                        <blockquote>
                            <Link
                                className="nav-link"
                                to={`/profile/${_id}`}>Update Profile</Link>
                        </blockquote>
                    </div>


                </div>
            </div>

        </div>
    )
    const userProfile = (
        <div className="front">
            <div className="maincard-front">
                <div className="blue-background">

                    <h5>User information</h5>

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

   

    const userPurchase = (history) => {

        return (
            <div className="front">
                <div className="maincard-front">
                    <div className="blue-background">

                        <h5>Purchase Histroy</h5>

                    </div>
                    <div className="user-info">

                        <div
                         className="qoute" 
                       
                        >

                            {history.map((his, j) => {
                                return (
                                    <div
                                    style={{
                                        border:"1px solid #ccc",
                                        marginBottom:"1rem",
                                        padding:"5px",
                                        textAlign:"left"
                                    }}
                                    >
                                        {his.map((p, i) => {
                                            if(i!==his.length-1)
                                            return( <div key={i} >
                                                <h6>{i+1}.</h6>
                                                <h6 className="ml-3">Product Name :{p.name}</h6>
                                                <h6  className="ml-3">Price :₹{p.price}</h6>
                                                <h6  className="ml-3">Quantity :{p.count}</h6>
                                            </div>)
                            })}


                                        <h5>Date of purchase :{moment(his[his.length - 1].dateOfOrder).fromNow()}</h5>
                                    </div>
                                )
                            })}

                        </div>


                    </div>
                </div>

            </div>
        )
    }




    return (
        <Layout title="Dashboard" description="Dashboard">
            <div className="userProfile">
                <div className="Userinfo" >
                    {userLinks}
                </div>

                <div className="Userinfo" >
                    {userProfile}
                    {userPurchase(history)}

                </div>

            </div>


        </Layout>
    )

}
export default UserDashboard