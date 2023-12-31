
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const ProductReport = () => {

   // Function for edit //
   let { id } = useParams();
   const location = useLocation();


   const [product, setData] = useState([]);
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

      axios.get(`${config.api_url}/products`)
         .then(res => {
            const product = res.data;
            setData(product);
            setFilteredData(product);
            console.log(product);
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
      axios.delete(`${config.api_url}/products/${id}`)
         .then(res => {
            axios.get(`${config.api_url}/products`)
            .then(res => {
               const product = res.data;
               setData(product);
               setFilteredData(product);
               setMessage({
                  show_message: true,
                  error_type: 'alert-success',
                  msg: 'Product Deleted Successfully !!!'
               });
            })
     })
   }

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(product);
   };

   const search_data = () => {
      const newData = product.filter(product => {
         return product.product_title.toLowerCase().includes(search_text.search_text.toLowerCase())
            || product.category_data[0].category_title.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(product);
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
                       All Product Report
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
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Product" required />
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
               <div className='add-button btn btn-success'><Link to="/product-add">Add New Product</Link></div>
              

                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">Sr. No.</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Product Image</th>
                              <th scope="col">Category</th>
                              <th scope="col">Cost Per Unit</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
               {
                     filteredData
                        .map((product , index) =>
                           <tr>
                           <td>{index+1}</td>
                           <td>{product.product_title}</td>
                           <td> <img className="pic-2" src={"http://127.0.0.1:3000/uploads/"+product.product_image_filename} /></td>                           
                           <td>{product.category_data.map(category => <div>{category.category_title}</div>)}</td>
                           <td>{product.product_cost}</td>
                           <td>
                              <Link to={"/product-add/"+product._id}>
                              <span className="glyphicon glyphicon-edit editi"></span>
                              </Link>&nbsp;&nbsp;
                              <a onClick={() => confirmatioBox(product._id)} href="#!">
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
export default ProductReport;
