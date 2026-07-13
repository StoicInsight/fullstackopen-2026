const blogRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

blogRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post('/api/blogs', async (request, response) => {
  const blog = request.body;

  const user = await User.findById(body.userId);

  if (!user) {
    return response.status(400).json({ error: 'UserID missing' });
  }
  const newBlog = new Blog({
    ...blog,
    user: user._id,
  });

  const savedBlog = await newBlog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put('/api/blogs/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  Blog.findById(request.body.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end();
      }

      blog.title = title;
      blog.author = author;
      blog.url = url;
      blog.likes = likes;

      return blog.save().then((updateBlog) => {
        response.json(updateBlog);
      });
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
