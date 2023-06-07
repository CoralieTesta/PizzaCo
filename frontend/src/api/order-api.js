import axios from 'axios';
const BASE_URL = "https://pizzaco.onrender.com/api/order"

export class OrderAPI {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}/allOrders`)
        return (
            response.data
        )
    }

    static async create(order) {
            return (
                await axios.post(`${BASE_URL}/create`, order)
                .catch(function(error) {
                    if (error.response) {
                        console.log("error status",error.response.status);
                        return false
                    }
                }
                )
            )
    }

    static async getById(_id) {
        const response = await axios.get(`${BASE_URL}/order/${_id}`)
        return (
            response.data
        )
    }

    static async update(_id, newOrder) {
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newOrder)
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
}