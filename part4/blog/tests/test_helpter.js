const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum = sum + blog.likes;
  });
  return sum;
};

const checkId = (blogs) => {
  let check = false;

  for (const blog in blogs) {
    if ('_id' in blogs[blog]) {
      check = true;
    }
  }

  return check;
};

module.exports = { totalLikes, dummy, checkId };
