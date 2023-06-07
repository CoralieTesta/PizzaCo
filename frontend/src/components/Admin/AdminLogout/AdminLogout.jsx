import { BsBoxArrowRight } from "react-icons/bs"
import s from "./style.module.css"
import { useDispatch } from "react-redux";
import { setNotConnect } from "../../../store/admin-slice";

export function AdminLogout() {
    const dispatch = useDispatch()
    function logoutHandler() {
        dispatch(setNotConnect());
        localStorage.removeItem('admin');
        window.location.reload(false);
    }

    return(
        <div className={s.container}>
            <div onClick={logoutHandler} className={s.logout}>
                Déconnexion <div className={s.logoutIcon}><BsBoxArrowRight size={35}/></div>
            </div>
        </div>
    )
}