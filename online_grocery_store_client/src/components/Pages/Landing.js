
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import config from '../../utils/config';



const Landing = () => {
   const [categories, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/category`)
      .then(res => {
         const categories = res.data;
         setData(categories);
         setFilteredData(categories);
         console.log(categories);
      })
   }, []);


   return (
      <section>
         <div className="home-page">
            <section id="banner">
               <div id="main-slider" className="flexslider">
                  <ul className="slides">
                     <li>
                        <img src="img/slides/1.jpeg" alt="flexslider" style={{ height: 400 }} />
                        <div className="flex-caption">
                           {/* <h3>Online Shopping System</h3>
                           <p>One stop solution for managing all blood banks and invetories</p> */}
                        </div>
                     </li>
                     <li>
                        <img src="img/slides/2.jpeg" alt="flexslider" style={{ height: 400 }} />
                        <div className="flex-caption">

                        </div>
                     </li>
                  </ul>
               </div>
            </section>
            <section className="jumbobox">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-12 leftclass">
                        <div>
                        <h4 className="myhead"><strong>Online Grocery Store</strong></h4>
                           <p>Online Grocery Store is one of the India’s leading reputed online moving companies booking platforms that started its journey in 2006 with an objective to make the search for dependable packers and movers in India a hassle-free one for the people. This website is a resourceful online database where people can find a list of packer and mover service providers available in Mumbai, Delhi NCR, Bangalore, Hyderabad, and other big and small cities.</p>
                           <p>Ever since its inception, thepackersmovers.com has stood by the people to help them find a good and reliable moving company for their moves right within their budget. This website is no less than an interface where people and moving companies can connect with each other and get a good deal at cost-effective prices on the foundation of trust. The movers and packers companies listed here offer a customized range of relocation services for the safe movement of household and corporate goods.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         
            <section>
            <div className="container py-5">
               <div className="row cat_listing">
               {
                     filteredData
                        .map(category =>
                           <div class="col-md-6 col-lg-2">
                           <div class="single_service">
                               <div class="thumb">
                                 <img className="pic-home" src={"http://127.0.0.1:3000/uploads/"+category.category_image} />
                               </div>
                               <div class="service_info">
                                   <h3><Link to={"/products/"+category._id}>{category.category_title}</Link></h3>
                               </div>
                           </div>
                       </div>
                    )
                  }
               </div>
            </div>
            </section>
            
            <section className="aboutUs">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6"><img src="img/home.jpeg" className="img-center" alt="" /></div>
                     <div className="col-md-6">
                        <div>
                           <h2>About Online Grocery Store</h2>
                           <p>Online Grocery Store is one of the India’s leading reputed online moving companies booking platforms that started its journey in 2006 with an objective to make the search for dependable packers and movers in India a hassle-free one for the people. This website is a resourceful online database where people can find a list of packer and mover service providers available in Mumbai, Delhi NCR, Bangalore, Hyderabad, and other big and small cities.</p>
                           <p>Ever since its inception, thepackersmovers.com has stood by the people to help them find a good and reliable moving company for their moves right within their budget. This website is no less than an interface where people and moving companies can connect.</p>
                        </div>
                        <br />
                     </div>
                  </div>
               </div>
            </section>
         </div>
         <a href="#" className="scrollup"><i className="fa fa-angle-up active"></i></a>
      </section>
   )
}

export default Landing;