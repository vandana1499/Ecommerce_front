import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import Menu from '../Menu/Menu'
import "./Layout.scss"
const layout = (props) => (
    <div>
           <Menu/>
        <Jumbotron>
            <h2>{props.title ? props.title : "Title"}</h2>
            <p>
                {props.description ? props.description : "Description"}
            </p>

        </Jumbotron>
       
            
            {props.children}
       
    </div>
)
export default layout