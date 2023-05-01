const router = require('express').Router();
const { BlogPost, User, Comment } = require('../utils/auth');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll();
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

router.get('/dashboard', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          module: User,
          attributes: ['name'],
        },
      ],
    });
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;
