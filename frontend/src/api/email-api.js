import axios from "axios"
const BASE_URL = "http://localhost:3000/api/email"//"https://pizzaco.onrender.com/api/dessert"

export class EmailAPI {
    static async sendBookingEmail(data) {
        const response = await axios.post(`${BASE_URL}/sendBookingEmail`,data)
        return(
            response.data
        )
    }

    static async sendBookingConfirmation(data) {
        const response = await axios.post(`${BASE_URL}/sendBookingConfirmation`,data)
        return(
            response.data
        )
    }

    static async sendBookingRefusal(data) {
        const response = await axios.post(`${BASE_URL}/sendBookingRefusal`, data)
        console.log("here")
        return(
            response.data
        )
    }
}