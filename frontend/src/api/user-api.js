import axios from "axios"
const BASE_URL = "https://pizzaco.onrender.com/api/auth"//"http://localhost:3000/api/auth"


export class UserAPI{
    static async connect(user) {
        return (
            await axios.post(`${BASE_URL}/login`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error, error.response.status);
                    return false
                }
            }
        ))
    }
}
