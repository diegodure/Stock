angular.module('reportesBalances',['720kb.datepicker','chart.js'])

    .controller("ReportesBalancesCtrl", function ($scope, $http) {

    //	$scope.calendar = function (date) {
	//	$scope.fecha = date;
	//};

	$scope.labels = ["Compras", "Ganancias", "Ventas"];
  	$scope.data = [];
  	var compras = [];
  	var ventas = [];
  	var sumCompra = 0;
  	var sumVenta = 0; 
  	var resBalance = 0;

	       $scope.etiquetas = [];
        $scope.series = ['Compras', 'Ventas'];


        $scope.datos = [];
       // $scope.datos = [
          //  [65, 59, 80, 81],
          //  [28, 48, 40, 19]
       // ];
	
        $scope.report = function (date1,date2) {
              $scope.datos = [];
              $scope.data = [];
              $scope.etiquetas = [];
              compras = [];
              ventas = [];
              sumCompra = 0;
              sumVenta = 0; 
              resBalance = 0;
              var fechas = {
                fecha1: date1,
                fecha2: date2
              };

              $http.post('../models/selectVenta.php', fechas).success(function (data) {
                  $scope.ventas = data;
                  for (var i = $scope.ventas.length - 1; i >= 0; i--) {
                  	$scope.etiquetas.push($scope.ventas[i]["Fecha"]);
                  	ventas.push($scope.ventas[i]["Total"]);
                  	var num = parseInt($scope.ventas[i]["Total"]);
                  	sumVenta = sumVenta + num;
                  	
                  }
                  
              });

              $http.post('../models/selectCompra.php', fechas).success(function (data) {
                  $scope.compras = data;
                  for (var i = $scope.compras.length - 1; i >= 0; i--) {
                  	compras.push($scope.compras[i]["Total"]);
                  	var num = parseInt($scope.compras[i]["Total"])
                  	sumCompra = sumCompra + num;
                  	
                  	resBalance = sumVenta - sumCompra;
                  	$scope.data.push(sumCompra,resBalance,sumVenta);
           			console.log($scope.data);
                  }
                
              });

               $scope.datos.push(compras,ventas);
               sumCompra = 0;
               sumVenta = 0; 
               resBalance = 0;

               
        };

    });



