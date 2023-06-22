import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

const AuthService = {
  register: async (email, password) => {
    try {
      await axios.post(`${API_URL}/register`, { email, password });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  login: async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

export default AuthService;
