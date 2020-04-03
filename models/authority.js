"use strict";

module.exports = function(sequelize, DataTypes) {
  var Authority = sequelize.define("Authority", {
    right: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Authority.findAll({}, {raw: true}).then(onSuccess, onError); 
      },
      retrieveById: function(authority_id, onSuccess, onError) {
        Authority.find({where: {id: authority_id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByRight: function(right, onSuccess, onError) {
        Authority.find({where: {right: right}}, {raw: true}).then(onSuccess, onError);
      },
      createRight: function(right, onSuccess, onError) {
        Authority.findOrCreate({where: {right: right}}).then(onSuccess, onError); 
      }
    }, 
    classMethods: {
      associate: function(models) {
        Authority.hasOne(models.Account);
      }
    }
  });
  
  return Authority;
};