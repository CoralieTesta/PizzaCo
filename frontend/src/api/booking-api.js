import axios from "axios"
const BASE_URL = "http://localhost:3000/api/booking"//"https://pizzaco.onrender.com/api/booking"

export class BookingAPI {
    static async create(data) {
        console.log("here")
        const response = await axios.post(`${BASE_URL}/create`, data)
        return(
            response.data
        )
    }
    static async getAll() {
        const response = await axios.get(`${BASE_URL}/all`)
        console.log("api")
        return (
            response.data
        )
    }
    static async delete(_id) {
        const response = await axios.delete(
            `${BASE_URL}/delete/${_id}`)
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