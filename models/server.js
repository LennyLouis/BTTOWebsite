"use strict";

module.exports = function(sequelize, DataTypes) {
  var Server = sequelize.define("Server", {
    name: DataTypes.STRING,
    shopActivated: DataTypes.BOOLEAN,
    ip: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Server.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(id, onSuccess, onError) {
        Server.find({where: {id: id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByName: function(name, onSuccess, onError) {
        Server.find({where: {name: name}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByIp: function(ip, onSuccess, onError) {
        Server.find({where: {ip: ip}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByGameId: function(game_id, onSuccess, onError) {
        Server.find({where: {GameId: game_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        Server.build({ name: this.name, shopActivated: this.shopActivated, ip: this.ip, GameId: this.GameId}).save().then(onSuccess, onError);
      },
      deleteById: function(id, onSuccess, onError) {
        Server.destroy({where: {id: id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Server.belongsTo(models.Game, {});
      }
    }
  });

  return Server;
};