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
		$http.get('../models/selectProveedores.php').success(function(data){
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
			
					//panelInfo.css("height", heightPanelInfo);
					
					//Como agregar clases con angularjs
					//table.addClass('customClass');
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
    			empresa: proveedor.Empresa,
    			id: proveedor.idProveedores
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

		$http.post("../models/eliminarProveedores.php", model)
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
					close();
			}
		});
	};
})

	//El controller del modal modificar totalmente independiente de la pagina principal (productos)
.controller('modificarCtrl', function($scope, close, $http, nombre, apellido, info, empresa, id, flash){
	$scope.nombre = nombre;
	$scope.apellido = apellido;
	$scope.info = info;
	$scope.empresa = empresa;
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarProveedor = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			info: $scope.info,
			empresa: $scope.empresa,
			id: id
		};

		 
		console.log(model);
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
					$scope.empresa = null;
					close();
				}
		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('modalCtrl', function($scope, close, $http, flash){
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProveedor = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			info: $scope.info,
			empresa: $scope.empresa
		};

		if (model.nombre == undefined || model.apellido == undefined || 
			model.info == undefined || model.empresa == undefined) {
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
		
	}
})