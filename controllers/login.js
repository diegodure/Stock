angular.module('login',['angularModalService'])

.factory("flash", function($rootScope) {

  return {

    pop: function(message) {
      switch(message.type) {
        case 'success':
          toastr.success(message.body, message.title);
          break;
        case 'info':
          toastr.info(message.body, message.title);
          break;
        case 'warning':
          toastr.warning(message.body, message.title);
          break;
        case 'error':
          toastr.error(message.body, message.title);
          break;
      }
    }
  };
})

.controller('LoginCtrl', function($scope, $http, ModalService, $rootScope, flash){
	angular.element(document).ready(function () {
			$scope.user = "";
			$scope.enterprise = "";
			$scope.branchOffices = "";
			$scope.idEnterprise = "";
    	$scope.selectEnterprise();
    	$scope.selectCountries();
	});

	$scope.getUserLog = function (user){
		console.log(user);
	}

	$scope.selectEnterprise = function(){
		$http.get('../models/selectEnterprise.php').success(function(data){
			$scope.enterprise = data;
			console.log(data);
			//$scope.idEnterprise = data.idEmpresas;
		});
	};

	$scope.selectCountries = function(){
		$http.get('../models/selectCountries.php').success(function(data){
			$scope.countries = data;
		});
	};

	$scope.selectRoles = function(){
		$http.get('../models/selectRoles.php').success(function(data){
			$scope.roles = data;
		});
	};

	$scope.selectBranchOffices = function(){
		$http.get('../models/selectRoles.php').success(function(data){
			$scope.branchOffices = data;
		});
	};
	//Seccion donde se registran empresas
	$scope.registerEnterprise = function(){
		
		var model = {
			name: $scope.name,
			description: $scope.description,
			country: $scope.country,
			city: $scope.city,
			neighborhood: $scope.neighborhood,
			address: $scope.address,
			phone: $scope.phone
		};	
		console.log(model);
	    if(model.name != undefined && model.city != undefined && model.neighborhood != undefined 
	     && model.address != undefined && model.country != undefined){
	    	$http.post("../models/insertEmpresas.php", model)
			.success(function(res){
				console.log(res);
		 	if(res == "0" || res == 0){
		 	//	$rootScope.idEnterprise = res;
		 	//	$rootScope.enterprise = res;
		 		$scope.name = null;
		 		$scope.description = null;
				$scope.city = null;
				$scope.neighborhood = null;
				$scope.address = null;
				$scope.phone = null;
				$scope.country = null;
		 		$scope.msgTitle = 'Exitoso';
		    $scope.msgBody  = 'Empresa creada correctamente!';
		    $scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		 		$scope.$apply();
			}else{
				$scope.msgTitle = 'Alerta';
		    $scope.msgBody  = 'Ocurrio un error!';
		    $scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
				
			});
	    }else{
	    	$scope.msgTitle = 'Alerta';
	    	$scope.msgBody  = 'Debe llenar todos los campos!';
	    	$scope.msgType  = 'warning';
	 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	    }		
		
	};


	//Seccion donde se registrar las suscursales
	$scope.registerBranchOffices = function(){
		var model = {
			idEmpresas: 1,
			name: $scope.name,
			description: $scope.description,
			country: $scope.country,
			city: $scope.city,
			neighborhood: $scope.neighborhood,
			address: $scope.address,
			phone: $scope.phone
		};
		console.log(model);
		if(model.name != undefined && model.city != undefined && model.neighborhood != undefined 
	     && model.address != undefined && model.country != undefined){
	    	$http.post("../models/insertBranchOffices.php", model)
			.success(function(res){
				console.log(res)
		 	if(res == "0" || res == 0){
		 	//	$scope.branchOffices = res;
		 		$scope.name = null;
		 		$scope.description = null;
				$scope.city = null;
				$scope.neighborhood = null;
				$scope.address = null;
				$scope.phone = null;
				$scope.country = null;
		 	//	$scope.msgTitle = 'Exitoso';
		  //  $scope.msgBody  = 'Sucursal creada correctamente!';
		  //  $scope.msgType  = 'success';
		 	//	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		 		$scope.selectRoles();
		 		$scope.selectBranchOffices();
		 		$scope.$apply();
			}else{
				$scope.msgTitle = 'Alerta';
		    $scope.msgBody  = 'Ocurrio un error!';
		    $scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
				
			});
	    }else{
	    	$scope.msgTitle = 'Alerta';
	    	$scope.msgBody  = 'Debe llenar todos los campos!';
	    	$scope.msgType  = 'warning';
	 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	    }	

	};

	$scope.registerUser = function(){
		var model = {
			name: $scope.name,
			description: $scope.description,
			city: $scope.city,
			neighborhood: $scope.neighborhood,
			address: $scope.direccion,
			phone: $scope.telefono,
			country: $scope.country
		};
		console.log(model);
		if(model.userAlias != undefined && model.userPassword != undefined && model.userFirstName != undefined 
	     && model.userLastName != undefined && model.userRol != undefined && model.userBranchOffice != undefined){
	    	$http.post("../models/insertUsers.php", model)
			.success(function(res){
		 	if(res == "0" || res == 0){
		 		$scope.userAlias = null;
				$scope.userPassword = null;
				$scope.userFirstName = null;
				$scope.userLastName = null;
				$scope.userRol = null;
				$scope.userBranchOffice = null;
		 		$scope.msgTitle = 'Exitoso';
		    $scope.msgBody  = 'Usuario creado correctamente!';
		    $scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
				$scope.msgTitle = 'Alerta';
		    	$scope.msgBody  = 'Ocurrio un error!';
		    	$scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
				
			});
	    }else{
	    	$scope.msgTitle = 'Alerta';
	    	$scope.msgBody  = 'Debe llenar todos los campos!';
	    	$scope.msgType  = 'warning';
	 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	    }

	};
	$scope.$apply(); 
})