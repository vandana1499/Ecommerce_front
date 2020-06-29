import React from "react"
import Card from "../../component/Card/Card"
import {  getCategories, list } from "../../HomeApi/HomeApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import Aux from "../../hoc/Auxiliary/Auxiliary"
class ProductSearch extends React.Component {
    state = {
        data: {
            categories: [],
            category: "",
            search: "",
            results: [],
            searched: false,
            error: []
        },
        title: "Choose Category"

    }
    loadCategories = () => {
        getCategories()
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)
                    this.setState({ error: error })

                }
                else {

                    let values = { ...this.state.data }
                    values["categories"] = data.data
                    this.setState({ data: values })
                }
            })

    }
    componentDidMount() {
        this.loadCategories()
    }
    searchSubmit = (e) => {
        e.preventDefault()
        
        this.searchData()
        let value={...this.state.data}
        value["search"]=""
        this.setState({title:"Choose Category",data:value})

       
    }
    handleChange = (event) => {

        let values = { ...this.state.data }
        values["search"] = event.target.value
        this.setState({ data: values, searched: false })
    }
    categoryHandler = (event) => {

        let values = { ...this.state.data }
        values["category"] = event
        if (this.state.data.categories.result && event) {
            this.state.data.categories.result.forEach((item) => {

                if (item._id === event) {
                    this.setState({ title: item.name })
                }
            })
        }
        this.setState({ data: values, searched: false })
    }
    searchData = () => {
        if (this.state.data.search) {
            list({
                search: this.state.data.search || undefined,
                category: this.state.data.category
            })
                .then((data) => {
                    if (data.error) {
                        // const error = [...this.state.error]
                        // error.push(data.error)
                        // this.setState({ error: error })
                        console.log(data.error)

                    }
                    else {

                        let values = { ...this.state.data }
                        values["results"] = data.data
                        values["searched"]=true
                        this.setState({ data: values})
                    }
                })
        }
    }
    searchProductResults = ( ) => {
        return (
        <Aux>
            <h3 className="ml-4">
                {this.searchMessage(this.state.data.searched,this.state.data.results)}
            </h3>
            <div className="layout-cards">
                {this.state.data.results.map((product,i)=>(
                    <Card product={product} key={i}/>
                ))}
            </div>
            </Aux>
    

        )


    }
    searchMessage=(search,results)=>{
       
        if(search && results.length>0)
        {
            return 'Found '+results.length +" product/s"
        }
        if(search && results.length<1)
        {
            return "No products Found"
        }
        
    }

    render() {
        return (
            <div>
                <div
                    style={{ padding: "1rem" }}
                >
                    <Form
                        onSubmit={this.searchSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",


                        }}
                    >
                        <Form.Group controlId="formBasicEmail">

                            <InputGroup>


                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title={this.state.title}
                                    drop="down"
                                    id="input-group-dropdown-2"
                                    style={{
                                        height: "38px",

                                        background: "#e8e8e8",

                                    }}
                                    onSelect={this.categoryHandler}>
                                    {
                                        this.state.data.categories.result
                                            ?
                                            (this.state.data.categories.result.map(item => (
                                                <Dropdown.Item
                                                    key={item._id}
                                                    eventKey={item._id}

                                                >{item.name}</Dropdown.Item>)
                                            )
                                            )
                                            : null
                                    }




                                </DropdownButton>



                                <Form.Control
                                    type="text"
                                    placeholder="Search Products"
                                    onChange={this.handleChange}
                                    value={this.state.data.search}
                                />
                            </InputGroup>
                        </Form.Group>


                        <Button
                            variant="primary"
                            style={{
                                marginTop: "-15px",
                                borderRadius: "0px",
                                background: "linear-gradient(135deg, #6e8efb, #a777e3)"
                            }}
                            type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>

                </div>

                <div>
                    { this.searchProductResults()}
                </div>
            </div>
        )
    }
}
export default ProductSearch