import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import config from '../../utils/config';
import axios, { post } from 'axios';


const ProductAdd = ({ setAlert, product, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();
   let { url } = `${config.api_url}/products`;

    // Creating FormData Form elements ////
    const [formData, setFormData] = useState({
      product_title: '',
      product_category_id: '',
      product_cost: '',
      product_description: '',
      product_image_filename: ''
   });

   const [categoryDropDown, setcategoryDropDown] = useState([{
      category_id: '',
      category_name: ''
   }]);

   const [selectedFile, setSelectedFile] = useState();
   
   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/products/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData({
               'product_title':res.data.product_title,
               "product_category_id":res.data.product_category_id,
               "product_cost":res.data.product_cost,
               "product_description":res.data.product_description,
               "product_image":res.data.product_image_filename,
               });
            })
      }

       // Get  Quotation Group Dropdown
       axios.get(`${config.api_url}/category`)
       .then(res => {
          setcategoryDropDown(res.data);
       })
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // On file select (from the pop up)
   const onFileChange = (e) =>
      setSelectedFile(e.target.files[0]);


   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();

      // Fileupload Functionalities
      const fileData = new FormData();
      if(selectedFile){
         fileData.append('product_image_filename', selectedFile, selectedFile.name);
      } 
      
      // Put data form in FormData
      for (let key in formData) {
         console.log("Insie Iterator"+formData[key])
         fileData.append(key, formData[key]);
      }

      
      // On submit //
      if (id) {
         console.log(url);
            axios({
               method: "post",
               url: `${config.api_url}/products/${id}`,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/product-report")
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
               url: `${config.api_url}/products`,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/product-report")
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
                     <h2 className="pageTitle">Product Registration</h2>
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
                                 <h2 className='h2c'>Product Entry Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc lefta">
                              <form className="form-horizontal" onSubmit={onSubmit} enctype="multipart/form-data">
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Product Name:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.product_title} onChange={e => onChange(e)} name="product_title" className="form-control" placeholder="Enter Product Name" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Select Category :</label>
                                    <div className="col-sm-8">
                                    <select name='product_category_id' value={formData.product_category_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Category</option>
                                       {categoryDropDown.map((option) => (
                                          <option value={option._id}>{option.category_title}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Product Cost:</label>
                                    <div className="col-sm-8">
                                       <input type="number" value={formData.product_cost} onChange={e => onChange(e)} name="product_cost" className="form-control" placeholder="Enter Product Cost" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Product Image:</label>
                                    <div className="col-sm-8">
                                       <input type="file" value={formData.product_image_filename} onChange={e => onFileChange(e)} className="form-control" placeholder="Product Image" />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Description:</label>
                                    <div className="col-sm-8">
                                       <textarea name="product_description" onChange={e => onChange(e)} className="form-control" placeholder="Enter Full Description" required value={formData.product_description}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                                 <input type="hidden" value={formData.product_image_filename} className="form-control" id="product_image_filename" name="product_image_filename" />
                              </form>
                           </div>
                           {id ? (
                           <div className='lefta mar100'>
                           <img src={"http://127.0.0.1:3000/uploads/"+formData.product_image} className='productImage'/>
                           </div>
                           ) : (
                              ''
                            )}
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   );
};

ProductAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   product: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(ProductAdd);