angular.module('reportesVentas',['720kb.datepicker'])

    .controller("ReportesVentasCtrl", function ($scope, $http) {

    //	$scope.calendar = function (date) {
	//	$scope.fecha = date;
	//};
        $scope.report = function (date1,date2) {
            
              var fechas = {
                fecha1: date1,
                fecha2: date2
              };
              angular.element($("#spinerContainer")).css("display", "block");
              $http.post('../models/selectVenta.php', fechas).success(function (data) {
                  $scope.ventas = data;
                  angular.element($("#spinerContainer")).css("display", "none");
              });
            
        };


        $scope.showSell = function (venta) {
          
          var venta = {
            idVenta: venta.idVentas,
            fecha: venta.Fecha
          };
          angular.element($("#spinerContainer")).css("display", "block");
          $http.post('../models/selectVentaDetalle.php', venta).success(function (data) {
                  $scope.detVenta = data;
                  angular.element($("#spinerContainer")).css("display", "none");
              });
       };

    });



