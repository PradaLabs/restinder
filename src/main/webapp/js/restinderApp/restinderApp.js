var restinderApp = angular.module("restinderApp", ['ui.bootstrap']);


restinderApp.controller("restinderCtrl",function ($scope , $http , $location, $anchorScroll) {
	$scope.house={slides :{image:['img/houseSamples/house1.jpg',
						'img/houseSamples/house2.jpg',
						'img/houseSamples/house3.jpg'],text:['house1','house2','house3']}

	};
	$scope.user = {email:""
	};
    $scope.dataHouses = {"address":{
                        "city":"New York",
                        "state":"New York",
                        "zip":"23132",
                        "address":"here!!" 
                        } 
        };
    
   
    $scope.sendEmail= function (email){
    	console.log(email);
//    	$http.get('http://omakased.com/services'+"&eamil="+email).
//        success(function(data) {
//            $scope.greeting = data;
//        });
//    	
    }
    
	$scope.statusList=["main","foodView"];
	$scope.status ="main";
	$scope.indexPage=0;

	$scope.srcHouse="";
	$scope.openHouse=false;

	$scope.defaulIndex=0;
	
	$scope.goToSection= function(id){
    	console.log("tic");
    	$scope.status= $scope.statusList[id];
    	console.log($scope.status);
	}
	$scope.tindHouseModel={zipCode:'',
							minPrice:'',
							maxPrice:'',
							numBedRoom:'',	
							numBathRoom:''
		};

	$scope.price = {minPrice: 0 , maxPrice : 0} 
	$scope.patterns = {number : /^[0-9]{1,7}$/ ,
					   leters :/^[a-zA-Z]+$/};
	 
	 $http.defaults.useXDomain = true;
	 
	 $scope.config = {
        headers: {
            'Accept': 'application/json;',
            'Access-Control-Allow-Origin': '*'
        }
	 };

	$scope.prev = function(){
		console.log("put don't like!!!!");
	};
	
	 $scope.returnSrcHouse = function (){
	 	var urlHouse="";
	 	if(defaulIndex < listHouses.length){
	 		$scope.srcHouse = listHouses[defaulIndex];
	 		defaulIndex = defaulIndex + 1;
	 	} else {
	 		defaulIndex = 0;
	 	}
	 	return urlHouse;
	 }

	 $scope.openHousemodal=function(){
	 	$scope.status = $scope.statusList[1];
	 	//$scope.returnSrcHouse();
	 	console.log("open House view");
	 }
	
	$scope.consultHouses = function () {
		console.log("go to server for post");
		$scope.openHousemodal();
	}
    $scope.showOption=function (){
        var result= false;
            if('main' == $scope.status){
                result=true;
            }
        return result; 
    }

	$scope.myInterval = 5000;
	$scope.value={slides : []};
  var slides = $scope.value.slides;
  $scope.addSlide = function() {
    var newWidth = slides.length ;
    slides.push({
      image: '/img/houseSamples/house' + newWidth +".jpg",
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<3; i++) {
    $scope.addSlide();
  }
 
});


restinderApp.directive("modalShow", function () {
    return {
        restrict: "A",
        scope: {
            modalVisible: "="
        },
        link: function (scope, element, attrs) {

            //Hide or show the modal
            scope.showModal = function (visible) {
                if (visible)
                {
                    element.modal("show");
                }
                else
                {
                    element.modal("hide");
                }
            }

            //Check to see if the modal-visible attribute exists
            if (!attrs.modalVisible)
            {

                //The attribute isn't defined, show the modal by default
                scope.showModal(true);

            }
            else
            {

                //Watch for changes to the modal-visible attribute
                scope.$watch("modalVisible", function (newValue, oldValue) {
                    scope.showModal(newValue);
                });

                //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                element.bind("hide.bs.modal", function () {
                    scope.modalVisible = false;
                    if (!scope.$$phase && !scope.$root.$$phase)
                        scope.$apply();
                });

            }

        }
    };

});

restinderApp.directive ('carousele', function() { 
    return {
     restrict: 'E',
      transclude: true,
       scope: { id: '@' },
        controller: function($scope, $element) {
         var items = $scope.items = [];
          $scope.selectedIndex = 0;
            $scope.select = function (index) {
             if ( index >= $scope.items.length || index < 0 ) { 
                return; }
                  angular.forEach (items, function(item) {
                   item.selected = false; });
                   items[index].selected = true;
                   $scope.selectedIndex = index;
                }
                  this.addItem = function(item) {
                   items.push(item);
                    if (items.length == 1) 
                        $scope.select (0);
                    } 
            },
             template: '<div class="carousel slide">' + '<ol class="carousel-indicators">' + '<li ng-repeat="item in items" data-target="#{{id}}" '+ 'data-slide-to="{{$index}}" ng-click="select($index)"'+ 'ng-class="{active:item.selected}"></li>' + '</ol>' + '<div class="carousel-inner" ng-transclude>' + '</div>' + '<a class="carousel-control left" ' + 'href="#{{id}}" ng-click="selectDislike(selectedIndex-1)">&lsaquo;</a>' + '<a class="carousel-control right" ' + 'href="#{{id}}" ng-click="selectLike(selectedIndex+1)" >&rsaquo;</a>' + '</div>',
             replace: true }; 
         });

restinderApp.directive('carouseleItem', function() { 
    return { 
          require: '^carousele',
          restrict: 'E',
           transclude: true,
            scope: { },
             link: function(scope, element, attrs,	restinderCtrl) { restinderCtrl.addItem(scope); },
          template: '<div class="item" ng-class="{active: selected}" ng-transclude>' + '</div>', 
          replace: true };
     });