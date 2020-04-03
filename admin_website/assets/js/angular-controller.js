/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v2.1/admin/angularjs/
    ----------------------------
        APPS CONTROLLER TABLE
    ----------------------------
    1.0 CONTROLLER - App
    2.0 CONTROLLER - Sidebar
    3.0 CONTROLLER - Right Sidebar
    4.0 CONTROLLER - Header
    5.0 CONTROLLER - Top Menu
    6.0 CONTROLLER - Page Loader
    7.0 CONTROLLER - Dashboard v2
    8.0 CONTROLLER - Dashboard Home
   41.0 CONTROLLER - Page with Footer
   42.0 CONTROLLER - Page without Sidebar
   43.0 CONTROLLER - Page with Right Sidebar
   44.0 CONTROLLER - Page with Minified Sidebar
   45.0 CONTROLLER - Page with Two Sidebar
   46.0 CONTROLLER - Full Height Content
   47.0 CONTROLLER - Page with Wide Sidebar
   48.0 CONTROLLER - Page with Light Sidebar
   49.0 CONTROLLER - Page with Mega Menu
   50.0 CONTROLLER - Page with Top Menu
   51.0 CONTROLLER - Page with Boxed Layout
   52.0 CONTROLLER - Page with Mixed Menu
   53.0 CONTROLLER - Page Boxed Layout with Mixed Menu
   54.0 CONTROLLER - Page with Transparent Sidebar
   55.0 CONTROLLER - Timeline
   56.0 CONTROLLER - Coming Soon
   57.0 CONTROLLER - 404 Error
   58.0 CONTROLLER - Login V1
   62.0 CONTROLLER - News Create
    <!-- ======== GLOBAL SCRIPT SETTING ======== -->
*/


var blue		= '#348fe2',
    blueLight	= '#5da5e8',
    blueDark	= '#1993E4',
    aqua		= '#49b6d6',
    aquaLight	= '#6dc5de',
    aquaDark	= '#3a92ab',
    green		= '#00acac',
    greenLight	= '#33bdbd',
    greenDark	= '#008a8a',
    orange		= '#f59c1a',
    orangeLight	= '#f7b048',
    orangeDark	= '#c47d15',
    dark		= '#2d353c',
    grey		= '#b6c2c9',
    purple		= '#727cb6',
    purpleLight	= '#8e96c5',
    purpleDark	= '#5b6392',
    red         = '#ff5b57';


/* -------------------------------
   1.0 CONTROLLER - App
------------------------------- */
colorAdminApp.controller('appController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.$on('$includeContentLoaded', function() {
        handleSlimScroll();
    });
    $scope.$on('$viewContentLoaded', function() {
    });
    $scope.$on('$stateChangeStart', function() {
        // reset layout setting
        $rootScope.setting.layout.pageSidebarMinified = false;
        $rootScope.setting.layout.pageFixedFooter = false;
        $rootScope.setting.layout.pageRightSidebar = false;
        $rootScope.setting.layout.pageTwoSidebar = false;
        $rootScope.setting.layout.pageTopMenu = false;
        $rootScope.setting.layout.pageBoxedLayout = false;
        $rootScope.setting.layout.pageWithoutSidebar = false;
        $rootScope.setting.layout.pageContentFullHeight = false;
        $rootScope.setting.layout.pageContentFullWidth = false;
        $rootScope.setting.layout.paceTop = false;
        $rootScope.setting.layout.pageLanguageBar = false;
        $rootScope.setting.layout.pageSidebarTransparent = false;
        $rootScope.setting.layout.pageWideSidebar = false;
        $rootScope.setting.layout.pageLightSidebar = false;
        $rootScope.setting.layout.pageFooter = false;
        $rootScope.setting.layout.pageMegaMenu = false;
        $rootScope.setting.layout.pageWithoutHeader = false;
        $rootScope.setting.layout.pageBgWhite = false;
        $rootScope.setting.layout.pageContentInverseMode = false;
        
        App.scrollTop();
        $('.pace .pace-progress').addClass('hide');
        $('.pace').removeClass('pace-inactive');
    });
    $scope.$on('$stateChangeSuccess', function() {
        Pace.restart();
        App.initPageLoad();
        App.initSidebarSelection();
        App.initSidebarMobileSelection();
        setTimeout(function() {
            App.initLocalStorage();
            App.initComponent();
        },0);
    });
    $scope.$on('$stateNotFound', function() {
        Pace.stop();
    });
    $scope.$on('$stateChangeError', function() {
        Pace.stop();
    });
}]);



