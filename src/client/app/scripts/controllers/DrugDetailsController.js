// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('DrugDetailsController', ['$scope', '$http', '$filter', '$state', '$stateParams', '$sce', function($scope, $http, $filter, $state, $stateParams, $sce) {
        $scope.tab = 1;
        $scope.drugname = $state.params.name;
        $scope.value = $filter('title')($stateParams.value);
        $scope.commonDrugsDuringAdverseEvent = {};
        $scope.commonDrugsPieChartData = [];
        $scope.pieChartDataIsHere = function() {
          return $scope.commonDrugsPieChartData.length > 0;
        };

        if($stateParams.drugDetails) {
          $scope.result = $stateParams.drugDetails;
          onDrugDetailsArrived();
        }
        else {
          $http.get('/REST/search?source=drug'
            + '&type=label'
            + '&field=openfda.spl_id'
            + '&value=' + $stateParams.spl_id
            + '&limit=100').success(function(data) {
              if(data.response.results && data.response.results.length > 0) {
                $scope.result = data.response.results[0];
                onDrugDetailsArrived();
              }
            });

        }
        function onDrugEventsArrived() {
          if($scope.events) {
            $scope.events.forEach(function(event) {
              if(event.patient && event.patient.drug) {
                event.patient.drug.forEach(function(drug) {
                  if(drug.openfda && drug.openfda.generic_name) {
                  drug.openfda.generic_name.forEach(function(genericName) {
                    if(!$scope.commonDrugsDuringAdverseEvent[genericName]) {
                      $scope.commonDrugsDuringAdverseEvent[genericName] = 1;
                    }
                    else {
                      $scope.commonDrugsDuringAdverseEvent[genericName]++;
                    }
                  });
                }
              });
            }
          });
        }

        $scope.commonDrugsDuringAdverseEvent[$scope.result.openfda.generic_name] = null;
        var temp = [];
        for(var name in $scope.commonDrugsDuringAdverseEvent) {
          if($scope.commonDrugsDuringAdverseEvent.hasOwnProperty(name)) {
            temp.push([
              name,
              $scope.commonDrugsDuringAdverseEvent[name]
            ]);
          }
        }

        $scope.commonDrugsPieChartData = temp.sort(function(a, b) {
          return b[1] - a[1];
        }).slice(0, 10);
      };

      function startWatch() {
               $scope.toggleDescription = true;
               $scope.$watch('toggleDescription', function(){
                   $scope.toggleDescriptionText = $scope.toggleDescription ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleDosage = true;
               $scope.$watch('toggleDosage', function(){
                   $scope.toggleDosageText = $scope.toggleDosage ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleInstructions = true;
               $scope.$watch('toggleInstructions', function(){
                   $scope.toggleInstructionsText = $scope.toggleInstructions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.togglePurpose = true;
               $scope.$watch('togglePurpose', function(){
                   $scope.togglePurposeText = $scope.togglePurpose ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleActiveIngredient = true;
               $scope.$watch('toggleActiveIngredient', function(){
                   $scope.toggleActiveIngredientText = $scope.toggleActiveIngredient ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleConditions = true;
               $scope.$watch('toggleConditions', function(){
                   $scope.toggleConditionsText = $scope.toggleConditions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleBoxedWarning = true;
               $scope.$watch('toggleBoxedWarning', function(){
                   $scope.toggleBoxedWarningText = $scope.toggleBoxedWarning ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleDoNotUseIf = true;
               $scope.$watch('toggleDoNotUseIf', function(){
                   $scope.toggleDoNotUseIfText = $scope.toggleDoNotUseIf ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleContraindications = true;
               $scope.$watch('toggleContraindications', function(){
                   $scope.toggleContraindicationsText = $scope.toggleContraindications ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleDrugInteractions = true;
               $scope.$watch('toggleDrugInteractions', function(){
                   $scope.toggleDrugInteractionsText = $scope.toggleDrugInteractions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleAdverseReactions = true;
               $scope.$watch('toggleAdverseReactions', function(){
                   $scope.toggleAdverseReactionsText = $scope.toggleAdverseReactions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleStopUse = true;
               $scope.$watch('toggleStopUse', function(){
                   $scope.toggleStopUseText = $scope.toggleStopUse ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleAskADoctor = true;
               $scope.$watch('toggleAskADoctor', function(){
                   $scope.toggleAskADoctorText = $scope.toggleAskADoctor ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleAskPharmacist = true;
               $scope.$watch('toggleAskPharmacist', function(){
                   $scope.toggleAskPharmacistText = $scope.toggleAskPharmacist ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.toggleWarnings = true;
               $scope.$watch('toggleWarnings', function(){
                   $scope.toggleWarningsText = $scope.toggleWarnings ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

               $scope.togglePrecautions = true;
               $scope.$watch('togglePrecautions', function(){
                   $scope.togglePrecautionsText = $scope.togglePrecautions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
               });

              $scope.toggleWarningsAndPrecautions = true;
              $scope.$watch('toggleWarningsAndPrecautions', function(){
                  $scope.toggleWarningsAndPrecautionsText = $scope.toggleWarningsAndPrecautions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
              });

              $scope.toggleGeneralPrecautions = true;
              $scope.$watch('toggleGeneralPrecautions', function(){
                  $scope.toggleGeneralPrecautionsText = $scope.toggleGeneralPrecautions ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
              });

              $scope.toggleDrugAbuseAndDependency = true;
              $scope.$watch('toggleDrugAbuseAndDependency', function(){
                  $scope.toggleDrugAbuseAndDependencyText = $scope.toggleDrugAbuseAndDependency ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
              });

              $scope.toggleUserSafetyWarning = true;
              $scope.$watch('toggleUserSafetyWarning', function(){
                  $scope.toggleUserSafetyWarningText = $scope.toggleUserSafetyWarning ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
              });

              $scope.toggleUserSafetyWarning = true;
              $scope.$watch('toggleUserSafetyWarning', function(){
                  $scope.toggleUserSafetyWarningText = $scope.toggleUserSafetyWarning ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
              });

              $scope.toggleAdverseEventChart = true;
              $scope.$watch('toggleAdverseEventChart', function(){
                  $scope.toggleAdverseEventChartText = $scope.toggleAdverseEventChart ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-left';
              });
      };

      function onDrugDetailsArrived() {
        if($scope.result ) {
          if(!$scope.events) {
          $http.get('/REST/search?source=drug'
            + '&type=event'
            + '&field=patient.drug.openfda.spl_id'
            + '&value=' + $stateParams.spl_id
            + '&limit=100').success(function(data) {
              if(data.response && data.response.results && data.response.results.length > 0) {
                $scope.events = data.response.results;
                onDrugEventsArrived();
              }
            });
          }
          else {
            onDrugEventsArrived();
          }
          if($scope.result.indications_and_usage){
            $scope.indicationListArray = dataSplitter($scope.result.indications_and_usage[0]);
          }
          else {
            $scope.indicationListArray = [];
          }
          if($scope.result.contraindications){
            $scope.contraindicationListArray = dataSplitter($scope.result.contraindications[0]);
          }
          else {
            $scope.contraindicationListArray = [];
          }
          if( $scope.result.drug_abuse_and_dependence){
            $scope.abuseListArray = $scope.result.drug_abuse_and_dependence[0];
          }
          else {
            $scope.abuseListArray = {};
          }
          if(!$scope.result.active_ingredient || $scope.result.active_ingredient.length < 1){
            $scope.result.active_ingredient = $scope.result.openfda.substance_name;
          }
        }

        $scope.tabName = $state.params.tabName?$state.params.tabName:'General Info';
        $scope.tab = $scope.tabName === 'General Info'?1:2;

        $scope.isSelected = function(checkTab) {
          return $scope.tab === checkTab;
        };

        $scope.trustAdverseReactionsAsHtml = function() {
          if($scope.result && $scope.result.adverse_reactions_table){
            return $sce.trustAsHtml($scope.result.adverse_reactions_table[0]); //html content is th binded content.
          }
        };

        startWatch();
      };
  }]);

function dataSplitter(toParse) {	
    //Split the data into multiple bulleted lists each starting with a header
    var bullet = String.fromCharCode(8226);
    var elements=toParse.split(bullet);
    var listArray = [];
    var list = {};
    list.list = [];
    for(var i = 0; i < elements.length; i++) {
      var trimmed = elements[i].trim();
      if(trimmed.endsWith(':')) {
        //if there is already data start a new indicationList
        if(list.list.length > 0) {
          listArray.push(list);
          list = {};
          list.list = [];
        }
        list.header = trimmed;
      } else if(trimmed.length > 0) {
        list.list.push(trimmed);
      }
    }
    //copy the last list into the object
    listArray.push(list);
    return listArray;
};
