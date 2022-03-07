angular.module('ventas',['angularModalService'])

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

.controller('VentasCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {

    	$scope.price = {
    		type : "minorista"
    	};
    	$scope.selectConfiguraciones();
	});

	$scope.selectConfiguraciones = function(){
    angular.element($("#spinerContainer")).css("display", "block");
    $http.get('../models/selectConfiguraciones.php').success(function(data){
      if(data == "error"){
        $scope.configuraciones = [];
      }else{
        $scope.configuraciones = data;
        
      }
      angular.element($("#spinerContainer")).css("display", "none");
    });
  };
	//Inicializamos las variables 
	 $scope.productos = [];
	 var total = 0, iva = 0;

	 $scope.modalUsuario = function(){
	 	// Debes proveer un controlador y una plantilla.
	 	ModalService.showModal({
	 		templateUrl: "clienteVenta.html",
      		controller: "clienteVentaCtrl"
	 	}).then(function(modal){
	 		modal.close.then(function(result){
	 			// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		$scope.cliente = result;
        		//location.reload();
	 		})
	 	})
	 };

	 $scope.modalProducto = function(){
		//Debes proveer un controlador y una plantilla
		ModalService.showModal({
			templateUrl: "productoFactura.html",
			controller: "productoFacturaCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta funcion
				// y en result tienes el resultado
				$scope.prod = result;
				
			})
		})
	};

	//Parte del codigo donde agregamos los productos a la tabla
	$scope.agregarProducto = function(){
		
		var precio;
		if($scope.price.type == "minorista"){
			precio = $scope.prod.PrecioUnitario;
			$scope.prod.PrecioUnitario = null;
		}else if($scope.price.type == "mayorista"){
			precio = $scope.prod.PrecioMayorista;
			$scope.prod.PrecioMayorista = null;
		}else if($scope.price.type == "promocional"){
			precio = $scope.prod.PrecioPromocional;
			$scope.prod.PrecioPromocional = null;
		}
		for(var i = 0; i < $scope.configuraciones.length; i++){
			if($scope.configuraciones[i]["Nombre"] == "Cantidad mínima" && $scope.configuraciones[i]["Estado"] == "0"){
				if(($scope.prod.CantidadActual - $scope.cantidad) <= $scope.prod.CantidadMinima){
					$scope.msgTitle = 'Atención';
			    	$scope.msgBody  = "El producto "+$scope.prod.Nombre+" llego a la cantidad mínima";
			    	$scope.msgType  = 'warning';
			 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}
			}
		}
		//Calculo del subtotal de cada producto
		var subTotal = precio * $scope.cantidad;
		//iva = subTotal / 10;
		
		//calculo del total de todos los productos
		//total = total + subTotal + iva;
		total = total + subTotal;
		$scope.total = total;
		//alert(total);

		//ubicamos los datos en el array para mostrarlos en la tabla
		$scope.productos.push({idP: $scope.prod.idProductos, nombre: $scope.prod.Nombre, descripcion: $scope.prod.Descripcion,
		 precio: precio, cantidad: $scope.cantidad, subTotal: subTotal});
		$scope.prod.Nombre = null;
		$scope.prod.Descripcion = null;		
		$scope.cantidad = null;
		
	};


	$scope.eliminarProducto = function(producto){

		//restamos del total el producto que fue eliminado 
		//total = total - producto.subTotal - producto.iva;
		total = total - producto.subTotal;
		$scope.total = total;
		//alert(total);
		var pos = $scope.productos.indexOf(producto);
		$scope.productos.splice(pos, 1); //pasamos el indice a ser eliminado (pos) y luego la cantidad de elementos a ser eliminados
		
	};

	$scope.facturar = function(productos, cliente){
			
			var length = productos.length;
		
			//Obtenemos los productos
			var productos = productos;
			
			var detFac = [];

			for ( i=0; i < length; i++){
				 detFac.push({
					id : productos[i].idP,
					precio: productos[i].precio,
					cantidad : productos[i].cantidad,
					subT: productos[i].subTotal,
			 });
			}

			//almacenamos los datos del cliente
			var factura = {
				id: $scope.cliente.id,
				total: $scope.total
			};

			//alert($scope.total);
			var pos = 0;
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertFacturas.php", factura)
			.success(function(res){
				$http.post("../models/detFactura.php", detFac)
					.success(function (res) {
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
				$scope.cliente.id = null;
				$scope.cliente.nombre = null;
				$scope.cliente.apellido = null;
				$scope.cliente.info = null;
				$scope.cliente.user = null;
				$scope.total = null;
				$scope.productos.splice(pos);
			});
			total = 0;
		
	};

})

.controller('clienteVentaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectClientes.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		$scope.clientes = data;
	});

	//La parte donde elegimos el usuario
	$scope.elegir = function(cliente){
		var clientes = {
			nombre: cliente.Nombre,
			apellido: cliente.Apellido,
			info: cliente.Info,
			id: cliente.idCliente
		};
		 // serveData = clientes;
		 // $scope.obj = serveData;
		 //console.log($scope.obj);
		 //console.log(clientes);
		 close(clientes);
	};
})

	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('productoFacturaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProductos.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		$scope.productos = data;
	});

	//La parte donde elegimos el producto
	$scope.elegir = function(producto){
		close(producto);
	};
})