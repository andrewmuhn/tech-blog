const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.route('/:id').get(withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    const blogPost = blogPostData.get({ plain: true });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// .update(withAuth, async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })
// .delete(withAuth, async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
