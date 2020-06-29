import React from 'react'
import Layout from '../../component/Layout/Layout'
import { listProductBySearch,getCategories } from '../../HomeApi/HomeApi'
import Card from '../../component/Card/Card'
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap"

import "./Shopping.scss"
import { prices } from '../../Prices/Prices'
class Shopping extends React.Component {
    state = {
        categories: [],
        error: [],
        myFilters: {
            filters: {
                category: [],
                price: []
            }
        },
        limit: 6,
        skip: 0,
        filteredResults: 0,
        size: 0
    }
    componentDidMount() {
        getCategories()
            .then((data) => {


                if (data.error) {

                    this.setState({ error: data.error })

                }
                else {
                    let cat = [...this.state.categories]
                    cat = data.data.result

                    this.setState({ categories: cat })
                }
            })
        this.filterProducts(this.state.skip, this.state.limit, this.state.myFilters.filters)

    }
    filterProducts = (filters) => {

        listProductBySearch(this.state.skip, this.state.limit, filters)
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)

                    this.setState({ error: error })

                }
                else {
                    // console.log(data.data.size)
                    this.setState({ filteredResults: data.data.result, size: data.data.size, skip: 0 })
                }
            })
    }

    loadmore = () => {
        let skip = this.state.skip + this.state.limit

        listProductBySearch(skip, this.state.limit, this.state.myFilters.filters)
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)

                    this.setState({ error: error })

                }
                else {
                    const res = [...this.state.filteredResults, ...data.data.result]
                    this.setState({ filteredResults: res, size: data.data.size, skip: skip })
                }
            })

    }


    handleToggle = (event) => {
        let values = [...this.state.myFilters.filters.category]
        let index = values.indexOf(event.target.value)
        if (index === -1) {
            values.push(event.target.value)

        }
        else {
            values.splice(index, 1)

        }
        const newFilters = { ...this.state.myFilters }
        newFilters.filters["category"] = values
        this.filterProducts(this.state.myFilters.filters)
        this.setState({ myFilters: newFilters })
    }
    handleRadio = (event) => {

        let value = event.target.value
        const data = [...prices]
        let arr = []
        for (let key in data) {

            if (data[key]._id === parseInt(value)) {
                arr = data[key].array;
            }
        }

        const newFilters = { ...this.state.myFilters }
        newFilters.filters["price"] = arr
        this.filterProducts(this.state.myFilters.filters)
        this.setState({ myFilters: newFilters })

    }



    render() {

        let loadBtn = ""
        if (this.state.size > 0 && this.state.size >= this.state.limit) {
            loadBtn = (


                <Button
                    onClick={this.loadmore}
                    variant="primary" className="laodBtn" >
                    Load More
                </Button>

            )
        }
      


        return (
            <Layout
                title="Shop Page"
                description="Search book according to your choice." >
                <Row style={{ marginRight: "0px", marginLeft: "0px" }} className="Filters">

                    <Col md={4} lg={3} >
                        <div className="filter">
                            <h4 style={{ fontSize: "1rem" }}>Filter by Categories</h4>
                            {this.state.categories ?
                                this.state.categories.map((category, i) => (
                                    <InputGroup key={i}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Checkbox
                                                aria-label="Checkbox for following text input"
                                                onChange={this.handleToggle}
                                                value={category._id}
                                            />
                                        </InputGroup.Prepend>
                                        <FormControl aria-label="Text input with checkbox" placeholder={category.name} disabled />
                                    </InputGroup>

                                )
                                ) : null}
                            <h4 style={{ fontSize: "1rem" }}>Filter by Prices</h4>
                            {prices.map((price) => (
                                <InputGroup key={price._id}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Radio
                                            name="Prices Option"
                                            aria-label="Radio button for following text input"
                                            onChange={this.handleRadio}
                                            value={price._id}
                                        />
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Text input with radio button" disabled placeholder={price.name} />
                                </InputGroup>
                            ))}

                        </div>
                    </Col>
                    <Col >
                    <h2>Products</h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexWrap: "wrap",
                                alignItems: "center"
                            }}>
                            
                            
                            {this.state.filteredResults.length>0
                                ?
                                this.state.filteredResults.map((product, i) => (

                                    <Card  showBtn product={product} key={i} />

                                ))
                                : <h3>No Products in this filter</h3>}
                        </div>
                        <hr />
                        {loadBtn}
                    </Col>
                </Row>
            </Layout>
        )
    }
}
export default Shopping