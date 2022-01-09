angular.module('productos',['angularModalService'])


.controller('ProductosCtrl', function($scope, $http, ModalService){
	angular.element(document).ready(function () {

    	$scope.selectProducts();
	});
	window.onresize = function () {
         $scope.logResize();
    };

	 $scope.logResize = function () {
	 	var topbar = angular.element($(".navbar-default")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var formGroup = angular.element($(".form-group")).innerHeight(); 
        var table = angular.element($(".table-responsive"));
		var heightTable = window.outerHeight - topbar - navbar - formGroup - 250;
		table.css("maxHeight", heightTable);

		var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
		var panelInfo = angular.element($(".panel-info"));
		
		//panelInfo.css("height", heightPanelInfo);

    };

	$scope.mostrarModalNuevoProducto = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoProductos.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		
        		$scope.resultadoModal = result;
        		$scope.selectProducts();
			})
		})
	};


	
	//La parte del select donde mostramos los datos en la tabla
	$scope.selectProducts = function(){
		$http.get('../models/selectProductos.php').success(function(data){
			
			if(data == "error"){
				$scope.productos = [];
			}else{
				$scope.productos = data;
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
	$scope.modificar = function(producto){
		var producto = producto;
		//alert(producto);
		ModalService.showModal({
			templateUrl: "modificarProducto.html",
			controller: "modificarCtrl",
			 inputs: {
			 		idP: producto.idProductos,
    			nombre: producto.Nombre,
    			descripcion: producto.Descripcion,
    			PrecioUnitario: producto.PrecioUnitario,
    			PrecioMayorista: producto.PrecioMayorista,
    			PrecioPromocional: producto.PrecioPromocional,
    			CantidadActual: producto.CantidadActual,
    			CantidadMinima: producto.CantidadMinima,
    			proveedorId: producto.provId,
    			proveedor: producto.provN
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				// $scope.resultadoModal = result;
				$scope.selectProducts();
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(producto){
		var producto = producto;
		ModalService.showModal({
			templateUrl: "eliminarProducto.html",
			controller: "eliminarCtrl",
			inputs: {
				id: producto.idProducto,
				nombre: producto.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectProducts();
			})
		})
	};

	
})


//El controller del modal eliminar totalmente independiente de la pagina principal (productos)
.controller('eliminarCtrl', function($scope, close, $http, id, nombre){


	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarProducto = function(){

		var model = {
			id: id,
			nombre: nombre
		};

		$http.post("../models/eliminarProductos.php", model)
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
.controller('modificarCtrl', function($scope, close, $http, idP, nombre, descripcion, PrecioUnitario, 
	PrecioMayorista, PrecioPromocional, CantidadActual, CantidadMinima, proveedorId, proveedor, flash){
	var miProveedor;
	$http.get('../models/selectProveedores.php').success(function(data){
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.proveedores = data;
		miProveedor = {"idProveedores":proveedorId, "Nombre":proveedor};
		$scope.miProv = miProveedor; 
		
		//alert(idP);
	});
	
	$scope.idP = idP;
	$scope.nombre = nombre;
	$scope.descripcion = descripcion;
	$scope.precioUnitario = PrecioUnitario;
	$scope.precioMayorista = PrecioMayorista;
	$scope.precioPromocional = PrecioPromocional;
	$scope.cantidadActual = CantidadActual;
	$scope.cantidadMin = CantidadMinima;
	
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarProducto = function(){
		var model = {
			idP: $scope.idP,
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			precio: $scope.precioUnitario,
			cantidad: $scope.cantidadActual,
			cantidadMin: $scope.cantidadMin,
			precioPromocional: $scope.precioPromocional,
			precioUnitario: $scope.precioUnitario,
			precioMayorista: $scope.precioMayorista,
			proveedor: $scope.miProv.idProveedores
		};

		$http.post("../models/modificarProductos.php", model)
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
					$scope.descripcion = null;
					$scope.precio = null;
					$scope.cantidad = null;
					$scope.cantidadMin = null;
					$scope.precioUnitario = null;
					$scope.precioMayorista = null;
					$scope.precioPromocional = null;
					$scope.proveedor = null;
					close();
			}
		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('modalCtrl', function($scope, close, $http, flash){

	$http.get('../models/selectProveedores.php').success(function(data){
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.proveedores = data;

	});
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProducto = function(){
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			cantidad: $scope.cantidad,
			cantidadMin: $scope.cantidadMin, 
			precioUnitario: $scope.precioUnitario,
			precioMayorista: $scope.precioMayorista,
			precioPromocional: $scope.precioPromocional,
			proveedor: $scope.proveedor
		};
		if(model.nombre == undefined || model.descripcion == undefined || model.precioUnitario == undefined
			|| model.precioMayorista == undefined || model.proveedor == undefined){
			$scope.msgTitle = 'Atención';
		  $scope.msgBody  = 'Debe completar los campos requeridos!';
		  $scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			$http.post("../models/insertProductos.php", model)
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
					$scope.descripcion = null;
					$scope.precio = null;
					$scope.cantidad = null;
					$scope.cantidadMin = null;
					$scope.precioUnitario = null;
					$scope.precioMayorista = null;
					$scope.precioPromocional = null;
					$scope.proveedor = null;
					close();
				}
			});
		}
		
	}
})

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
