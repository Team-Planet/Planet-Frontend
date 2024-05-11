import axios from "axios";

const baseUrl = "http://localhost:5000";

const userApi = {
    signIn: async function(email, password) {
        try {
            const url = `${baseUrl}/users/signin`;
            const response = await axios.post(url, {
                email,
                password
            });
    
            return response;
        } catch(e) {
            console.error(e);
            return null;
        }
    }
}

export default userApi;