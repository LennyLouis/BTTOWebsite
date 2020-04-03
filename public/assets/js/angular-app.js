var App = angular.module('App', ['ui.router']);

App.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'public/assets/js/templates/home.html',
    controller: 'HomeController'
  })
  .state('news', {
    url: '/news/:id',
    templateUrl: 'public/assets/js/templates/news-detail.html',
    controller: 'NewsdetailController'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'public/assets/js/templates/about.html'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: 'public/assets/js/templates/contact.html',
    controller: 'ContactController'
  })
  .state('shop', {
    url: '/shop',
    templateUrl: 'public/assets/js/templates/shop.html',
    controller: 'ShopController'
  })
  .state('shopdetail', {
    url: '/shop/:id',
    templateUrl: 'public/assets/js/templates/shopdetail.html',
    controller: 'ShopController'
  })
  .state('messages', {
      url: "/messages",
      templateUrl: 'public/assets/js/templates/messages.html',
      controller: 'MessageController'
  })
  .state('newsdetail', {
      url: "/news/:id",
      templateUrl: 'public/assets/js/templates/news-detail.html',
      controller: 'NewsdetailController'
  })
  .state('profil', {
      url: "/profil",
      templateUrl: 'public/assets/js/templates/profil.html',
      controller: 'ProfilController'
  })
  .state('vote', {
      url: "/vote",
      templateUrl: 'public/assets/js/templates/vote.html',
      controller: 'VoteController'
  });

})

App.run(function($rootScope, $state) {
	console.log('run');
})

App.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});