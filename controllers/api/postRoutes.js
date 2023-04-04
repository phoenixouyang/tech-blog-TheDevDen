const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      description: req.body.description,
    }, { where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
        res.status(404).json({ message: "Sorry, that post could not be found." });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
        res.status(404).json({ message: "Sorry, that post could not be found." });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
