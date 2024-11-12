import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});


// get method
export const getpost = () => {
    return api.get("/posts");
};

// delete method
export const deletepost =(id) => {
    return api.delete('/posts/${id}');
};
// post method
export const postdata =(post) => {
    return api.post("/posts/", post);
};