angular.module('reportesBalances',['720kb.datepicker','chart.js'])

    .controller("ReportesBalancesCtrl", function ($scope, $http) {

    //	$scope.calendar = function (date) {
	//	$scope.fecha = date;
	//};

	$scope.labels = ["Compras", "Ventas", "Ganancias"];
  	$scope.data = [];
  	var compras = [];
  	var ventas = [];
  	var sumCompra = 0;
  	var sumVenta = 0; 
  	var resBalance = 0;
    var dateBackup = 0;

	       $scope.etiquetas = [];
        $scope.series = ['Compras', 'Ventas'];


        $scope.datos = [];
       // $scope.datos = [
          //  [65, 59, 80, 81],
          //  [28, 48, 40, 19]
       // ];
	
        $scope.report = function (date1,date2) {
            var line = document.getElementById("mylineGraph").getContext("2d");

              $scope.datos = [];
              $scope.data = [];
              $scope.etiquetas = [];
              compras = [];
              ventas = [];
              sumCompra, sumTotalCompra = 0;
              sumVenta, sumTotalVenta = 0; 
              resBalance = 0;
              dateBackup = 0;
              var fechas = {
                fecha1: date1,
                fecha2: date2
              };
              angular.element($("#spinerContainer")).css("display", "block");
              $http.post('../models/selectVenta.php', fechas).success(function (data) {
                  $scope.ventas = data;
                  console.log($scope.ventas)
                  var num = 0;
                  var dateCompare = 0;
                  for (var i = $scope.ventas.length - 1; i >= 0; i--) {
                    if(dateBackup == 0){
                      $scope.etiquetas.push($scope.ventas[i]["Fecha"]);
                      num = parseInt($scope.ventas[i]["Total"]);
                      sumVenta = sumVenta + num;
                      dateBackup = $scope.ventas[i]["Fecha"];
                    }else{
                      if(dateBackup == $scope.ventas[i]["Fecha"]){
                        num = parseInt($scope.ventas[i]["Total"]);
                        sumVenta = sumVenta + num;
                        dateBackup = $scope.ventas[i]["Fecha"];
                      }else{
                        ventas.push(sumVenta);
                        $scope.etiquetas.push($scope.ventas[i]["Fecha"]);
                        sumTotalVenta = sumTotalVenta + sumVenta;
                        sumVenta = 0;
                        dateBackup = $scope.ventas[i]["Fecha"];
                        num = parseInt($scope.ventas[i]["Total"]);
                        sumVenta = sumVenta + num;                        
                      }
                      if(i == 0){
                        sumTotalVenta = sumTotalVenta + sumVenta;
                        ventas.push(sumVenta);
                        
                      }
                    }

                  }
                  ventas.reverse();
                  ventas.push(0);
              });
              $http.post('../models/selectCompra.php', fechas).success(function (data) {
                    angular.element($("#spinerContainer")).css("display", "none");
                    $scope.compras = data;
                    var num2 = 0;
                    dateBackup = 0;
                    
                    var array = [];
                    for (var i = 0; i < $scope.compras.length; i++) {
                        var igual=false;
                         for (var j = 0; j < $scope.etiquetas.length & !igual; j++) {
                             if($scope.compras[i]['Fecha'] == $scope.etiquetas[j]) 
                                     igual=true;
                         }
                        if(!igual)array.push($scope.compras[i]['Fecha']);
                    }
                    

                    for (var i = $scope.compras.length - 1; i >= 0; i--) {
                      if(dateBackup == 0){
                        num2 = parseInt($scope.compras[i]["Total"]);
                        sumCompra = sumCompra + num2;
                        dateBackup = $scope.compras[i]["Fecha"];
                      }else{
                        if(dateBackup == $scope.compras[i]["Fecha"]){
                          num2 = parseInt($scope.compras[i]["Total"]);
                          sumCompra = sumCompra + num2;
                          dateBackup = $scope.compras[i]["Fecha"];
                        }else{
                          compras.push(sumCompra);
                          sumTotalCompra = sumTotalCompra + sumCompra;
                          sumCompra = 0;
                          dateBackup = $scope.compras[i]["Fecha"];
                          num2 = parseInt($scope.compras[i]["Total"]);
                          sumCompra = sumCompra + num2;                        
                        }
                        if(i == 0){
                          sumTotalCompra = sumTotalCompra + sumCompra;
                          compras.push(sumCompra);
                          
                        }
                      }
                    }
                    compras.reverse();
                    compras.push(0);
                    resBalance = sumTotalVenta - sumTotalCompra;
                    $scope.data.push(sumTotalCompra,sumTotalVenta,resBalance);
                    $scope.datos.push(compras,ventas);
                    console.log(compras);
                    console.log(ventas)
                    var a = $scope.etiquetas.reverse();
                    
              
                var mylineGraph = new Chart(line, {
                  type: "line",
                  data: {
                    labels: a/*La linea de tiempo a mostrarse en el grafico*/,
                    datasets: [
                      {
                        label: "COMPRAS",
                        data: compras,
                        fill: true,
                        borderColor: "rgba(55, 130, 220, .65)",
                        backgroundColor: "rgba(55, 130, 220, 0.1)",
                        lineTension: 0,
                        pointBorderWidth: 2,
                        borderDash: [5, 5],
                        pointStyle: "rectRounded"
                      },
                      {
                        label: "VENTAS",
                        data: ventas,
                        fill: false,
                        borderColor: "rgba(245, 35, 56, .65)",
                        lineTension: 0,
                        pointBorderWidth: 2,
                        pointStyle: "rectRounded"
                      }
                    ]
                  },
                  options: {
                    title: {
                      display: true,
                      text: "Gráficos de compras y ventas"
                    },
                    plugins: {
                     datalabels: {
                       display: false
                     }
                    }
                  }
                });
              });
              
          
              
        };

    });



