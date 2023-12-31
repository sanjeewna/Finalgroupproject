import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import config from '../../utils/config';
import axios, { post } from 'axios';


const CategoryAdd = ({ setAlert, category, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();
   let { url } = `${config.api_url}/category`;

    // Creating FormData Form elements ////
    const [formData, setFormData] = useState({
      category_title: '',
      category_image: '',
      category_description: ''
   });

   const [selectedFile, setSelectedFile] = useState();
   
   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/category/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData({
                  'category_title':res.data.category_title,
                  "category_description":res.data.category_description,
                  "category_image_temp":res.data.category_image,
               });
            })
      }
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
         fileData.append('category_image', selectedFile, selectedFile.name);
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
               url: `${config.api_url}/category/${id}`,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/category-report")
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
               url: `${config.api_url}/category`,
               data: fileData
            })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/category-report")
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
                     <h2 className="pageTitle">Category Registration</h2>
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
                                 <h2 className='h2c'>Category Entry Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc lefta">
                              <form className="form-horizontal" onSubmit={onSubmit}>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Enter Category Name:</label>
                                    <div className="col-sm-8">
                                       <input type="text" value={formData.category_title} onChange={e => onChange(e)} name="category_title" className="form-control" placeholder="Enter Category Name" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Category Image:</label>
                                    <div className="col-sm-8">
                                       <input type="file" value={formData.category_image} onChange={e => onFileChange(e)} className="form-control" placeholder="Category Image" />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Description:</label>
                                    <div className="col-sm-8">
                                       <textarea name="category_description" onChange={e => onChange(e)} className="form-control" placeholder="Enter Full Description" required value={formData.category_description}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                                 <input type="hidden" value={formData.category_image} class="form-control" id="category_image" name="category_image" />
                              </form>
                           </div>
                           {id ? (
                           <div className='lefta mar100'>
                           <img src={"http://127.0.0.1:3000/uploads/"+formData.category_image_temp} className='productImage'/>
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

CategoryAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   category: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(CategoryAdd);