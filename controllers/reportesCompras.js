angular.module('reportesCompras',['720kb.datepicker'])

    .controller("ReportesComprasCtrl", function ($scope, $http) {

    //	$scope.calendar = function (date) {
	//	$scope.fecha = date;
	//};
        $scope.report = function (date1,date2) {
            
              var fechas = {
                fecha1: date1,
                fecha2: date2
              };
              angular.element($("#spinerContainer")).css("display", "block");
              $http.post('../models/selectCompra.php', fechas).success(function (data) {
                  $scope.compras = data;
                  angular.element($("#spinerContainer")).css("display", "none");
              });
            
        };


        $scope.showPurchase = function (compra) {
          
          var compra = {
            idVenta: compra.idCompras,
            fecha: compra.Fecha
          };
          angular.element($("#spinerContainer")).css("display", "block");
          $http.post('../models/selectCompraDetalle.php', compra).success(function (data) {
                  $scope.detCompra = data;
                  angular.element($("#spinerContainer")).css("display", "none");
              });
       };

    });



