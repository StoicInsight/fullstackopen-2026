const { test, after } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./list_helpter');
const app = require('../app');
const assert = require('node:assert');
const blog = require('../models/blog');

const api = supertest(app);

// 4.8: Blog List Tests, step 1
// Verify that the blog list application returns the correct amount of blog posts in the JSON format.
test('Blog returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Verify UID is ID', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((item) => {
    assert.ok(item.id);
    assert.strictEqual(item._id, undefined);
  });
});

test('Post', async () => {
  const initialBlog = await api.get('/api/blogs');
  const newBlog = {
    title: 'Pierrre',
    author: 'Pierre',
    url: 'Pierre.com',
    likes: 32,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.author);

  assert.strictEqual(response.body.length, initialBlog.body.length + 1);
});

after(async () => await mongoose.connection.close());
// Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

// Notice that you will have to make similar changes to the code that were made in the material, like defining the test environment so that you can write tests that use separate databases.

// NB: when you are writing your tests it is better to not execute them all, only execute the ones you are working on. Read more about this here.

// 4.9: Blog List Tests, step 2
// Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id.

// Make the required changes to the code so that it passes the test. The toJSON method discussed in part 3 is an appropriate place for defining the id parameter.

// 4.10: Blog List Tests, step 3
// Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

// Once the test is finished, refactor the operation to use async/await instead of promises.
