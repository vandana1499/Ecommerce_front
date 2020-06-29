import React from 'react'
import Layout from '../../component/Layout/Layout'
import { getProducts } from '../../HomeApi/HomeApi'
import Card from '../../component/Card/Card'
import "./Home.scss"
import ProductSearch from "../../container/ProductSearch/ProductSearch"
class Home extends React.Component {
    state = {
        productsBysell: [],
        productsByArrival: [],
        error: ""


    }
    loadProductsBySell = () => {
        getProducts("sold")
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)
                    // console.log(error)
                    this.setState({ error: error })
                }
                else {
                    this.setState({ productsBysell: data.data })
                }
            })
    }
    loadProductsByArrival = () => {
        getProducts("createdAt")
            .then((data) => {
                if (data.error) {
                    const error = [...this.state.error]
                    error.push(data.error)

                    this.setState({ error: error })
                }
                else {
                    this.setState({ productsByArrival: data.data })
                }
            })
    }

    componentDidMount() {
        this.loadProductsBySell()
        this.loadProductsByArrival()
    }
    render() {

        return (
            <Layout title="Home Page" description="Books E-commerce App" >
                <ProductSearch/>
                     <h3 className="mb-4 ml-4">Best Sellers</h3>
                    <div className="layout-cards">
                  
                    {this.state.productsBysell.map((item, i) => (
                        <Card key={i} product={item} showBtn/>


                    ))}
                </div>

                <h3 className=" mb-4 ml-4">New Arrivals</h3>
                <div className="layout-cards">
                   
                    {this.state.productsByArrival.map((item, i) => (
                        <Card key={i} product={item} showBtn />


                    ))}
                </div>
            </Layout>
        )
    }

}
export default Home