const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', async (req, res) => {
try {
    const commentData = await Comment.findAll({
      include: [{ model: User, attributes: ['username']}],
    });
    res.status(200).json(commentData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comment by ID
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
          include: [{ model: User, attributes: ['username']}],
        });
        if (!commentData) {
            res.status(404).json({ message: 'Oh no! No post was found with that ID.' });
            return;
        }
        res.status(200).json(commentData)
    } catch (err) {
    res.status(500).json(err);
    }
});

// post comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
        res.status(404).json({ message: "Sorry, that comment could not be found." });
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