/* -------------------------------
   2.0 CONTROLLER - Sidebar
------------------------------- */
colorAdminApp.controller('sidebarController', function($scope, $rootScope, $state, AuthenticationService) {
    App.initSidebar();
    $scope.user = AuthenticationService.getUser();
});



/* -------------------------------
   3.0 CONTROLLER - Right Sidebar
------------------------------- */
colorAdminApp.controller('rightSidebarController', function($scope, $rootScope, $state) {
    var getRandomValue = function() {
        var value = [];
        for (var i = 0; i<= 19; i++) {
            value.push(Math.floor((Math.random() * 10) + 1));
        }
        return value;
    };

    $('.knob').knob();

    var blue		= '#348fe2', green		= '#00acac', purple		= '#727cb6', red         = '#ff5b57';
    var options = { height: '50px', width: '100%', fillColor: 'transparent', type: 'bar', barWidth: 8, barColor: green };

    var value = getRandomValue();
    $('#sidebar-sparkline-1').sparkline(value, options);

    value = getRandomValue();
    options.barColor = blue;
    $('#sidebar-sparkline-2').sparkline(value, options);

    value = getRandomValue();
    options.barColor = purple;
    $('#sidebar-sparkline-3').sparkline(value, options);

    value = getRandomValue();
    options.barColor = red;
    $('#sidebar-sparkline-4').sparkline(value, options);
});



/* -------------------------------
   4.0 CONTROLLER - Header
------------------------------- */
colorAdminApp.controller('headerController', function($scope, $rootScope, $state, AuthenticationService) {
    $scope.user = AuthenticationService.getUser();

    $scope.logout = function(){
        AuthenticationService.logout();
        $state.go('member.login.v1');
    }
});



/* -------------------------------
   5.0 CONTROLLER - Top Menu
------------------------------- */
colorAdminApp.controller('topMenuController', function($scope, $rootScope, $state) {
    setTimeout(function() {
        App.initTopMenu();
    }, 0);
});


/* -------------------------------
   6.0 CONTROLLER - Page Loader
------------------------------- */
colorAdminApp.controller('pageLoaderController', function($scope, $rootScope, $state) {
    App.initPageLoad();
});


