import s from "./style.module.css"
import { BsTelephone } from "react-icons/bs"
import { GrMailOption } from "react-icons/gr"
import { HiOutlineBuildingOffice } from "react-icons/hi2"
import { ContactBox } from "../ContactBox/ContactBox";
import { AiOutlineClockCircle } from "react-icons/ai";



export function ContactBoxList() {
    const phoneNumber = '+32493484292'
    const email = 'pizzaCo@gmail.com'
    const address = '123 Rue de la Pizza 4000 Liège'
    function callHandler() {
        window.location.href = `tel:${phoneNumber}`;
    }
    function sendMailHandler() {
        window.open(`mailto:${email}`)
    }

    function sendMapHandler() {
        window.open("https://maps.google.com?q="+50.629812996221375+","+5.564986453890931);
    }
    return(
        <div className={s.container}>
            <h1 className={`${s.title} ${s.fadeInDown}`}>Contactez-nous</h1>
            <p className={s.p}>Nous sommes ravis d'entrer en contact avec vous ! Si vous avez des questions, des commentaires ou des demandes spécifiques, n'hésitez pas à nous contacter.</p>
            <div className={s.boxesContainer}>
                <ContactBox 
                    logo={<BsTelephone size={22}/>}
                    action={callHandler} 
                    text="0493/48.42.92"
                    textButton="APPELER" 
                />
                <ContactBox 
                    logo={<GrMailOption size={22}/>}
                    action={sendMailHandler} 
                    textButton="EMAIL" 
                    text={email}
                />
                <ContactBox 
                    logo={<HiOutlineBuildingOffice size={24}/>}
                    action={sendMapHandler} 
                    text={address}
                    textButton="ITINERAIRE" 
                />
                <ContactBox
                    logo={<AiOutlineClockCircle size={24}/>}
                    text="Lundi - Vendredi, 10h00 - 22h00
                    Samedi - Dimanche, 11h - 23h00"
                    textButton="HORAIRE" 
                />
            </div>
        </div>
    )
}