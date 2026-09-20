import axios from "axios";

const API = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "/api/v1/users",

    headers: {
        "Content-Type": "application/json",
    },
});

const toBackendStudent = (studentData) => ({
    fullName: studentData.fullName || studentData.name,
    age: studentData.age,
    course: studentData.course,
    email: studentData.email,
    city: studentData.city,
});

const unwrapResponse = (response) => response.data?.data ?? response.data;

// GET all students
export const getStudents = async () => {
    const response = await API.get("/Get");
    return unwrapResponse(response);
};

// ADD student
export const addStudent = async (studentData) => {
    const response = await API.post("/register", toBackendStudent(studentData));
    return unwrapResponse(response);
};

// UPDATE student
export const updateStudent = async (id, studentData) => {
    const payload = { id, ...toBackendStudent(studentData) };
    const response = await API.put(`/Update?id=${id}`, payload);
    return unwrapResponse(response);
};

// DELETE student
export const deleteStudent = async (id) => {
    const response = await API.delete(`/remove?id=${id}`);
    return unwrapResponse(response);
};

export default API;
