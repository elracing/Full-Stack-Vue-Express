import axios from 'axios';


const url = 'api/posts/';

class PostService{
    //get posts
    static async getPosts() {
        try {
          const res = await axios.get(url);
          const data = res.data;
          return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }));
        } catch(err) {
          return Promise.reject(err);
        }
      }

    //create posts

    static insertPost(text) {
        return axios.post(url, {
            text
        });

    }

    //delete post

    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;