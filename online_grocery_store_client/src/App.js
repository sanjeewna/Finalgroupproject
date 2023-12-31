import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Layout/Alert'
import Header from './components/Layout/Header';

import './App.css';
import About from './components/Pages/About';
import Landing from './components/Pages/Landing';
import Login from './components/auth/login';
import Adminlogin from './components/auth/Adminlogin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { loaduser } from './actions/auth';
import setauthtoken from './utils/setauthtoken';
import Footer from './components/Layout/Footer';
import Dashboard from './components/auth/Dashboard';
import UserReport from './components/User/UserReport'
import UserLogin from './components/User/UserLogin'
import UserAdd from './components/User/UserAdd';
import OrderReport from './components/Order/OrderReport'
import OrderDetails from './components/Order/OrderDetails';
import FeedbackReport from './components/Feedback/FeedbackReport'
import FeedbackAdd from './components/Feedback/FeedbackAdd';
import FeedbackList from './components/Feedback/FeedbackList';
import FeedbackDetails from './components/Feedback/FeedbackDetails';
import ProductCart from './components/Product/ProductCart';
import ProductList from './components/Product/ProductList';
import ProductDetails from './components/Product/ProductDetails';
import ProductCartPayment from './components/Product/ProductCartPayment';
import CategoryList from './components/Category/CategoryList';
import ProductReport from './components/Product/ProductReport';
import CategoryReport from './components/Category/CategoryReport';
import CategoryAdd from './components/Category/CategoryAdd';
import ProductAdd from './components/Product/ProductAdd';
import OrderEdit from './components/Order/OrderEdit';


if (localStorage.token) {
  setauthtoken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Alert />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Adminlogin' element={<Adminlogin />} />
            <Route path='/About' element={<About />} />

            <Route path='/order-edit/:id' element={<OrderEdit />} />
            <Route path='/order-report' element={<OrderReport />} />
            <Route path='/order-details/:id' element={<OrderDetails />} />

            <Route path='/product-add' element={<ProductAdd />} />
            <Route path='/product-add/:id' element={<ProductAdd />} />
            <Route path='/payment' element={<ProductCartPayment />} />
            <Route path='/product-cart' element={<ProductCart />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/product-report' element={<ProductReport />} />
            <Route path='/products/:id' element={<ProductList />} />


            <Route path='/category-add' element={<CategoryAdd />} />
            <Route path='/category-add/:id' element={<CategoryAdd />} />
            <Route path='/category-list' element={<CategoryList />} />
            <Route path='/category-report' element={<CategoryReport />} />

            <Route path='/register' element={<UserAdd />} />
            <Route path='/user-report/:id' element={<UserReport />} />
            <Route path='/user-add/:id' element={<UserAdd />} />
            <Route path='/user-add' element={<UserAdd />} />
            <Route path="/UserLogin" element={<UserLogin />} />

            <Route path='/feedback-report' element={<FeedbackReport />} />
            <Route path='/feedback' element={<FeedbackAdd />} />
            <Route path='/feedback-list' element={<FeedbackList />} />
            <Route path='/feedback-details/:id' element={<FeedbackDetails />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>

  );
}
export default App;
