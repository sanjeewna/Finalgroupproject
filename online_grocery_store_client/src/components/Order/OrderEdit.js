import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import config from '../../utils/config';
import axios, { post } from 'axios';


const OrderAdd = ({ setAlert, order, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();
   let { url } = `${config.api_url}/order`;

    // Creating FormData Form elements ////
    const [formData, setFormData] = useState({
      order_id:'',
      order_user_id: '',
      order_total: '',
      order_status: '',
      order_date: '',
      order_tracking_id: '',
      order_delivery_id: ''
   });

   const [statusDropDown, setstatusDropDown] = useState([{
      status_id: '',
      status_name: ''
   }]);

   const [deliveryDropDown, setDelliveryDropDown] = useState([{
      user_id: '',
      user_first_name: ''
   }]);

   
   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/orders/details/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data[0]);
            })
      }

       // Get  Quotation Group Dropdown
       axios.get(`${config.api_url}/status`)
       .then(res => {
          setstatusDropDown(res.data);
       })

      // Get  Quotation Group Dropdown
      axios.get(`${config.api_url}/users/list/3`)
      .then(res => {
         setDelliveryDropDown(res.data);
      })
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });


   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();

      // On submit //
      if (id) {
         console.log(url);
            axios({
               method: "put",
               url: `${config.api_url}/orders/${id}`,
               data: formData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/order-report")
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         console.log("Starting Upload");
            axios({
               method: "post",
               url: `${config.api_url}/orders`,
               data: formData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/order-report")
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      }
   };

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Edit Order {id}</h2>
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
                                 <h2 className='h2c'>Edit Order ID : {id}</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc lefta">
                              <form className="form-horizontal" onSubmit={onSubmit}>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Tracking ID :</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.order_tracking_id} onChange={e => onChange(e)} name="order_tracking_id" className="form-control" placeholder="Enter Tracking ID" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Delivery Partner :</label>
                                    <div className="col-sm-8">
                                    <select name='order_delivery_id' value={formData.order_delivery_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Delivery Partner</option>
                                       {deliveryDropDown.map((option) => (
                                          <option value={option._id}>{option._id}-{option.user_first_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Order Status :</label>
                                    <div className="col-sm-8">
                                    <select name='order_status' value={formData.order_status} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Delivery Status</option>
                                       {statusDropDown.map((option) => (
                                          <option value={option.status_id}>{option.status_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                                 <input type="hidden" value={formData.order_image_filename} className="form-control" id="order_image_filename" name="order_image_filename" />
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

OrderAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   order: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(OrderAdd);