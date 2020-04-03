"use strict";

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Game.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(game_id, onSuccess, onError) {
        Game.find({where: {id: game_id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByName: function(name, onSuccess, onError) {
        Game.find({where: {name: name}}, {raw: true}).then(onSuccess, onError);
      },
      createGame: function(name, onSuccess, onError) {
        Game.build().retrieveByName(name, function(game){
          if(!game){
            Game.build({ name: name}).save().then(onSuccess, onError);
          }
        }, function(err){
          console.log(err);
        });
      },
      add: function(onSuccess, onError) {
        var name = this.name;
        Game.build({ name: this.name}).save().then(onSuccess, onError);
      }
    },
    classMethods: {
      associate: function(models) {
        Game.hasMany(models.Game_account, {});
      }
    }
  });

  return Game;
};