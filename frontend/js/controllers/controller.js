myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    $scope.template = TemplateService.getHTML("content/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    TemplateService.social = "views/template/social.html";
    NavigationService.callApi("HomeBanner/getAllBanner", function (data) {
        console.log("BannerData", data.data.data);
        $scope.banner = data.data.data;
        // console.log("resultsData", $scope.banner);
    });

    var imagePopup = null;
    $scope.openpopup = function () {
        imagePopup = $uibModal.open({
            templateUrl: "frontend/views/popupmodal.html",
            // template: "<h1>hiiiiiiiiiiiiippp</h1>",
            size: "md",
            scope: $scope

        });
    };

    var data = {};
    data.page = 1;
    NavigationService.callApiWithData("Company/getAllCompany", data, function (data) {
        // console.log("comapnyData", data);
        $scope.company = data.data.data;
        console.log("comapnyData", $scope.company);
        $scope.companyData = _.chunk($scope.company, 3);

    });

    var abc = _.times(100, function (n) {
        return n;
    });

    var i = 0;
    $scope.buttonClick = function () {
        i++;
        console.log("This is a button Click");
    };

    $scope.closepopup = function () {
        $.jStorage.set('popNot', false);
        imagePopup.close();
    };

    $scope.openModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            size: 'md',
            // windowClass: 'eddy-modal',
            templateUrl: "views/popupmodal.html"
        });
    };

    function getPopUpImage() {
        NavigationService.callApiWithData("PopUpImage/search", data, function (data) {
            $scope.openpopup();
            $scope.popUpImage = data.data.data.results[0].image;
            console.log("PopImage", $scope.popUpImage);
        });
    }

    getPopUpImage();
    // $scope.openModal();
    $scope.$on('$viewContentLoaded', function () {
        //  $scope.firstTime="";
        if (_.isEmpty($.jStorage.get('firstTime'))) {
            $.jStorage.set('firstTime', {
                value: true
            });
            // $scope.firstTime=$.jStorage.get('firstTime');

            $scope.openModal();
        }
    });

    // $scope.openModal();
})


.controller('allProductCtrl', function ($rootScope, $scope, $stateParams, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/allProduct.html");
    TemplateService.title = "Product"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    TemplateService.social = "views/template/social.html";
    $scope.product = {
        _id: $stateParams.product
    };
    // $scope.category = $stateParams.category;
    $scope.company = {
        _id: $stateParams.category
    };
    NavigationService.callApiWithData("Company/getCompanyBanner", $scope.company, function (data) {
       
        $scope.banner = data.data.data;
       
    });


    // NavigationService.callApiWithData("CompanyProduct/getCompanyOfCategory", $scope.product, function (data) {
    //     // console.log("*****companyCategory******", data);
    //     $scope.companyCategory = data.data.data;
    //     // console.log("*****companyCategory******", $scope.companyCategory);
    //     $scope.companyCategoryData = _.chunk($scope.companyCategory, 3);
    // });

    // NavigationService.callApi("CompanyProduct/getAllProduct", function (data) {
    //     console.log("getallproduct", data.data.data);
    //     $scope.allproduct = data.data.data;

    //     console.log("showchunk", $scope.allproduct);
    //     $scope.data = [];
    //     $scope.data = _.groupBy($scope.allproduct, 'companyCategory.company.name');

    //     console.log("$scope.------", $scope.data);
    //     var keys = _.keysIn($scope.data);
    //     console.log(_.keysIn($scope.data));
    //     $scope.companyName = _.chunk(keys, 3);
    //     console.log($scope.companyName);
    //     $scope.allproductData = _.chunk($scope.data, 3);
    //     console.log("$chunck.------", $scope.allproductData);
    // });

 NavigationService.callApi("CompanyCategory/getAllCategory", function (data) {
        // console.log("*****companyCategory******", data);
        $scope.getAllCategory = data.data.data;
        console.log("*****getAllCategory******", $scope.getAllCategory);
        $scope.data = _.groupBy($scope.getAllCategory, 'company.name');
        console.log("getAllCategorygroupby", $scope.data)
        // $scope.companyCategoryData = _.chunk($scope.companyCategory, 3);
    });


    // $scope.cat = [{
    //     "name": "bathworld",
    //     "product": [{
    //             "img": "img/Faucets.jpg"
    //         }, {
    //             "img": "img/Faucets.jpg"
    //         }, {
    //             "img": "img/Faucets.jpg"
    //         }, {
    //             "img": "img/Faucets.jpg"
    //         },
    //          {
    //             "img": "img/Faucets.jpg"
    //         } ]
    // }, {
    //     "name": "bathworld",
    //     "product": [
    //         {
    //             "img": "img/p.jpg"
    //         },
    //           {
    //             "img": "img/p.jpg"
    //         },
    //           {
    //             "img": "img/p.jpg"
    //         },
    //           {
    //             "img": "img/p.jpg"
    //         },
    //           {
    //             "img": "img/p.jpg"
    //         }
    //     ]

    // }]
})

