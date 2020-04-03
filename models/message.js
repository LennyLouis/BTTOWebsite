"use strict";

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    read: DataTypes.BOOLEAN
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Message.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(message_id, onSuccess, onError) {
        Message.find({where: {id: message_id}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        var name = this.name;
        var mail = this.mail;
        var content = this.content;
        var title = this.title;
        Message.build({name: name, mail: mail, content: content, title: title, read: false}).save().then(onSuccess, onError);
      },
      updateById: function(message_id, onSuccess, onError){
        var read = this.read;
        Message.update({read: read},{where: {id: message_id}}).then(onSuccess, onError);
      },
      removeById: function(message_id, onSuccess, onError) {
        Message.destroy({where: {id: message_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Message.hasMany(models.Response, {});
        Message.belongsTo(models.Account, {
          onDelete: "CASCADE"
        });
      }
    }
  });

  return Message;
};