import axios from "axios";

const API_URL = 'http://localhost:5000';


const createPost = async(post, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const request = await axios.post(API_URL + '/newPost', post, config);
    return request.data;
}

const postService = {
    createPost
};

export default postService;