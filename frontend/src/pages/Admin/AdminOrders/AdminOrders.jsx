import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OrderAPI } from '../../../api/order-api';
import CartList from '../../../components/User/CartList/CartList';
import AdminOrderItem from '../../../components/Admin/AdminOrderItem/AdminOrderItem';
import s from "./style.module.css";
import AdminNotConnect from '../../../components/Admin/AdminNotConnect/AdminNotConnect';
import { setConnect, setToken } from '../../../store/admin-slice';

const AdminOrders = () => {
  const isConnect = useSelector(store => store.ADMIN.isConnect)
  const [orderList, setOrderList] = useState([])
  const [pastOrderList, setPastOrderList] = useState([])
  const [actualOrderList, setActualOrderList] = useState([])
  const [showActual,setShowActual] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    async function getAllOrders() {
      const orders = await OrderAPI.getAll();
      const actualList = orders.filter(order => order.status === 0)
      const pastList = orders.filter(order => order.status === 1)
      setOrderList(orders)
      setPastOrderList(pastList)
      setActualOrderList(actualList)
    }
    getAllOrders()
    // Démarrez l'intervalle de requête régulière
    const interval = setInterval(getAllOrders, 2000)
    // Nettoyez l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const data = localStorage.getItem('admin')
    const parseData = JSON.parse(data)
    if(parseData) {
      dispatch(setConnect(parseData.isConnect))
      dispatch(setToken({token:parseData.token}))
    }
    }, []);

    function archiveAllHandler() {
      const confirmed = window.confirm('Êtes-vous sûr de vouloir archiver toutes les commandes ?');
      if (confirmed) {
        actualOrderList.map((order) => {
          OrderAPI.update(order._id, {...order, status: 1})
        });
        setActualOrderList([]);
      }
    }
    

  function deleteAllHandler() {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer toutes les commandes ?');
    if (confirmed) {
      pastOrderList.map((pastOrder) => {
        OrderAPI.delete(pastOrder._id)
          .then((resp) => {
            const updatedOrderList = orderList.filter(
                order => order._id !== pastOrder._id
            );
            setOrderList(updatedOrderList);
            })
          .catch(error => {
              console.log('Error archiving order:', error);
          });
      })
      setPastOrderList([]);
    }
  };
    
  if(isConnect && actualOrderList) {
    return (
      <div
        style={{
          position: "relative"
        }}>
          
          {showActual?
            (<>
              <h2 className={s.title}>
                Les commandes ({actualOrderList.length})
              </h2>
              <div className={s.btnContainer}>
                <button
                  onClick={archiveAllHandler}
                  className={s.btnAll}
                >
                  
                  Tout archiver
                </button>
                <button 
                  onClick={() => setShowActual(false)}
                  className={s.btnSee}
                >
                  Voir l'historique
                </button>
              </div>
              {actualOrderList.length === 0 ? 
                (<div className={s.emptyContainer}>
                  Il n'y a pas de commande.
                </div>)
                :
                (
                  <>
                    {actualOrderList.map((order) => (
                      <AdminOrderItem key={order._id} isActual={showActual} order={order} orderList={orderList} setOrderList={setOrderList} setActualOrderList={setActualOrderList} actualOrderList={actualOrderList}/>
                    ))}
                  </>
                )
              }
            </>)
            :
            (<>
              <h2 className={s.title}>
                L'historique des commandes ({pastOrderList.length})
              </h2>
              <div className={s.btnContainer}>
                <button
                  onClick={deleteAllHandler}
                  className={s.btnAll}
                >
                  Tout supprimer
                </button>
                <button 
                  onClick={() => setShowActual(true)}
                  className={s.btnSee}
                >
                  Retour aux commandes
                </button>
              </div>
              {pastOrderList.length === 0 ?
                (<div className={s.emptyContainer}>
                  Il n'y a pas de commande.
                </div>)
                :
                (<>
                  {pastOrderList.reverse().map((order) => (
                    <AdminOrderItem key={order._id} isActual={showActual} order={order} orderList={orderList} setOrderList={setOrderList} setActualOrderList={setActualOrderList} actualOrderList={actualOrderList} pastOrderList={pastOrderList} setPastOrderList={setPastOrderList}/>
                  ))}
                </>)
              }
            </>)
          }
          
      </div>
    )
  }
  
  else {
    return(
      <div>
        <AdminNotConnect/>
      </div>
    )
  }
}


export default AdminOrders