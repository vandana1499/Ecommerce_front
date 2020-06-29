import React, { useEffect, useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Navbar, Nav, Image } from 'react-bootstrap';
import { signout, isAuthenticated } from '../../Auth/index'
import "./Menu.scss"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { itemTotal } from "../../CartApi/CartApi"

const Menu = (props) => {

    const [total, setTotal] = useState(0)
    useEffect(() => {

        setTotal(itemTotal())
    }, [total])

    return (

        <Navbar bg="primary" expand="lg">
            <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link"
                        to="/"

                    >Home</NavLink>
                    <NavLink className="nav-link"
                        to="/shop"

                    >Shop</NavLink>
                {isAuthenticated() && isAuthenticated().user.role === 0?
                  <NavLink className="nav-link"
                  to="/cart"

              >Cart <sup><small className="cart-badge" style={{ color: "white", fontWeight: "bold", fontSize: "12px" }}> ({total})</small></sup>
              </NavLink>:null}
                  

                    {(isAuthenticated() && isAuthenticated().user.role === 0) ?
                        <NavLink className="nav-link"
                            to="/user/dashboard"
                        >Dashboard</NavLink> : null}
                    {(isAuthenticated() && isAuthenticated().user.role === 1) ?
                        <NavLink className="nav-link"
                            to="/admin/dashboard"
                        >Dashboard</NavLink> : null}

                    {!isAuthenticated()  ? <Aux>
                        <NavLink
                            className="nav-link"
                            to="/signin"
                        // activeStyle={style(props.history, "/signin")}
                        >Signin</NavLink>

                        <NavLink
                            className="nav-link"
                            to="/signup"
                        //  activeStyle={style(props.history, "/signup")}
                        >Signup</NavLink>

                    </Aux> : <Aux>


                            <span
                                className="nav-link"
                                onClick={() => {
                                    signout(() => {
                                        props.history.push("/")
                                    })
                                }}
                                style={{ cursor: "pointer", color: "#fff" }}
                            //  activeStyle={style(props.history, "/signup")}
                            >Sign Out</span></Aux>

                    }


                </Nav>
                {isAuthenticated() ? <Navbar.Text>
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{
                            border: "1px solid #fff",
                            width: "30px",
                            height: "30px",
                            boxSizing: "border-box",
                            padding: "4px",
                            borderRadius: "50%",
                            color: "#fff"
                        }}
                    />
                </Navbar.Text> : null}


            </Navbar.Collapse>
        </Navbar>

    )
}
export default withRouter(Menu)