/* -------------------------------
   7.0 CONTROLLER - Dashboard v2
------------------------------- */
colorAdminApp.controller('dashboardV2Controller', function($scope, $rootScope, $state) {
    angular.element(document).ready(function () {
        /* Line Chart
        ------------------------- */
        var green = '#0D888B';
        var greenLight = '#00ACAC';
        var blue = '#3273B1';
        var blueLight = '#348FE2';
        var blackTransparent = 'rgba(0,0,0,0.6)';
        var whiteTransparent = 'rgba(255,255,255,0.4)';
        var month = [];
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

        Morris.Line({
            element: 'visitors-line-chart',
            data: [
                {x: '2014-02-01', y: 60, z: 30},
                {x: '2014-03-01', y: 70, z: 40},
                {x: '2014-04-01', y: 40, z: 10},
                {x: '2014-05-01', y: 100, z: 70},
                {x: '2014-06-01', y: 40, z: 10},
                {x: '2014-07-01', y: 80, z: 50},
                {x: '2014-08-01', y: 70, z: 40}
            ],
            xkey: 'x',
            ykeys: ['y', 'z'],
            xLabelFormat: function(x) {
                x = month[x.getMonth()];
                return x.toString();
            },
            labels: ['Page Views', 'Unique Visitors'],
            lineColors: [green, blue],
            pointFillColors: [greenLight, blueLight],
            lineWidth: '2px',
            pointStrokeColors: [blackTransparent, blackTransparent],
            resize: true,
            gridTextFamily: 'Open Sans',
            gridTextColor: whiteTransparent,
            gridTextWeight: 'normal',
            gridTextSize: '11px',
            gridLineColor: 'rgba(0,0,0,0.5)',
            hideHover: 'auto',
        });

        /* Donut Chart
        ------------------------- */
        var green = '#00acac';
        var blue = '#348fe2';
        Morris.Donut({
            element: 'visitors-donut-chart',
            data: [
                {label: "New Visitors", value: 900},
                {label: "Return Visitors", value: 1200}
            ],
            colors: [green, blue],
            labelFamily: 'Open Sans',
            labelColor: 'rgba(255,255,255,0.4)',
            labelTextSize: '12px',
            backgroundColor: '#242a30'
        });


        /* Vector Map
        ------------------------- */
        $('#visitors-map').vectorMap({
            map: 'world_merc_en',
            scaleColors: ['#e74c3c', '#0071a4'],
            container: $('#visitors-map'),
            normalizeFunction: 'linear',
            hoverOpacity: 0.5,
            hoverColor: false,
            markerStyle: {
                initial: {
                    fill: '#4cabc7',
                    stroke: 'transparent',
                    r: 3
                }
            },
            regions: [{ attribute: 'fill' }],
            regionStyle: {
                initial: {
                    fill: 'rgb(97,109,125)',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0.4,
                    "stroke-opacity": 1
                },
                hover: { "fill-opacity": 0.8 },
                selected: { fill: 'yellow' }
            },
            series: {
                regions: [{
                    values: {
                        IN:'#00acac',
                        US:'#00acac',
                        KR:'#00acac'
                    }
                }]
            },
            focusOn: { x: 0.5, y: 0.5, scale: 2 },
            backgroundColor: '#2d353c'
        });
    

        /* Calendar
        ------------------------- */
        var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
        var dayNames = ["S", "M", "T", "W", "T", "F", "S"];
        var now = new Date(),
            month = now.getMonth() + 1,
            year = now.getFullYear();
        var events = [[
            '2/' + month + '/' + year,
            'Popover Title',
            '#',
            '#00acac',
            'Some contents here'
        ], [
            '5/' + month + '/' + year,
            'Tooltip with link',
            'http://www.seantheme.com/color-admin-v1.3',
            '#2d353c'
        ], [
            '18/' + month + '/' + year,
            'Popover with HTML Content',
            '#',
            '#2d353c',
            'Some contents here <div class="text-right"><a href="http://www.google.com">view more >>></a></div>'
        ], [
            '28/' + month + '/' + year,
            'Color Admin V1.3 Launched',
            'http://www.seantheme.com/color-admin-v1.3',
            '#2d353c',
        ]];
        var calendarTarget = $('#schedule-calendar');
        $(calendarTarget).calendar({
            months: monthNames,
            days: dayNames,
            events: events,
            popover_options:{
                placement: 'top',
                html: true
            }
        });
        $(calendarTarget).find('td.event').each(function() {
            var backgroundColor = $(this).css('background-color');
            $(this).removeAttr('style');
            $(this).find('a').css('background-color', backgroundColor);
        });
        $(calendarTarget).find('.icon-arrow-left, .icon-arrow-right').parent().on('click', function() {
            $(calendarTarget).find('td.event').each(function() {
                var backgroundColor = $(this).css('background-color');
                $(this).removeAttr('style');
                $(this).find('a').css('background-color', backgroundColor);
            });
        });

    });
});

/* -------------------------------
    8.0 CONTROLLER - Dashboard Home
------------------------------- */
colorAdminApp.controller('dashboardHomeController', function($scope, $rootScope, $state) {
    
});


/* -------------------------------
   41.0 CONTROLLER - Page with Footer
------------------------------- */
colorAdminApp.controller('pageWithFooterController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageFooter = true;
});


