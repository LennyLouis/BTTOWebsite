"use strict";

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    virtual_money: {
      type: DataTypes.INTEGER,
      defaultValue: function() {
        return '0'
    }},
    account_activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: function() {
        return '1'
    }},
    user_uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
    token_reset_password: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        User.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(user_id, onSuccess, onError) {
        User.find({where: {id: user_id}}, {raw: true}).then(onSuccess, onError); 
      },
      retrieveByMail: function(user_mail, onSuccess, onError) {
        User.find({where: {mail: user_mail}}, {raw: true}).then(onSuccess, onError);
      },
      createAdminUser: function(user_mail, user_password, onSuccess, onError) {
        var user_token_reset_password = null;
        User.find({where: {mail: user_mail}}, {raw: true}).then(function(user){
          if(!user){
            var shasum = crypto.createHash('sha1');
            shasum.update(password);
            password = shasum.digest('hex');
            
            User.build({ mail: user_mail, password: user_password, token_reset_password: user_token_reset_password }).save().then(onSuccess, onError);
          }
          else{
            onError("Cet utilisateur existe déjà !");
          }
        }, function(err){
          return err;
        }); 
      },
      add: function(onSuccess, onError) {
        var password = this.password;
        var mail = this.mail;
        var token_reset_password = null;

        User.find({where: {mail: mail}}, {raw: true}).then(function(user){
          if(!user){
            var shasum = crypto.createHash('sha1');
            shasum.update(password);
            password = shasum.digest('hex');
            
            User.build({ mail: mail, password: password, token_reset_password: token_reset_password }).save().then(onSuccess, onError);
          }
          else{
            onError("Cet utilisateur existe déjà !");
          }
        }, function(err){
          return err;
        }); 
      },
      updateById: function(user_id, onSuccess, onError) {
        var id = user_id;
        var password = this.password;
        var mail = this.mail;
        
        var shasum = crypto.createHash('sha1');
        shasum.update(password);
        password = shasum.digest('hex');
              
        User.update({ mail: mail,password: password},{where: {id: id} }).then(onSuccess, onError);
      },
      removeById: function(user_id, onSuccess, onError) {
        User.destroy({where: {id: user_id}}).then(onSuccess, onError);
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Account)
      }
    }
  });

  return User;
};