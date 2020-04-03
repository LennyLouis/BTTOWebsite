"use strict";

module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    time: DataTypes.STRING,
    server: DataTypes.STRING,
    command: DataTypes.STRING,
    votenb: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Vote.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(vote_id, onSuccess, onError) {
        Vote.find({where: {id: vote_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        var title = this.title;
        var url = this.url;
        var image = this.image;
        var time = this.time;
        var server = this.server;
        var command = this.command;
        var votenb = this.votenb;
        Vote.build({ title: title, url: url, image: image, time: time, server: server, command: command, votenb: votenb}).save().then(onSuccess, onError);
      },
      updateById: function(vote_id, onSuccess, onError) {
        var id = vote_id;
        var title = this.title;
        var description = this.description;
        var content = this.content;
        var image = this.image;
        var price = this.price;   
        var server = this.server;   
        var command = this.command;   
        Vote.update({ title: title, description: description, content: content, image: image, price: price, server: server, command: command},{where: {id: id} }).then(onSuccess, onError);
      },
      removeById: function(vote_id, onSuccess, onError) {
        Vote.destroy({where: {id: vote_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        //Vote.belongsTo(models.Category, {}); 
      }
    }
  });

  return Vote;
};