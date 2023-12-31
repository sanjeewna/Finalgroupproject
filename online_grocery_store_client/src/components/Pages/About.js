
import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import  PropTypes  from 'prop-types';


const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Navigate to ='/Dashboard'/> 
    }
return (
<section id="content">
   <div className="container">
      <div className="about">
         <section className="features">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>About Online Grocery Store</h2>
                           <p>  Online grocery shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app. Consumers find a product of interest by visiting the website of the retailer directly or by searching among alternative vendors using a shopping search engine, which displays the same product's availability and pricing at different e-retailers. As of 2020, users can shop online using a range of different computers and devices, including desktop computers, laptops, tablet computers and smartphones.An online shop evokes the physical analogy of buying products or services at a regular "bricks-and-mortar" retailer or shopping center; the process is called business-to-consumer (B2C) online shopping. When an online store is set up to enable businesses to buy from another businesses, the process is called business-to-business (B2B) online shopping. A typical online store enables the user to browse the firm's range of products and services, view photos or images of the products, along with information about the product specifications, features and prices.</p>
                           <p>Ever since its inception, thepackersmovers.com has stood by the people to help them find a good and reliable moving company for their moves right within their budget. This website is no less than an interface where people and moving companies can connect with each other and get a good deal at cost-effective prices on the foundation of trust. The movers and packers companies listed here offer a customized range of relocation services for the safe movement of household and corporate goods.</p>
                    </div>
                     <br/>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="features-item">
                        <div className="features">
                           <div className="icon">
                              <i className="icon-map icons"></i>
                           </div>
                           <div className="features-content">
                              <h3>Online Grocery Store</h3>
                              <p>Online shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app</p>
                           </div>
                        </div>
                        <div className="features">
                           <div className="icon">
                              <i className="icon-envelope-open icons"></i>
                           </div>
                           <div className="features-content">
                              <h3>User Registeration Ssystem</h3>
                              <p>Online medicine shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app</p>
                           </div>
                        </div>
                        <div className="features">
                           <div className="icon">
                              <i className="icon-badge icons"></i>
                           </div>
                           <div className="features-content">
                              <h3>Online Payment System</h3>
                              <p>Online shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <img className="img-responsive" src="img/home.jpeg" alt="" style={{height:350}}/>
                  </div>
               </div>
            </div>
         </section>
      </div>
   </div>
</section>
)
}
Landing.propTypes={
isAuthenticated:PropTypes.bool
}
const mapStateToProps =state=>
 ({
isAuthenticated:state.auth.isAuthenticated
 })

export default connect(mapStateToProps)(Landing);
