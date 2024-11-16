import axios from 'axios';

const API_URL = "https://localhost:7171/api/Students";

export const fetchStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const addStudent = async (student) => {
    const response = await axios.post(API_URL, student);
    return response.data;
};

export const updateStudent = async (id, updatedStudent) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedStudent);
    return response.data;
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);  // Spremamo JWT u localStorage
    }
    return response.data;
};

export const register = async ({ username, password, firstname, lastname }) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        firstname,
        lastname
    });
    return response.data;
};
export const fetchProfile = async () => {
    const token = localStorage.getItem("token");  // Uzmi token iz localStorage

    if (!token) {
        console.error('No token found');
        return null;
    }

    try {
        const response = await axios.get("https://localhost:7171/api/Students/profile", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};