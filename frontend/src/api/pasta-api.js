import axios from "axios"
const BASE_URL = "https://pizzaco.onrender.com/api/pasta"//"http://localhost:3000/api/pasta"

export class PastaAPI {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}/allPastas`)
        return (
            response.data
        )
    }
    static async getById(_id) {
        const response = await axios.get(`${BASE_URL}/pasta/${_id}`)
        return (
            response.data
        )
    }

    static async create(pasta) {
        const response = await axios.post(`${BASE_URL}/create`, pasta)
        return(
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

    static async update(_id, newPasta) {
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newPasta)
        return (
            response.data
        )
    }
}