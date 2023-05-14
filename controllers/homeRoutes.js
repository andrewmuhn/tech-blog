const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
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
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: BlogPost,
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/new-post', withAuth, async (req, res) => {
  res.render('newBlogPost', {
    logged_in: req.session.logged_in,
  });
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    const blogPost = blogPostData.get({ plain: true });
    res.render('editPost', {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/view-post/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: { exclude: ['password'] },
          },
        },
      ],
    });
    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost.comments);
    res.render('viewPost', {
      blogPost,
      logged_in: req.session.logged_in,
    });
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

router.get('/sign-up', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signUp');
});

module.exports = router;