.controller('DivisionCtrl', function ($rootScope, $scope, $stateParams, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/division.html");
    TemplateService.title = "Division"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    TemplateService.social = "views/template/social.html";

    // $scope.category = $stateParams.category;
    // console.log("cat", $scope.category);
    $scope.company = {
        _id: $stateParams.category
    };
    $scope.categoryName = $stateParams.categoryName;

    // $scope.category = $stateParams.category;

    // console.log("state param value is", $scope.category);


    NavigationService.callApiWithData("CompanyCategory/getAllCategoriesOfCompany", $scope.company, function (data) {
        // console.log("*****companyCategory******", data);
        $scope.companyCategory = data.data.data;
        // console.log("*****companyCategory******", $scope.companyCategory);
        $scope.companyCategoryData = _.chunk($scope.companyCategory, 3);
    });
    NavigationService.callApiWithData("Company/getCompanyBanner", $scope.company, function (data) {
        console.log("*****CompnayBanner******", data);
        $scope.banner = data.data.data;
        console.log("*****CompnayBanner******", $scope.banner);

    });

})

.controller('Division1Ctrl', function ($rootScope, $scope, $stateParams, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/division1.html");
    TemplateService.title = "Division1"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    TemplateService.social = "views/template/social.html";
    $scope.product = {
        _id: $stateParams.product
    };
    // $scope.category = $stateParams.category;
    $scope.company = {
        _id: $stateParams.category
    };
    NavigationService.callApiWithData("Company/getCompanyBanner", $scope.company, function (data) {
        // console.log("*****CompnayBanner******", data);
        $scope.banner = data.data.data;
        // console.log("*****CompnayBanner******", $scope.banner);

    });
    NavigationService.callApiWithData("CompanyProduct/getAllProductWithCategory", $scope.product, function (data) {
        // console.log("*****product******", data);
        $scope.companyproduct = data.data.data;
        // console.log("*****product******", $scope.companyproduct);
        $scope.companyproductdata = _.chunk($scope.companyproduct, 3);
        console.log("*****product******", $scope.companyproductdata);
        // console.log("*****chunk product******", companyproductdata);
    });

    NavigationService.callApiWithData("CompanyProduct/getCompanyOfCategory", $scope.product, function (data) {
        // console.log("*****companyCategory******", data);
        $scope.companyCategory = data.data.data;
        // console.log("*****companyCategory******", $scope.companyCategory);
        $scope.companyCategoryData = _.chunk($scope.companyCategory, 3);
    });
})


.controller('GalleryCtrl', function ($stateParams, $scope, TemplateService, NavigationService, $timeout, $uibModal) {

    $scope.template = TemplateService.getHTML("content/gallery.html");
    TemplateService.title = "Gallery"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    TemplateService.social = "views/template/social.html";
    $scope.bigImage = "";
   
    $scope.productId = {
        _id: $stateParams.productId
    };
    $scope.company = {
        _id: $stateParams.category
    };
   
    // $rootScope.company = $stateParams.category;
   
    NavigationService.callApiWithData("Company/getCompanyBanner", $scope.company, function (data) {
       $scope.companyName = data.data.data;
    });

    NavigationService.callApiWithData("CompanyProduct/getOneProductDetails", $scope.productId, function (data) {
       $scope.productId = data.data.data;
        $scope.productIdimage = data.data.data.images;
        $scope.bigImage = $scope.productId.images[0].bigImage;
       // $scope.companyCategoryData = _.chunk($scope.companyCategory, 3);
    });

    $scope.changeBigImage = function (bigImage) {
        $scope.bigImage = bigImage;
    }

    // enquire modal start

      $scope.enquire = function () {

        enquireModal = $uibModal.open({
            templateUrl: "frontend/views/modal/enquire.html",
            size: "md",
            scope: $scope

        });
    };

  $scope.closepopup = function () {
        $.jStorage.set('popNot', false);
        enquireModal.close();
    };

})

