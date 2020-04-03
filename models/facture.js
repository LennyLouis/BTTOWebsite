"use strict";

module.exports = function(sequelize, DataTypes) {
  var Shop = sequelize.define("Shop", {
    TYPE_LIAISON: DataTypes.STRING,
    ARTICLE_NAME: DataTypes.STRING,
    PROPOSABLE: DataTypes.STRING,
    DESCRIPTION: DataTypes.STRING,
    MONTANT_REEL: DataTypes.STRING,
    MONTANT_VIRTUEL: DataTypes.STRING,
    ARTICLE_TYPE: DataTypes.STRING,
    AUTHOR: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Shop.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(article_id, onSuccess, onError) {
        Shop.find({where: {id: article_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        var type_liaison = this.TYPE_LIAISON;
        var article_name = this.ARTICLE_NAME;
        var proposable = this.PROPOSABLE;
        var description = this.DESCRIPTION;
        var montant_reel = this.MONTANT_REEL;
        var montant_virtuel = this.MONTANT_VIRTUEL;
        var article_type = this.ARTICLE_TYPE;
        var author = this.AUTHOR;
        Shop.build({ type_liaison: type_liaison, article_name: article_name, proposable: proposable, description: description, montant_reel: montant_reel, montant_virtuel: montant_virtuel, article_type: article_type, author: author}).save().then(onSuccess, onError);
      },
      updateById: function(article_id, onSuccess, onError) {
        var type_liaison = this.TYPE_LIAISON;
        var article_name = this.ARTICLE_NAME;
        var proposable = this.PROPOSABLE;
        var description = this.DESCRIPTION;
        var montant_reel = this.MONTANT_REEL;
        var montant_virtuel = this.MONTANT_VIRTUEL;
        var article_type = this.ARTICLE_TYPE;
        var author = this.AUTHOR; 
        Shop.update({ type_liaison: type_liaison, article_name: article_name, proposable: proposable, description: description, montant_reel: montant_reel, montant_virtuel: montant_virtuel, article_type: article_type, author: author},{where: {id: id} }).then(onSuccess, onError);
      },
      removeById: function(article_id, onSuccess, onError) {
        Shop.destroy({where: {id: article_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        //Shop.belongsTo(models.Category, {}); 
      }
    }
  });

  return Shop;
};