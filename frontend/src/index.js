import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store"
import { PageNotFound } from './pages/User/PageNotFound/PageNotFound';
import Home from './pages/User/Home/Home';
import Cart from './pages/User/Cart/Cart';
import Pizzas from './pages/User/Pizzas/Pizzas';
import Pizza from './pages/User/Pizza/Pizza';
import Pasta from './pages/User/Pasta/Pasta';
import Dessert from './pages/User/Dessert/Dessert';
import Desserts from './pages/User/Desserts/Desserts';
import Pastas from './pages/User/Pastas/Pastas';
import Contact from './pages/User/Contact/Contact';
import OrderPage from './pages/User/OrderPage/OrderPage';
import AdminLog from './pages/Admin/AdminLog/AdminLog';
import AdminPizzas from './pages/Admin/AdminPizzas/AdminPizzas';
import AdminPasta from './pages/Admin/AdminPasta/AdminPasta';
import AdminOrders from './pages/Admin/AdminOrders/AdminOrders';
import AdminDesserts from './pages/Admin/AdminDesserts/AdminDesserts';
import Booking from './pages/User/Booking/Booking';
import AdminBookingsPage from './pages/Admin/AdminBookingsPage/AdminBookingsPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/pizza/:_id' element={<Pizza/>}/>
          <Route path='/pizzas' element={<Pizzas/>}/>
          <Route path='/pates' element={<Pastas/>}/>
          <Route path='/pates/:_id' element={<Pasta/>}/>
          <Route path='/desserts' element={<Desserts/>}/>
          <Route path='/dessert/:_id' element={<Dessert/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path='/order/:_id' element={<OrderPage/>}/>
          <Route path='/adminLog' element={<AdminLog/>}/>
          <Route path='/adminPizzas' element={<AdminPizzas/>}/>
          <Route path='/adminPasta' element={<AdminPasta/>}/>
          <Route path='/adminOrders' element={<AdminOrders/>}/>
          <Route path='/adminDesserts' element={<AdminDesserts/>}/>
          <Route path='/adminBookings' element={<AdminBookingsPage/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
