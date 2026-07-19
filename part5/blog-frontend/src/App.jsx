import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blog';
import login from './services/auth';
import './index.css';
import Notification from './components/Notification';
import BlogForm from './components/Blog-Form';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formActive, setFormActive] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  useEffect(() => {
    const loggedUser = localStorage.getItem('User');

    if (loggedUser) {
      try {
        const user = JSON.parse(loggedUser);

        setUser(user);
        setLoggedIn(true);
        blogService.setToken(user.token);
      } catch (err) {
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
      }
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [loggedIn]);

  const createNewBlog = async (e) => {
    e.preventDefault();
    try {
      if (!newBlog.title || !newBlog.author || !newBlog.url) {
        throw new Error('All fields required!');
      }
      const blog = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: 0,
        user: user.userId,
      };

      const create = await blogService.createBlog(blog);
      setBlogs(blogs.concat(blog));
      setNotification({
        message: `A New Blog: ${newBlog.title} by ${newBlog.author} added!`,
        type: 'success',
      });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 4000);
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
    } catch (error) {
      console.log('ERROR MESSAGE', error);
      setNotification({
        message: error.response?.data?.error || error.message,
        type: 'error',
      });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 4000);
    }
  };

  const updateLikes = async (e, blog) => {
    e.preventDefault();

    const updatedBlog = await blogService.updateLikes(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });

    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === blog.id ? updatedBlog : b)),
    );
  };

  const removeBlog = async (id) => {
    await blogService
      .removeBlog(id)
      .then((res) => console.log('remove frontend', res))
      .catch((error) => console.log('error frontend', error));

    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;

    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginService = async (e) => {
    e.preventDefault();

    try {
      const userLogin = await login(userInfo.username, userInfo.password);
      console.log(userLogin);
      if (userLogin) {
        setNotification({
          message: 'Welcome to your account',
          type: 'success',
        });
        setTimeout(() => {
          setNotification({ message: '', type: '' });
        }, 4000);
        setUser(userLogin);
        blogService.setToken(userLogin.token);
        localStorage.setItem('Token', userLogin.token);
        localStorage.setItem('User', JSON.stringify(userLogin));
        setLoggedIn(true);
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.error || error.message,
        type: 'error',
      });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 4000);
    }
  };

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    setUser(null);
    setLoggedIn(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!localStorage.getItem('Token') && !loggedIn) {
    return (
      <>
        <h1>Log in to application</h1>
        {notification && <Notification note={notification} />}

        <form action='submit' className='form' onSubmit={loginService}>
          <input
            type='text'
            id='username'
            className='input'
            name='username'
            placeholder='Username'
            onChange={handleChange}
            value={userInfo.username}
          />

          <input
            type='password'
            id='password'
            className='input'
            name='password'
            onChange={handleChange}
            placeholder='Password'
          />
          <button type='submit' className='button'>
            Submit
          </button>
        </form>
      </>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        {notification && <Notification note={notification} />}
        <p>{user?.name || user?.username} logged in</p>
        <button onClick={logout} className='logout'>
          logout
        </button>

        {formActive ? (
          <BlogForm
            handleBlogChange={handleBlogChange}
            newBlog={newBlog}
            createNewBlog={createNewBlog}
          />
        ) : (
          <button onClick={() => setFormActive(true)} className='button'>
            Create new Blog
          </button>
        )}

        {blogs.map((blog) => (
          <>
            <div className='blogs'>
              <Blog
                key={blog.id}
                blog={blog}
                removeBlog={removeBlog}
                updateLikes={updateLikes}
              />
            </div>
          </>
        ))}
      </div>
    );
  }
};

export default App;
