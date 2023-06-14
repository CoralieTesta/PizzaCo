import axios from "axios"
const BASE_URL = "https://pizzaco.onrender.com/api/pizza" 
//"http://localhost:3000/api/pizza"
export class PizzaAPI {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}/allPizzas`)
        return (
            response.data
        )
    }

    static async getById(_id) {
        const response = await axios.get(`${BASE_URL}/pizza/${_id}`)
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

    static async create(pizza) {
        const response = await axios.post(`${BASE_URL}/create`, pizza)
        return(
            response.data
        )
    }

    static async update(_id, newPizza) {
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newPizza)
        return (
            response.data
        )
    }
}