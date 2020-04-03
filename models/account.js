"use strict";

var randtoken = require('rand-token');
var models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    username: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
        Account.findAll({}, {raw: true}).then(onSuccess, onError);
      },
      retrieveById: function(account_id, onSuccess, onError) {
        Account.find({where: {id: account_id}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByUserId: function(UserId, onSuccess, onError) {
        Account.find({where: {UserId: UserId}}, {raw: true}).then(onSuccess, onError);
      },
      retrieveByToken: function(token, onSuccess, onError) {
        Account.find({where: {token: token}}, {raw: true}).then(onSuccess, onError);
      },
      createAdminAccount: function(username, AuthorityId, UserId, onSuccess, onError) {
        var token = randtoken.generate(64);

        Account.find({where: {UserId: UserId}}, {raw: true}).then(function(account){
          if(!account){
            Account.build({ username: username, token: token, AuthorityId: AuthorityId, UserId: UserId }).save().then(onSuccess, onError);
          }
          else{
            onError("Ce compte existe déjà !");
          }
        }, function(err){
          return err;
        }); 
      },
      add: function(onSuccess, onError) {
        var username = this.username;
        var token = randtoken.generate(64);
        var UserId = this.UserId;
        Account.find({where: {UserId: this.UserId}}, {raw: true}).then(function(account){
          if(!account){
            Account.build({ username: username, token: token, AuthorityId: this.AuthorityId, UserId: UserId }).save().then(onSuccess, onError);
          }
          else{
            onError("Ce compte existe déjà !");
          }
        }, function(err){
          return err;
        });  
      },
      updateByUserId: function(UserId, onSuccess, onError) {
        var right = this.right;
        Account.update({ right: right},{where: {UserId: UserId} }).then(onSuccess, onError);
      },
      updateTokenById: function(id, onSuccess, onError) {
        var token = randtoken.generate(64);
        Account.update({ token: token},{where: {id: id} }).then(onSuccess, onError);
      },
      removeByUserId: function(UserId, onSuccess, onError) {
        Account.destroy({where: {UserId: UserId}}).then(onSuccess, onError);
      }
    }, classMethods: {
      associate: function(models) {
        Account.belongsTo(models.User, {
          onDelete: "CASCADE"
        });
        Account.belongsTo(models.Authority);
        Account.hasMany(models.News, {});
        Account.hasMany(models.Message, {});
      }
    }
  });

  return Account;
};