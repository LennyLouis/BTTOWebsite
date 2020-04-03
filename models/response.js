"use strict";

module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define("Response", {
    author: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveById: function(message_id, onSuccess, onError) {
        Response.find({where: {id: message_id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByMessageId: function(MessageId, onSuccess, onError) {
        Response.find({where: {MessageId: MessageId}}, {raw: true}).then(onSuccess, onError);
      },
      add: function(onSuccess, onError) {
        var author = this.author;
        var content = this.content;
        var MessageId = this.MessageId;
        Response.build({author: author, content: content, MessageId: MessageId}).save().then(onSuccess, onError);
      },
      removeById: function(message_id, onSuccess, onError) {
        Response.destroy({where: {id: message_id}}).then(onSuccess, onError); 
      }
    },
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Message, {
          onDelete: "CASCADE"
        });
      }
    }
  });

  return Response;
};