/* -------------------------------
   42.0 CONTROLLER - Page without Sidebar
------------------------------- */
colorAdminApp.controller('pageWithoutSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutSidebar = true;
});



/* -------------------------------
   43.0 CONTROLLER - Page with Right Sidebar
------------------------------- */
colorAdminApp.controller('pageWithRightSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageRightSidebar = true;
});



/* -------------------------------
   44.0 CONTROLLER - Page with Minified Sidebar
------------------------------- */
colorAdminApp.controller('pageWithMinifiedSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageSidebarMinified = true;
});



/* -------------------------------
   45.0 CONTROLLER - Page with Two Sidebar
------------------------------- */
colorAdminApp.controller('pageWithTwoSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageTwoSidebar = true;
});



/* -------------------------------
   46.0 CONTROLLER - Full Height Content
------------------------------- */
colorAdminApp.controller('pageFullHeightContentController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageContentFullHeight = true;
    $rootScope.setting.layout.pageContentFullWidth = true;
});



/* -------------------------------
   47.0 CONTROLLER - Page with Wide Sidebar
------------------------------- */
colorAdminApp.controller('pageWithWideSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWideSidebar = true;
});



/* -------------------------------
   48.0 CONTROLLER - Page with Light Sidebar
------------------------------- */
colorAdminApp.controller('pageWithLightSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageLightSidebar = true;
});


/* -------------------------------
   49.0 CONTROLLER - Page with Mega Menu
------------------------------- */
colorAdminApp.controller('pageWithMegaMenuController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageMegaMenu = true;
});


/* -------------------------------
   50.0 CONTROLLER - Page with Top Menu
------------------------------- */
colorAdminApp.controller('pageWithTopMenuController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageTopMenu = true;
    $rootScope.setting.layout.pageWithoutSidebar = true;
});


/* -------------------------------
   51.0 CONTROLLER - Page with Boxed Layout
------------------------------- */
colorAdminApp.controller('pageWithBoxedLayoutController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageBoxedLayout = true;
});


/* -------------------------------
   52.0 CONTROLLER - Page with Mixed Menu
------------------------------- */
colorAdminApp.controller('pageWithMixedMenuController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageTopMenu = true;
});


/* -------------------------------
   53.0 CONTROLLER - Page Boxed Layout with Mixed Menu
------------------------------- */
colorAdminApp.controller('pageBoxedLayoutWithMixedMenuController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageBoxedLayout = true;
    $rootScope.setting.layout.pageTopMenu = true;
});


/* -------------------------------
   54.0 CONTROLLER - Page with Transparent Sidebar
------------------------------- */
colorAdminApp.controller('pageWithTransparentSidebarController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageSidebarTransparent = true;
});


/* -------------------------------
   56.0 CONTROLLER - Coming Soon
------------------------------- */
colorAdminApp.controller('comingSoonController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.pageBgWhite = true;
    $rootScope.setting.layout.paceTop = true;
    
    angular.element(document).ready(function () {
        var newYear = new Date();
        newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1);
        $('#timer').countdown({until: newYear});
    });
});


/* -------------------------------
   57.0 CONTROLLER - 404 Error
------------------------------- */
colorAdminApp.controller('errorController', function($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
});


/* -------------------------------
   58.0 CONTROLLER - Login V1
------------------------------- */
colorAdminApp.controller('loginV1Controller', function($scope, $rootScope, $state, AuthenticationService, $http, $localStorage, $location) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;

    $scope.form_login = {
        mail: "",
        password: ""
    };

    initController();

    function initController() {
        // reset login status
        AuthenticationService.logout();
    };

    $scope.login = function() {
        AuthenticationService.login($scope.form_login.mail, $scope.form_login.password).then(function (response) {
            if (response.status==200) {
                if(response.data.token!=null&&response.data.token.length>0){
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = response.data;
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $state.go('app.dashboard.home');
                } 
            } else {
                //error
            }
        }, function(err){
            console.log(err);
        });
    };
});