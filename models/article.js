"use strict";

module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    link_type: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    serverId: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Article.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(article_id, onSuccess, onError) {
        Article.find({where: {id: article_id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByServerId: function(article_id, onSuccess, onError) {
        Article.find({where: {serverId: serverId}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        Article.build({ link_type: this.link_type, name: this.name, available: this.available, image: this.image, type: this.type, description: this.description, price: this.price, CategoryId: this.CategoryId}).save().then(onSuccess, onError);
      },
      updateById: function(article_id, onSuccess, onError) {
        Article.update({ link_type: this.link_type, name: this.name, available: this.available, image: this.image, type: this.type, description: this.description, price: price, CategoryId: this.CategoryId},{where: {id: article_id} }).then(onSuccess, onError);
      },
      removeById: function(article_id, onSuccess, onError) {
        Article.destroy({where: {id: article_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.Category, {}); 
      }
    }
  });

  return Article;
};