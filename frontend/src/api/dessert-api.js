import axios from "axios"
const BASE_URL = "http://localhost:3000/api/dessert"//"https://pizzaco.onrender.com/api/dessert"

export class DessertAPI {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}/allDesserts`)
        return (
            response.data
        )
    }

    static async getById(_id) {
        const response = await axios.get(`${BASE_URL}/dessert/${_id}`)
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

    static async create(dessert) {
        const response = await axios.post(`${BASE_URL}/create`, dessert)
        return(
            response.data
        )
    }

    static async update(_id, newDessert) {
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newDessert)
        return (
            response.data
        )
    }

    static async sendEmail() {
        const response = await axios.post(`${BASE_URL}/sendEmail`)
        return(
            response.data
        )
    }
}