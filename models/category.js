"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Category.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(id, onSuccess, onError) {
        Category.find({where: {id: id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByName: function(name, onSuccess, onError) {
        Category.find({where: {name: name}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByServerId: function(server_id, onSuccess, onError) {
        Category.find({where: {ServerId: server_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        Category.build({ name: this.name, ServerId: this.ServerId}).save().then(onSuccess, onError);
      },
      deleteById: function(id, onSuccess, onError) {
        Category.destroy({where: {id: id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Category.belongsTo(models.Server, {});
      }
    }
  });

  return Category;
};