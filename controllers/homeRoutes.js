const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { 
          model: User,
          attributes: ['username']
        }
      ],
    });

    const posts = postData.map((post) => post.get({
      plain: true
    }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User]
        }
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Oh no! No post was found with that ID.' });
      return;
    }
    const post = postData.get({
      plain: true
    });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });

    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const dashboard = userData.get({
      plain: true
    });

    res.render('dashboard', {
      ...dashboard,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User]
        }
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Oh no! No post was found with that ID.' });
      return;
    }
    const edit = postData.get({
      plain: true
    });

    res.render('edit', {
      ...edit,
      logged_in: req.session.logged_in
    });

    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signUp');
});

module.exports = router;
