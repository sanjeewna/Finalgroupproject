
import axios from 'axios';
import Parser from 'html-react-parser';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const ProductCart = () => {

   const [total_amount, setTotal] = useState();
   const [cart_items, setData] = useState([]);
   const [error_message, setError] = useState();

   /**
    * Function for getting lists
    */
   useEffect(() => {

      /// Function for getting all order items ///
      axios.get(`${config.api_url}/sells/all-sells/${window.sessionStorage.getItem("orders_id")}`)
         .then(res => {
            const cart_items = res.data;
            setData(cart_items);
            console.log(cart_items);
         })

      /// Function for calculating total cost ///
      axios.get(`${config.api_url}/sells/all-sells/${window.sessionStorage.getItem("orders_id")}`)
         .then(res => {
            const products = res.data;
            let total_amount = 0;
            products.forEach((element) => {
               total_amount += Number(element.sell_total_cost);
            });
            setTotal(total_amount);
            console.log("total amount : " + total_amount);
         })
   }, []);

   /**
    * Confirmation Dialogue Implementation
    */
   const confirmatioBox = (id) => {
      confirmAlert({
         title: 'Confirm to delete',
         message: 'Are you sure to delete this record ?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => deleteData(id)
            },
            {
               label: 'No'
            }
         ]
      });
   }

   /**
    * Function for deleting data
    * @param {*} id 
    */
   const deleteData = (id) => {
      axios.delete(`${config.api_url}/sells/${id}`)
         .then(res => {
            /// Function for getting all order items ///
            axios.get(`${config.api_url}/sells/all-sells/${window.sessionStorage.getItem("orders_id")}`)
               .then(res => {
                  const cart_items = res.data;
                  setData(cart_items);
                  console.log(cart_items);
               })

            /// Function for calculating total cost ///
            axios.get(`${config.api_url}/sells/all-sells/${window.sessionStorage.getItem("orders_id")}`)
               .then(res => {
                  const products = res.data;
                  let total_amount = 0;
                  products.forEach((element) => {
                     total_amount += Number(element.sell_total_cost);
                  });
                  setTotal(total_amount);
                  console.log("total amount : " + total_amount);
               })

            setError('Cart Item Deleted Successfully !!!')
         })
   }

   return (
      <section>
         <section id="content">
            <section className="product_area single-post-area">
               <div className="container">
                  <div>
                     <div>
                        <div>
                           <h4 className='myhead'>Items in your Cart </h4>
                        </div>
                        <br />
                     </div>
                  </div>
                  {error_message &&
                     <div className="alert alert-danger" role="alert">
                        {error_message}
                     </div>
                  }
                  <table id="cart" className="table table-hover">
                     <thead className="thead-dark">
                        <tr>
                           <th style={{width: "8%", textAlign:"center"}}>ID</th>
                           <th>Image</th>
                           <th>Title</th>
                           <th>Price Per Unit</th>
                           <th>Total Units</th>
                           <th className="text-center">Subtotal</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           cart_items
                              .map((productDetails , index) =>
                                 <tr>
                                    <td style={{width: "8%", textAlign:"center"}}>{ index+1 }</td>
                                    {
                                       productDetails.product_data.map(product => 
                                       <td style={{width: "17%"}}><img className="my-thumbnail" src={"http://127.0.0.1:3000/uploads/" + product.product_image_filename}/></td>
                                    )}
                                    <td style={{width: "26%"}}>
                                          <h4 className="nomargin">{productDetails.product_data.map(product => <div>{product.product_title}</div>)}</h4>
                                    </td>
                                    <td style={{width: "13%"}}>{Parser(config.currency_symbol)} {productDetails.sell_price_per_unit}</td>
                                    <td style={{width: "13%"}}>{productDetails.sell_units} Items</td>
                                    <td style={{width: "13%"}} className="text-center">{Parser(config.currency_symbol)} {productDetails.sell_total_cost}</td>
                                    <td className="actions" style={{width: "10%"}}>
                                       <button className="btn btn-danger btn-sm" onClick={() => confirmatioBox(productDetails._id)}><i className="fa fa-trash-o"></i></button>
                                    </td>
                                 </tr>
                              )
                        }
                     </tbody>
                     <tfoot>
                        <tr>
                           <td colSpan={3}><a className="btn btn-warning"><i className="fa fa-angle-left"></i> <Link to={"/products/0"} className="white">Continue Shopping</Link></a></td>
                           <td colspan="2" className="hidden-xs"></td>
                           <td className="hidden-xs text-center"><strong>Total Cost :  {Parser(config.currency_symbol) + " " + total_amount}</strong></td>
                           <td><a className="btn btn-success btn-block"><Link to={"/payment"} className="white">Checkout</Link> <i className="fa fa-angle-right"></i></a></td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
            </section>
         </section>
      </section>
   )
}

export default ProductCart;