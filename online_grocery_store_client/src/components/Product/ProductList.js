
import axios from 'axios';
import Parser from 'html-react-parser';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link,useParams } from 'react-router-dom';
import config from '../../utils/config';

const ProductList = () => {

   var { id } = useParams();
   const [products, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      if(id != "0") {
         axios.get(`${config.api_url}/products/all-product/${id}`)
            .then(res => {
               const products = res.data;
               setData(products);
               setFilteredData(products);
               console.log(products);
            })
      } else {
         axios.get(`${config.api_url}/products`)
            .then(res => {
               const products = res.data;
               setData(products);
               setFilteredData(products);
               console.log(products);
            })
      }
   }, []);

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(products);
   };

   const search_data = () => {
      const newData = products.filter(product => {
         return product.product_title.toLowerCase().includes(search_text.search_text.toLowerCase())
            || product.category_data[0].category_title.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(products);
      }
   };

   // Handlinng Change Event
   const onChange = (e) =>
      setSearchData({ [e.target.name]: e.target.value });

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">All Products</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>All Products</h2>
                        These all are available products. Kindly click on the products to see the details of it.
                     </div>
                     <br />
                     <form className="form-horizontal search_box">
                        <div className="form-group">
                           <label className="col-sm-2" htmlFor="email">Search Products:</label>
                           <div className="col-sm-4">
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Products" required />
                           </div>
                           <div className="col-sm-4">
                              <button type="button" className="btn btn-default" onClick={search_data}>Search</button>&nbsp;&nbsp;
                              <button type="reset" className="btn btn-danger" onClick={reset_search}>Reset</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="row">
               {
                     filteredData
                        .map(product =>
                        <div className="col-md-3 col-sm-6 product-list">
                           <div className="product-grid">
                              <div className="product-image">
                                 <a href="#" className="image">
                                    <img className="pic-1" src={"http://127.0.0.1:3000/uploads/"+product.product_image_filename} />
                                 </a>
                                 <span class="product-sale-label">{product.category_data.map(category => <div>{category.category_title}</div>)}</span>
                                 <ul className="product-links">
                                    <li><Link to={"/product-details/" + product._id}><i className="fa fa-shopping-bag"></i> Add to cart</Link></li>
                                    <li><Link to={"/product-details/" + product._id}><i className="fa fa-search"></i> Quick View</Link></li>
                                 </ul>
                              </div>
                              <div className="product-content">
                                 <h3 className="title"><a href="#">{product.product_title}</a></h3>
                                 <div className="price">Cost : {Parser(config.currency_symbol)} {product.product_cost}.00/-</div>
                              </div>
                           </div>
                        </div>
                    )
                  }
               </div>
            </div>
         </section>
      </section>
   )
}
export default ProductList;