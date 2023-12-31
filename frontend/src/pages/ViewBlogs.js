import axios from 'axios';
import { useEffect} from 'react';
import BlogDetails from '../components/BlogDetails';
import { useBlogContext } from '../hooks/useBlogContext';
import { Link } from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext';

const ViewBlogs = () => {
    const {blogs, dispatch} = useBlogContext();
    const {state: {user}} = useAuthContext();
    useEffect(() => {
        const baseURL = process.env.REACT_APP_DEV === 'true' ? process.env.REACT_APP_API_LOCAL_URL : process.env.REACT_APP_API_URL; 
        axios.get(`${baseURL}/api/blogs`).then(response => {
            dispatch({type: 'GET_BLOGS', payload: response.data})
        }).catch(err => console.log(err));
    }, [dispatch, user]);
    
    return (
        <div className="blogs">
            {user && blogs && <Link to="/createBlog"><button className='btn'>Create Blog</button></Link>}
            {blogs && blogs.map(blog => (
                <BlogDetails key={blog._id} blog={blog}/>
            ))}
        </div>

    );
}

export default ViewBlogs;