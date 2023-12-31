import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../utils/config';

const UserAdd = () => {
   const navigate = useNavigate();
   const location = useLocation();

   // Function for edit //
   let { id } = useParams();

   // Alert message for displaying success and error ////
   const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
   });

   // Alert message for displaying success and error ////
   const [diplay, hidePassword] = useState('block');

   // Creating FormData Form elements ////
   const [formData, setFormData] = useState({
      user_id: '',
      user_level_id: 2,
      user_email: '',
      user_password: '',
      user_confirm_password: '',
      user_name: '',
      user_dob: '',
      user_address: '',
      user_city: '',
      user_state: '',
      user_country: '',
      user_mobile: '',
      user_nationalty: ''
   });

   useEffect(() => {

      // if(window.sessionStorage.getItem("user_level_id") == 2) {
      //    hidePassword('none');
      // }

      if (location.state != null) {
         setMessage({
            show_message: true,
            error_type: location.state.error_type,
            msg: location.state.msg
         });
      }

      if (id) {
         axios.get(`${config.api_url}/users/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data);
            })
      }
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();
      if (formData.user_password != formData.user_confirm_password && window.sessionStorage.getItem("user_level_id") !=2) {
         console.log(formData.user_password+" AND "+formData.user_confirm_password)
         setMessage({
            show_message: true,
            error_type: 'alert-danger',
            msg: 'Password and Confirm Password is not matching. Kindly re-enter !!!'
         });
         return 0;
      }
      // On submit //
      if (id) {
         axios({
            method: 'put',
            url: `${config.api_url}/users/${id}`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               if(window.sessionStorage.getItem("user_level_id") == "1") {
                  setMessage({
                     show_message: true,
                     error_type: 'alert-success',
                     msg: 'User Details Updated Successfully'
                  });
                  navigate("/user-report/" + formData['user_level_id'],
                  {
                     state:
                        { msg: 'User Details Updated Successfully !!!', error_type: 'alert-success' }
                  }
               )
               } 
               else {
                  setMessage({
                     show_message: true,
                     error_type: 'alert-success',
                     msg: 'Your Account Updated Successfully !!!'
                  });
                  navigate("/user-add/" + id)
               } 
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         // Check User Email Already Exits ///
         axios({
            method: 'get',
            url: `${config.api_url}/users/check-user-exits/${formData.user_email}`
         })
            .then(function (user_data) {
               console.log("user data");
               if (user_data.data.length == 0) {
                  axios({
                     method: 'post',
                     url: `${config.api_url}/users`,
                     data: formData,
                  })
                     .then(function (response) {
                        //handle success
                        console.log("Success  : ");
                        console.log(response);
                        if(window.sessionStorage.getItem("user_level_id") == "1") {
                           navigate("/user-report/" + formData['user_level_id'],
                           {
                              state:
                                 { msg: 'Account Registered Successfully !!!', error_type: 'alert-success' }
                           })
                        } else {
                           navigate("/UserLogin",
                              {
                                 state:
                                    { msg: 'Your account has been successfully registered. Kinldy login.', error_type: 'alert-success' }
                              }
                        )}
                        // navigate("/UserLogin")
                     })
                     .catch(function (response) {
                        //handle error
                        console.log("Error  : ");
                        console.log(response);
                     });
               } else {
                  setMessage({
                     show_message: true,
                     error_type: 'alert-danger',
                     msg: 'Email ID already exits. Kindly choose another email ID or login !!!'
                  });
               }
            });

      }
   };

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">User Registration</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               <div className="about">
                  <section className="features">
                     <div className="container">
                        <div>
                           <div>
                              <div>
                                 <h2 className='h2c'>User Registration Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           {message.show_message ? (
                              <div className={'alert ' + message.error_type} role="alert">
                                 {message.msg}
                              </div>
                           ) : (
                              ''
                           )}
                           <div className='lgfrm'>
                              <form  onSubmit={onSubmit} className="form-horizontal">
                                 <div>
                                    <div className="row">
                                       <div className="col">
                                          <label>Email ID</label>
                                          <input type="email" className="form-control" id="user_email" required name="user_email" value={formData.user_email} onChange={e => onChange(e)} />
                                       </div>
                                       <div className="col">
                                          <label>Name</label>
                                          <input type="text" className="form-control" id="user_name" required name="user_name" value={formData.user_name} onChange={e => onChange(e)} />
                                       </div>
                                    </div>
                                 </div>
                                 <div style={{display:diplay}}>
                                    <div className="row">
                                       <div className="col">
                                          <label>Password</label>
                                          <input type="password" className="form-control" id="user_password" required name="user_password" value={formData.user_password} onChange={e => onChange(e)} />
                                       </div>
                                       <div className="col">
                                          <label>Confirm Password</label>
                                          <input type="password" className="form-control" id="user_confirm_password" required name="user_confirm_password" onChange={e => onChange(e)}   />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Date of Birth</label>
                                       <input type="date" className="form-control" id="user_dob" required name="user_dob" value={formData.user_dob} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Mobile</label>
                                       <input type="text" className="form-control" id="user_mobile" required name="user_mobile" value={formData.user_mobile} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Nationality</label>
                                       <input type="text" className="form-control" id="user_nationalty" required name="user_nationalty" value={formData.user_nationalty} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Full Address</label>
                                       <input type="text" className="form-control" id="user_address" required name="user_address" value={formData.user_address} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>City</label>
                                       <input type="text" className="form-control" id="user_city" required name="user_city" value={formData.user_city} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>State</label>
                                       <input type="text" className="form-control" id="user_state" required name="user_state" value={formData.user_state} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Country</label>
                                       <input type="text" className="form-control" id="user_country" required name="user_country" value={formData.user_country} onChange={e => onChange(e)} />
                                    </div>
                                 </div>

                                 <div className='lgbtn'>
                                    <button type="submit" className="btn btn-success">Submit</button>&nbsp;&nbsp;
                                    <button type="reset" className="btn btn-danger">Reset</button>
                                 </div>
                              </form>
                           </div>
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   );
};

export default UserAdd;