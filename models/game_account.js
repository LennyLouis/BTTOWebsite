"use strict";

module.exports = function(sequelize, DataTypes) {
  var Game_account = sequelize.define("Game_account", {
    game_id: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Game_account.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(id, onSuccess, onError) {
        Game_account.find({where: {id: id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByUsername: function(name, onSuccess, onError) {
        Game_account.find({where: {username: username}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByAccountId: function(AccountId, onSuccess, onError) {
        Game_account.findAll({where: {AccountId: AccountId}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        console.log(this.username);
        Game_account.build({ game_id: this.game_id, username: this.username, AccountId: this.AccountId, GameId: this.GameId}).save().then(onSuccess, onError);
      },
      deleteById: function(id, onSuccess, onError) {
        Game_account.destroy({where: {id: id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Game_account.belongsTo(models.Account, {});
      }
    }
  });

  return Game_account;
};