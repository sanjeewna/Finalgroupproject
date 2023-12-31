
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const UserReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();


   const [user, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);

   // Alert message for displaying success and error ////
   const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
   });
   /**
    * Function for getting lists
    */
   useEffect(() => {
      if (location.state != null) {
         setMessage({
           show_message: true,
           error_type: location.state.error_type,
           msg: location.state.msg
         });
       }

      axios.get(`${config.api_url}/users/list/${id}`)
         .then(res => {
            const user = res.data;
            setData(user);
            setFilteredData(user);
            console.log(user);
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
      axios.delete(`${config.api_url}/users/${id}`)
         .then(res => {
            axios.get(`${config.api_url}/users/list/2`)
            .then(res => {
               const user = res.data;
               setData(user);
               setFilteredData(user);
               setMessage({
                  show_message: true,
                  error_type: 'alert-success',
                  msg: 'User Deleted Successfully !!!'
               });
            })
     })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(user);
   };

   const search_data = () => {
      const newData = user.filter(user => {
         return user.user_first_name.toLowerCase().includes(search_text.search_text.toLowerCase())
            || user.user_city.toLowerCase().includes(search_text.search_text.toLowerCase())
            || user.user_state.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(user);
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
                     <h2 className="pageTitle">
                     <Fragment>
                        {
                          id == "1" ? "All Admin Report" :
                          id == "3" ? "All Delivery Person Report" :
                          id == "2" ? "All Customer Report" : ''
                        }
                     </Fragment>
                     </h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <form className="form-horizontal search_box">
                        <div className="form-group">
                           <label className="col-sm-2" htmlFor="email">Search :</label>
                           <div className="col-sm-4">
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search User" required />
                           </div>
                           <div className="col-sm-4">
                              <button type="button" className="btn btn-default" onClick={search_data}>Search</button>&nbsp;&nbsp;
                              <button type="reset" className="btn btn-danger" onClick={reset_search}>Reset</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               <div>
                  {message.show_message ? (
                      <div className={'alert ' + message.error_type} role="alert">
                        {message.msg}
                      </div>
                    ) : (
                      ''
                    )}
               </div>
               <div className="row">
               <div className='add-button btn btn-success'><Link to="/register">Add New Customer</Link></div>
              

                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">Sr. No. </th>
                              <th scope="col">User Name</th>
                              <th scope="col">Contact No</th>
                              <th scope="col">Email</th>
                              <th scope="col">City</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
               {
                     filteredData
                        .map((user , index) =>
                           <tr>
                           <th scope="row">{index+1}</th>
                           <td>{user.user_name}</td>
                           <td>{user.user_mobile}</td>
                           <td>{user.user_email}</td>
                           <td>{user.user_city}</td>
                           <td>
                              <Link to={"/user-add/"+user._id}>
                              <span className="glyphicon glyphicon-edit editi"></span>
                              </Link>&nbsp;&nbsp;
                              <a onClick={() => confirmatioBox(user._id)} href="#!">
                                 <span className="glyphicon glyphicon-trash deletei"></span>
                              </a>
                           </td>
                        </tr>
                    )
                  }
                     </tbody>
                     </table>
               </div>
            </div>
         </section>
      </section>
   )
}
export default UserReport;
