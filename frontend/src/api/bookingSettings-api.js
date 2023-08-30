import axios from "axios"
const BASE_URL = "http://localhost:3000/api/bookingSettings"//"https://pizzaco.onrender.com/api/bookingSettings"

export class BookingSettingsAPI {
    static async getLunch() {
        const response = await axios.get(`${BASE_URL}/getLunch`)
        return (
            response.data
        )
    }

    static async getDiner() {
        const response = await axios.get(`${BASE_URL}/getDiner`)
        console.log("here")
        return (
            response.data
        )
    }

    static async update(_id, newData) {
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newData)
        return (
            response.data
        )
    }
}