"use strict";

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    virtual_money: DataTypes.STRING,
    token_reset_password: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        User.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(user_id, onSuccess, onError) {
        User.find({where: {id: user_id}}, {raw: true}).then(onSuccess, onError); 
      },
      retrieveByMail: function(mail, onSuccess, onError) {
        User.find({where: {mail: mail}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByToken: function(token, onSuccess, onError) {
        User.find({where: {token: token}}, {raw: true}).then(onSuccess, onError);
      },
      createAdminUser: function(mail, password, onSuccess, onError) {
        var token_reset_password = null;
        User.find({where: {mail: mail}}, {raw: true}).then(function(user){
          if(!user){
            var shasum = crypto.createHash('sha1');
            shasum.update(password);
            password = shasum.digest('hex');
            
            User.build({ mail: mail, password: password, virtual_money: virtual_money, token_reset_password: token_reset_password }).save().then(onSuccess, onError);
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
            
            User.build({ mail: mail, password: password, virtual_money: virtual_money, token_reset_password: token_reset_password }).save().then(onSuccess, onError);
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