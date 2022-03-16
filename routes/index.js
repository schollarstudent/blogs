const {Comment,Reply} = require('../models');
var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController');

router.get('/',function(req){
  res.redirect('/article');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get ('/article/add',articleController.renderAddForm);
router.post('/articles/add,',articleController.addArticle);
router.get('/article/:articleId/edit',articleController.renderEditForm);
router.post('/article/:articleId/edit',articleController.updateArticle);
router.get('/articles/:articleId/delete',articleController.deleteArticle);

router.post('/comment/:commentId/reply/create',commentController.addReply);
router.post('/article/:articleId/comment/create',commentController.createComment);
router.get('/article/:articleId',articleController.displayArticle);
module.exports = router;
