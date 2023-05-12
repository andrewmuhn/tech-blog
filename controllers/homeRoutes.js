const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll();
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    console.log(blogPosts);
    res.status(200).json(blogPosts);
    // res.render('homepage', {
    //   blogPosts,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'],
        },
      ],
    });
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    res.status(200).json(blogPosts);
    // res.render('dashboard', {
    //   blogPosts,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/newPost', withAuth, async (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in,
  });
});

router.get('/post/:id', async (req, res) => {
  res.status(204);
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    const blogPost = blogPostData.get({ plain: true });
    res.status(200).json(blogPost);
    // res.render('post', {
    //   blogPost,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signUp', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('sign-up');
});

module.exports = router;
