/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/angularjs/
*/

var colorAdminApp = angular.module('colorAdminApp', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngStorage'
]);

colorAdminApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/dashboard/v2');

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'admin_website/template/app.html',
            abstract: true
        })
        .state('app.dashboard', {
            url: '/dashboard',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('app.dashboard.home', {
            url: '/home',
            templateUrl: 'admin_website/views/home.html',
            data: { pageTitle: 'Home' }
        })
        .state('app.dashboard.v2', {
            url: '/v2',
            templateUrl: 'admin_website/views/index_v2.html',
            data: { pageTitle: 'Dashboard v2' },
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'admin_website/assets/plugins/jquery-jvectormap/jquery-jvectormap.css',
                            'admin_website/assets/plugins/bootstrap-calendar/css/bootstrap_calendar.css',
                            'admin_website/assets/plugins/gritter/css/jquery.gritter.css',
                            'admin_website/assets/plugins/morris/morris.css',
                            'admin_website/assets/plugins/morris/raphael.min.js',
                            'admin_website/assets/plugins/morris/morris.js',
                            'admin_website/assets/plugins/jquery-jvectormap/jquery-jvectormap.min.js',
                            'admin_website/assets/plugins/jquery-jvectormap/jquery-jvectormap-world-merc-en.js',
                            'admin_website/assets/plugins/bootstrap-calendar/js/bootstrap_calendar.min.js',
                            'admin_website/assets/plugins/gritter/js/jquery.gritter.js'
                        ] 
                    });
                }]
            }
        })
        .state('app.news', {
            url: '/news',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('app.news.create_news', {
            url: '/create-news',
            templateUrl: 'admin_website/views/create-news.html',
            controller: 'CreateNewsController',
            data: { pageTitle: "Edition d'une news" },
            params: {
                news: null
            },
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'admin_website/assets/plugins/summernote/summernote.css',
                            'admin_website/assets/plugins/summernote/summernote.min.js'
                        ] 
                    });
                }]
            }
        })
        .state('app.news.list_news', {
            url: '/list-news',
            templateUrl: 'admin_website/views/list-news.html',
            controller: 'ListNewsController',
            data: { pageTitle: 'Liste des news' },
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/Buttons/css/buttons.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/AutoFill/css/autoFill.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/ColReorder/css/colReorder.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/KeyTable/css/keyTable.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/RowReorder/css/rowReorder.bootstrap.min.css',
                            'assets/plugins/DataTables/extensions/Select/css/select.bootstrap.min.css',
                            'assets/plugins/DataTables/media/js/jquery.dataTables.js',
                            'assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/dataTables.buttons.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/buttons.bootstrap.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/buttons.flash.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/jszip.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/pdfmake.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/vfs_fonts.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/buttons.html5.min.js',
                            'assets/plugins/DataTables/extensions/Buttons/js/buttons.print.min.js',
                            'assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                            'assets/plugins/DataTables/extensions/AutoFill/js/dataTables.autoFill.min.js',
                            'assets/plugins/DataTables/extensions/ColReorder/js/dataTables.colReorder.min.js',
                            'assets/plugins/DataTables/extensions/KeyTable/js/dataTables.keyTable.min.js',
                            'assets/plugins/DataTables/extensions/RowReorder/js/dataTables.rowReorder.min.js',
                            'assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                        ]
                    });
                }]
            }
        })
        .state('error', {
            url: '/error',
            data: { pageTitle: '404 Error' },
            templateUrl: 'admin_website/views/extra_404_error.html'
        })
        .state('member', {
            url: '/member',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('member.login', {
            url: '/login',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('member.login.v1', {
            url: '/v1',
            data: { pageTitle: 'Login' },
            templateUrl: 'admin_website/views/login.html'
        })
        $urlRouterProvider.otherwise('member/login/v1');
}]);

colorAdminApp.run(['$rootScope', '$state', 'setting', '$http', '$location', '$localStorage', function($rootScope, $state, setting, $http, $location, $localStorage) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;

    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/member/login/v1');
        }
    });
}]);