.controller('ShowroomCtrl', function ($scope, TemplateService, apiService, NavigationService, $stateParams, $timeout) {
    $scope.template = TemplateService.getHTML("content/showroom.html");
    TemplateService.title = "Showroom"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();




    // $scope.productId = {
    //     _id: $stateParams.productId
    // };
    // $scope.company = {
    //     _id: $stateParams.category
    // };



    // console.log("state param value is", $scope.productId);

    // $rootScope.company = $stateParams.category;
    NavigationService.callApiWithData("Company/getCompanyBanner", $scope.company, function (data) {
        // console.log("*****companyName******", data);
        $scope.companyName = data.data.data;
        // console.log("*****companyName******", $scope.banner);

    });
    NavigationService.callApiWithData("CompanyProduct/getOneProductDetails", $scope.productId, function (data) {
        console.log("*****ComapanyProduct Details******", data);
        $scope.productId = data.data.data;
        $scope.productIdimage = data.data.data.images;
        $scope.bigImage = $scope.productId.images[0].bigImage;

    });

    NavigationService.callApi("CompanyProduct/getAllProduct", function (data) {
        $scope.ProductDetails = data.data.data;
        console.log("kem cho", $scope.ProductDetails);

        $scope.ProductDetails = data.data.data;
        console.log("kem cho", $scope.ProductDetails);
        if ($scope.ProductDetails.length != 0) {
            $scope.bigImage = $scope.ProductDetails[0].images[0].bigImage;
            console.log("kem cho", $scope.bigImage);
            $scope.name = $scope.ProductDetails[0].name;
            $scope.backgroundImage = $scope.ProductDetails[0].companyCategory.company.backgroundImage;
            console.log("NAME", $scope.productId);

        } else {
            console.log("######");
        }


        // console.log("****getallproduct********", data.data.data);
        // $scope.productId = data.data.data;
        // $scope.productIdimage = data.data.data.description;
        // console.log("****", $scope.productIdimage);
        // $scope.bigImage = $scope.productId.images[0].bigImage;
        // console.log("hello", $scope.bigImage);
        // });
        // NavigationService.callApiWithData("CompanyProduct/getAllProduct", function (data) {
        //     console.log("***$$**getAllProduct Details*$$$4*****", data);
        //     $scope.productId = data.data.data;
        //     $scope.productIdimage = data.data.data.images;
        //     $scope.bigImage = $scope.productId.images[0].bigImage;

        // });
        $scope.changeBigImage = function (bigImage, name, backgroundImage) {
            $scope.bigImage = bigImage;
            $scope.name = name;
            $scope.backgroundImage = backgroundImage;
            console.log("info", $scope.productId, $scope.bigImage);

        };
    });
    // NavigationService.callApi("CompanyProduct/getAllProduct", function (data) {
    //     console.log("*****ComapanyProduct Details******", data.data.data);
    //     $scope.productId = data.data.data;
    //     $scope.productIdimage = data.data.data.images;
    //     $scope.bigImage = $scope.productId.images[0].bigImage;

    // });
    // $scope.changeBigImage = function (bigImage) {
    //     $scope.bigImage = bigImage;
    // };
    $scope.product = {};
    $scope.bigImage = {};
    $scope.name = {};

    // TemplateService.social = "views/template/social.html";

    // $scope.bigImage = "";
    // $scope.productId = {
    //     _id: $stateParams.productId
    // };
    // $scope.company = {
    //     _id: $stateParams.category
    // };



    // console.log("state param value is", $scope.productId);
    // // $rootScope.company = $stateParams.category;
    // NavigationService.callApiWithData("Company/getCompanyBanner", $scope.company, function (data) {
    //     // console.log("*****companyName******", data);
    //     $scope.companyName = data.data.data;
    //     // console.log("*****companyName******", $scope.banner);



    // $scope.product = {};
    // $scope.bigImage = {};
    // $scope.name = {};




})

.controller('FAQCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/faq.html");
    TemplateService.title = "Faq"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    // TemplateService.social = "views/template/social.html";

})

// start of aboutUs
.controller('AboutUsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/aboutUs.html");
        TemplateService.title = "AboutUs"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();


    })
    // start of contact
    .controller('ContactCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/contact.html");
        TemplateService.title = "Contact"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();


    })


//Example API Controller
.controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
    apiService.getDemo($scope.formData, function (data) {
        console.log(data);
    });
});