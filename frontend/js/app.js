// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'angular-flexslider',
    'ui.swiper'
]);

// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('division', {
            url: "/division/:category",
            templateUrl: tempateURL,
            controller: 'DivisionCtrl'
        })
        .state('divisions', {
            url: "/divisions/:category/:product",
            // url: "/divisions/:product",
            templateUrl: tempateURL,
            controller: 'Division1Ctrl'
        })
        .state('gallery', {
            url: "/gallery/:category/:productId/",
            templateUrl: tempateURL,
            controller: 'GalleryCtrl'
        })
        .state('faq', {
            url: "/faq",
            templateUrl: tempateURL,
            controller: 'FAQCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: tempateURL,
            controller: 'FormCtrl'
        })
             .state('allProduct', {
            url: "/allProduct",
            templateUrl: tempateURL,
            controller: 'allProductCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});