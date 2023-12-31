
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, Navigate } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import Parser from 'html-react-parser';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const ProductCartPayment = () => {

   const navigate = useNavigate();
   const [total_amount, setTotal] = useState();
   let orderForm = {};
   console.log("Order ID : "+window.sessionStorage.getItem("orders_id"));
   /**
    * Function for getting lists
    */
   useEffect(() => {
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

   const save_order = () => {
      console.log("Save Data");
      console.log("Order ID : "+window.sessionStorage.getItem("orders_id"));

      let myDate = new Date();
      let orders_id = window.sessionStorage.getItem("orders_id");
      let todayDate = myDate.toLocaleString();
      orderForm.orders_total = total_amount;
      orderForm.orders_customer_id = window.sessionStorage.getItem("user_id");;
      orderForm.orders_status = "Order Completed";
      orderForm.orders_id = window.sessionStorage.getItem("orders_id");;
      orderForm.orders_date = todayDate;
      axios({
         method: 'put',
         url: `${config.api_url}/orders/${window.sessionStorage.getItem("orders_id")}`,
         data: orderForm,
      }).then(res => {
         navigate("/order-details/" + orders_id)
      })
         .catch(function (response) {
            console.log(response);
         });
      window.sessionStorage.removeItem("orders_id");
     
   };


   return (
      <section>
         <section id="content">
            <div className="container">
               <div>
                  <div>
                     <div>
                        <h4 className='myhead'>Make Payments</h4>
                     </div>
                     <br />
                  </div>
               </div>
               <div className="about">
                  <section className="features">
                     <div className="container">
                        <section className="vh-100">
                           <div className="col-sm-6">
                              <form className="form-horizontal" id="commentForm">
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Card No :</label>
                                    <div className="col-sm-8">
                                       <div className='stext'> <input type="text" className="form-control" placeholder="Enter Your Card Number" name="card_number" /> </div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Name on Card :</label>
                                    <div className="col-sm-8">
                                       <div className='stext'><input type="text" className="form-control" placeholder="Enter Your Name on Card" name="card_name" /></div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Select Card Type :</label>
                                    <div className="col-sm-8">
                                       <select className="form-control">
                                          <option value="">Card Type</option>
                                          <option value="master">Master Card</option>
                                          <option value="visa">Visa Card</option>
                                          <option value="amex">Amex Card</option>
                                          <option value="diner">Diner Club</option>
                                          <option value="rupay">Rupay</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Expiry Year/Month</label>
                                    <div className="col-sm-8 form-row">
                                       <div className="form-group col-sm-6">
                                          <select className="form-control">
                                             <option value="">Year</option>
                                             <option value="2021">2021</option>
                                             <option value="2022">2022</option>
                                             <option value="2023">2023</option>
                                             <option value="2024">2024</option>
                                             <option value="20025">2025</option>
                                          </select>
                                       </div>&nbsp;&nbsp;
                                       <div className="form-group col-sm-6">
                                          <select className="form-control">
                                             <option value="">Month</option>
                                             <option value="1">January</option>
                                             <option value="2">February</option>
                                             <option value="3">March</option>
                                             <option value="4">April</option>
                                             <option value="5">May</option>
                                             <option value="6">June</option>
                                             <option value="7">July</option>
                                             <option value="8">August</option>
                                             <option value="9">September</option>
                                             <option value="10">October</option>
                                             <option value="11">November</option>
                                             <option value="12">December</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Amount</label>
                                    <div className="col-sm-8">
                                       <div className='stext'><input type="text" className="form-control" placeholder="" readonly name="payment_amount" value={Parser(config.currency_symbol) + " " + total_amount} /></div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="button" className="btn btn-default" onClick={save_order}>Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                           <div className="col-sm-6">
                              <img src="/img/payment.png" style={{height:250}}/>
                           </div>
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   )
}

export default ProductCartPayment;