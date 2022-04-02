angular.module('proveedores',['angularModalService'])

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

.controller('ProveedoresCtrl', function($scope, $http, ModalService){

	angular.element(document).ready(function () {

    	$scope.selectProviders();

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoProveedor.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		$scope.resultadoModal = result;
        		$scope.selectProviders();
			})
		})
	};

	//La parte del select donde mostramos los datos en la tabla
	$scope.selectProviders = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectProveedores.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			if(data == "error"){
				$scope.proveedores = [];
			}else{
				$scope.proveedores = data;
				if(data.length > 0){
					var topbar = angular.element($(".navbar-default")).innerHeight();
		 			var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 			var formGroup = angular.element($(".form-group")).innerHeight();
	        		var table = angular.element($(".table-responsive"));
					var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
					table.css("maxHeight", heightTable);

					var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
					var panelInfo = angular.element($(".panel-info"));
			
				}
			}
			
		});
	};
	
	//Ordenamos de forma ascendente o descendente los datos
	$scope.ordenarPor = function(orden){
		$scope.ordenSeleccionado = orden;
	};

	//Abrimos el modal para modificar y recibimos los datos a ser modificados
	$scope.modificar = function(proveedor){
		var proveedor = proveedor;
		//alert(producto);
		ModalService.showModal({
			templateUrl: "modificarProveedor.html",
			controller: "modificarCtrl",
			 inputs: {
    			nombre: proveedor.Nombre,
    			apellido: proveedor.Apellido,
    			info: proveedor.Informacion,
    			id: proveedor.idProveedores,
    			sucursalId: proveedor.idSucursal,
    			sucursal: proveedor.Sucursal
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				// $scope.resultadoModal = result;
				$scope.selectProviders();
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(proveedor){
		var proveedor = proveedor;
		ModalService.showModal({
			templateUrl: "eliminarProveedor.html",
			controller: "eliminarCtrl",
			inputs: {
				id: proveedor.idProveedores,
				nombre: proveedor.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectProviders();
			})
		})
	};

	
})


//El controller del modal eliminar totalmente independiente de la pagina principal (productos)
.controller('eliminarCtrl', function($scope, close, $http, id, nombre, flash){


	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarProveedor = function(){

		var model = {
			id: id,
			nombre: nombre
		};
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/eliminarProveedores.php", model)
		.success(function(res){
			close();
			angular.element($("#spinerContainer")).css("display", "none");
			if(res == "error"){
					$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
					$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
		});
	};
})

	//El controller del modal modificar totalmente independiente de la pagina principal (productos)
.controller('modificarCtrl', function($scope, close, $http, nombre, apellido, info, sucursalId, sucursal, id, flash){
	var miSucursal;
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectSucursales.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.sucursales = data;
		miSucursal = {"idSucursal":sucursalId, "Nombre":sucursal};
		$scope.miSucursal = miSucursal; 
	});
	$scope.nombre = nombre;
	$scope.apellido = apellido;
	$scope.info = info;
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarProveedor = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			info: $scope.info,
			idSucursal: $scope.miSucursal.idSucursal,
			id: id
		};

		$http.post("../models/modificarProveedores.php", model)
		.success(function(res){
			if(res == "error"){
					$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}else{
					$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		 			$scope.nombre = null;
					$scope.apellido = null;
					$scope.info = null;
					close();
				}
		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('modalCtrl', function($scope, close, $http, flash, ModalService){
	
	$scope.getSucursales = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectSucursales.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			var modalHeader = angular.element($(".modal-header")).innerHeight();
		 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
		    var modalBody = angular.element($(".modal-body"));
			var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
			modalBody.css("maxHeight", contentHeight);
			$scope.sucursales = data;

		});
	}
	
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProveedor = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			info: $scope.info,
			sucursal: $scope.sucursal
		};

		if (model.nombre == undefined || model.apellido == undefined || 
			model.info == undefined || model.sucursal == undefined) {
			$scope.msgTitle = 'Atención';
		  $scope.msgBody  = 'Debe completar los campos requeridos!';
		  $scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			$http.post("../models/insertProveedores.php", model)
			.success(function(res){	
				if(res == "error"){
						$scope.msgTitle = 'Error';
			    	$scope.msgBody  = 'Ha ocurrido un error!';
			    	$scope.msgType  = 'error';
			 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
					}else{
						$scope.msgTitle = 'Exitoso';
			    	$scope.msgBody  = res;
			    	$scope.msgType  = 'success';
			 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
						$scope.nombre = null;
						$scope.apellido = null;
						$scope.info = null;
						$scope.empresa = null;
						close();
					}		
			});
		}
		
	};
	$scope.crearEmpresa = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevaEmpresa.html",
      		controller: "nuevaEmpresaCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.getSucursales();
			})
		})
	}

	$scope.getSucursales();
})

.controller('nuevaEmpresaCtrl', function($scope, close, $http, flash){
	angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectCountries.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			var modalHeader = angular.element($(".modal-header")).innerHeight();
		 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
		    var modalBody = angular.element($(".modal-body"));
			var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 200;
			modalBody.css("maxHeight", contentHeight);
			$scope.paises = data;

		});

	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarEmpresa = function(){
		var model = {
			name: $scope.nombre,
			description: $scope.descripcion,
			city: $scope.pais,
			ciudad: $scope.ciudad,
			neighborhood: $scope.barrio,
			address: $scope.direccion,
			phone: $scope.telefono
		};
		if (model.name == undefined || model.city == undefined || 
			 model.neighborhood == undefined || model.address == undefined) {
			$scope.msgTitle = 'Atención';
		  $scope.msgBody  = 'Debe completar los campos requeridos!';
		  $scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertEmpresa.php", model)
			.success(function(res){	
				close();
				angular.element($("#spinerContainer")).css("display", "none");
				if(res == "error"){
						$scope.msgTitle = 'Error';
			    	$scope.msgBody  = 'Ha ocurrido un error!';
			    	$scope.msgType  = 'error';
			 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
					}else{
						$scope.msgTitle = 'Exitoso';
			    	$scope.msgBody  = res;
			    	$scope.msgType  = 'success';
			 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
						$scope.nombre = null;
						$scope.apellido = null;
						$scope.info = null;
						$scope.empresa = null;
					}		
			});
		}
	};
})