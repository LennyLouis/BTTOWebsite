"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    author: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveByNewsId: function(news_id, onSuccess, onError) {
        Comment.findAll({where: {NewsId: news_id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(comment_id, onSuccess, onError) {
        Comment.find({where: {id: comment_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        var content = this.content;
        var NewsId = this.NewsId;
        var author = this.author;
        Comment.build({author: author, content: content, NewsId: NewsId}).save().then(onSuccess, onError);
      },
      updateById: function(comment_id, onSuccess, onError) {
        var id = comment_id;
        var author = this.author;
        var content = this.content;   
        Comment.update({ author: author, content: content},{where: {id: id} }).then(onSuccess, onError);
      },
      removeById: function(comment_id, onSuccess, onError) {
        Comment.destroy({where: {id: comment_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.News, {
          onDelete: "CASCADE"
        });
      }
    }
  });

  return Comment;
};