"use strict";

module.exports = function(sequelize, DataTypes) {
  var News = sequelize.define("News", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        News.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(news_id, onSuccess, onError) {
        News.find({where: {id: news_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        var title = this.title;
        var description = this.description;
        var content = this.content;
        var image = this.image;
        var AccountId = this.AccountId;
        var author = this.author;
        News.build({ title: title, description: description, content: content, image: image, author: author, modifiedBy: null, AccountId: AccountId}).save({raw: true}).then(onSuccess, onError);
      },
      updateById: function(news_id, onSuccess, onError) {
        var id = news_id;
        var title = this.title;
        var description = this.description;
        var content = this.content;
        var image = this.image;
        var modifiedBy = this.modifiedBy;   
        News.update({ title: title, description: description, content: content, image: image, modifiedBy: modifiedBy},{where: {id: id} }).then(onSuccess, onError);
      },
      removeById: function(news_id, onSuccess, onError) {
        News.destroy({where: {id: news_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        News.belongsTo(models.Account, {});
        News.hasMany(models.Comment, {});
      }
    }
  });

  return News;
};