const {Comment} = require('../models');

module.exports.createComment = async function (req,res){
    let articleId=req.params.articleId;
    await Comment.create({
        author_name:req.body.author_name,
        body:req.body.body,
        commented_on: new Date,
        articleId: articleId
    });
    res.redirect(`/article/${articleId}`);
}