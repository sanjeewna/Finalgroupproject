
import React, { useState, useEffect } from 'react'
import Parser from 'html-react-parser';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, Navigate } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {

   // Function for edit //
   let { id } = useParams();
   let orderForm = {};
   let sellForm =  {};
   const navigate = useNavigate();
   const user_level_id = window.sessionStorage.getItem("user_level_id");
   const user_id =  window.sessionStorage.getItem("user_id");

   const [productDetails, setData] = useState({});

   const addToCart = () => {
      console.log("User ID : " + user_id)
      if (user_id) {
         if (window.sessionStorage.getItem("orders_id") != "undefined" && window.sessionStorage.getItem("orders_id") != '' && window.sessionStorage.getItem("orders_id") != null) {
            console.log("No Order, Saving Order ID  : "+window.sessionStorage.getItem("orders_id"));
            saveSells();
         } else {
            console.log("Order ID Exits, Existing Order ID  : "+window.sessionStorage.getItem("orders_id"));
            saveOrder();
         }
      } else {
         navigate("/UserLogin",
         {
           state:
             { msg: 'Kindy login to add item into the cart !!!.', error_type: 'alert-danger' }
         }
       )
      }
   };

   const saveSells = () => {
      sellForm.sell_product_id = productDetails._id;
      sellForm.sell_price_per_unit = productDetails.product_cost;
      sellForm.sell_orders_id = window.sessionStorage.orders_id;
      sellForm.sell_units = formData.sell_units;
      sellForm.sell_total_cost = productDetails.product_cost*formData.sell_units;
   
      addItems();
   };

   const addItems = () => {
      console.log(sellForm);
      axios({
         method: 'post',
         url: `${config.api_url}/sells`,
         data: sellForm,
       })
      .then(function (response) {
         console.log(response);
         navigate('/product-cart');
      })
      .catch(function (response) {
         console.log(response);
      });
   };

   const saveOrder = () => {
      let myDate = new Date();
      let todayDate = myDate.toLocaleString();
      console.log("Date = " + todayDate);
      orderForm.orders_date = todayDate;
      orderForm.orders_customer_id = user_id;
      orderForm.orders_total = 0;
      orderForm.orders_status = "Order Pending";
      addOrder();

   };

   const addOrder = () => {
      axios({
         method: 'post',
         url: `${config.api_url}/orders`,
         data: orderForm,
       })
      .then(function (response) {
         console.log("Order Saved ")
         console.log(response);
         window.sessionStorage.orders_id = response.data.orders._id;
         console.log("Order ID : " + window.sessionStorage.orders_id);
         saveSells();
      })
      .catch(function (response) {
         console.log(response);
      });
   };

    // Setting the sells_units ////
    const [formData, setFormData] = useState({
      sell_units: '1'
   });
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
      

   useEffect(() => {
      console.log("I am here");
      if (id) {
         axios.get(`${config.api_url}/products/product-details/${id}`)
            .then(res => {
               console.log(res.data);
               setData(res.data[0]);
            })
      }
   }, []);

   return (
      <section>
        
         <section id="content">
            <div className="container">
               <div className="about">
                  <div>
                     <div>
                        <div>
                           <h4 className='myhead'>Details of : {productDetails.product_title} </h4>
                        </div>
                        <br />
                     </div>
                  </div>
                  <section class="product_area single-post-area">
                     <div class="container">
                        <div class="container-fliud">
                           <div class="wrapper row">
                              <div class="preview col-md-6">
                                 <div class="preview-pic tab-content">
                                    <div class="tab-pane active" id="pic-1"><img src={"http://127.0.0.1:3000/uploads/" + productDetails.product_image_filename} /></div>
                                 </div>
                              </div>
                              <div class="details col-md-6">
                                 <table class="table table-striped table-hover">
                                    <tbody>
                                       <tr>
                                          <td colSpan={2}>
                                             <div className='overflowscr'>
                                              {productDetails.product_description}
                                             </div>
                                          </td>
                                       </tr>
                                       <tr>
                                          <th>Product Cost : </th>
                                          <td>{Parser(config.currency_symbol)} {productDetails.product_cost}</td>
                                       </tr>
                                       <tr>
                                          <th>Category : </th>
                                          <td>{productDetails.category_data?.map(category => <div>{category.category_title}</div>)}</td>
                                       </tr>
                                       <tr>
                                          <th>Select Quantity : </th>
                                          <td>
                                          <select name='sell_units' onChange={e => onChange(e)} className="form-control" required>
                                             <option value="1">1</option>
                                             <option value="2">2</option>
                                             <option value="3">3</option>
                                             <option value="4">4</option>
                                             <option value="5">5</option>
                                             <option value="6">6</option>
                                             <option value="7">7</option>
                                             <option value="8">8</option>
                                             <option value="9">9</option>
                                             <option value="10">10</option>
                                          </select>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                                 <div class="action">
                                    <button class="add-to-cart btn btn-default"  onClick={addToCart} type="button">add to cart</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   )
}

export default ProductDetails;