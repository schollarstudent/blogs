const {Comment,Reply} = require('../models');
var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const ensureUserAuthenticated = require('../middleware/ensureUserAuthenticated.js');
const userHasRole = require('../middleware/userHasRoles');
router.get('/',function(req){
  res.redirect('/article');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get ('/article/add',ensureUserAuthenticated,userHasRole('author'), articleController.renderAddForm);
router.post('/articles/add,',ensureUserAuthenticated,userHasRole('author'), articleController.addArticle);
router.get('/article/:articleId/edit',ensureUserAuthenticated,userHasRole('author'), articleController.renderEditForm);
router.post('/article/:articleId/edit',ensureUserAuthenticated,userHasRole('author'), articleController.updateArticle);
router.get('/articles/:articleId/delete',ensureUserAuthenticated, articleController.deleteArticle);

router.post('/comment/:commentId/reply/create',commentController.addReply);
router.post('/article/:articleId/comment/create',commentController.createComment);
router.get('/article/:articleId',articleController.displayArticle);
router.get('/register',userController.renderRegistrationForm);
router.post('/register',userController.register);
router.get('/login',userController.renderLogin);
router.post('/login',userController.login);
router.get('/logout',userController.logout);


router.get('/comment/:commentId/delete',ensureUserAuthenticated,userHasRole('admin'), commentController.deleteComment);
router.get('/comment/:commentId/reply/:replyId/delete',ensureUserAuthenticated,userHasRole('admin'),commentController.deleteReply);
module.exports = router;
