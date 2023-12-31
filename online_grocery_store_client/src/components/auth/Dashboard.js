import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import { register } from '../../actions/auth';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
   const navigate = useNavigate();


   function logout() {
      window.sessionStorage.removeItem("user");
      window.sessionStorage.removeItem("user_id");
      window.sessionStorage.removeItem("user_level_id");
      window.sessionStorage.removeItem("user_name");
      navigate("/UserLogin")
   }

   const adminLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/About">About</Link></li>
         <li><Link to="/product-report">Product Report</Link></li>
         <li><Link to="/category-report">Category Report</Link></li>
         <li><Link to="/user-report/2">Customer Report</Link></li>
         <li><Link to="/product-add">Add Product</Link></li>
         <li><Link to="/category-add">Add Category</Link></li>
         <li><Link to="/order-report">Order Management</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   const deliveryLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/order-report">My Deliveries</Link></li>
         <li><Link to={'/user-add/'+window.sessionStorage.getItem("user_id")}>My Account</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   const userLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/products/0">All Products</Link></li>
         <li><Link to="/product-cart">My Cart</Link></li>
         <li><Link to="/order-report">My Orders</Link></li>
         <li><Link to={'/user-add/'+window.sessionStorage.getItem("user_id")}>My Account</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   return (
      <section>
         <section id="content">
            <div className="container">
               <div className="about">
                  <section className="features">
                     <div className="container">
                        <div>
                           <div>
                              <div>
                                 <h2 className='h2c'>
                                 <Fragment>
                                    {
                                       window.sessionStorage.getItem("user_level_id") == "1" ? " Admin Dashboard" :
                                       window.sessionStorage.getItem("user_level_id") == "3" ? " Delivery Dashboard" :
                                       window.sessionStorage.getItem("user_level_id") == "2" ? " User Dashboard" : ''
                                    }
                                 </Fragment>
                                 </h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                        <div className="row">
                           <div className="col-sm-6">
                              <div id="login-home">
                                 {(
                                    <Fragment>
                                       {
                                          window.sessionStorage.getItem("user_level_id") == "1" ? adminLinks :
                                          window.sessionStorage.getItem("user_level_id") == "3" ? deliveryLinks :
                                          window.sessionStorage.getItem("user_level_id") == "2" ? userLinks : ''
                                       }
                                    </Fragment>
                                 )}
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <img src="/img/home.jpeg" style={{height:400, width:600}}/><br />
                           </div>
                        </div>
                        </section>
                     </div>
                  </section >
               </div >
            </div >
         </section >
      </section >
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);