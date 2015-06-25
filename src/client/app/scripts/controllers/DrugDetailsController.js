'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('DrugDetailsController', ['$scope', '$http','$state', '$stateParams', '$sce', function($scope, $http, $state, $stateParams, $sce) {
        $scope.tab = 1;
        $scope.drugname = $state.params.name;
        $scope.commonDrugsDuringAdverseEvent = {};
        $scope.commonDrugsPieChartData = [];

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

        function onDrugDetailsArrived() {
          console.log('detail result ');
          console.log($scope.result);

          if($scope.result ) {
            if(!$scope.events) {
              $http.get('/REST/search?source=drug'
                + '&type=event'
                + '&field=patient.drug.openfda.spl_id'
                + '&value=' + $stateParams.spl_id
                + '&limit=100').success(function(data) {
                  //console.log(data);
                  if(data.response && data.response.results && data.response.results.length > 0) {
                    $scope.events = data.response.results;
                    onDrugEventsArrived();
                  }
                });
            }
            else {
              onDrugEventsArrived();
            }

            console.log('indications: ' + $scope.result.indications_and_usage[0])
            $scope.indicationListArray = dataSplitter($scope.result.indications_and_usage[0]);
            if($scope.result.contraindications){
            $scope.contraindicationListArray = dataSplitter($scope.result.contraindications[0]);
            } else {
              $scope.contraindicationListArray = [];
            }
            if( $scope.result.drug_abuse_and_dependence){
            $scope.abuseListArray = $scope.result.drug_abuse_and_dependence[0];
            console.log($scope.indicationListArray);
            } else {
              $scope.abuseListArray = {};
            }
          }

          $scope.selectTab = function (setTab){
              $scope.tab = setTab;
          };
          $scope.isSelected = function(checkTab) {
              return $scope.tab === checkTab;
          };
              
         $scope.trustAdverseReactionsAsHtml = function() {
             if($scope.result && $scope.result.adverse_reactions_table){
                return $sce.trustAsHtml($scope.result.adverse_reactions_table[0]); //html content is th binded content.
             }
         };
         
         $scope.toggleDosage = true;
         $scope.$watch('toggleDosage', function(){
             $scope.toggleDosageText = $scope.toggleDosage ? 'Collapse' : 'Expand';
         })

         $scope.toggleInstructions = true;
         $scope.$watch('toggleInstructions', function(){
             $scope.toggleInstructionsText = $scope.toggleInstructions ? 'Collapse' : 'Expand';
         })

         $scope.togglePurpose = true;
         $scope.$watch('togglePurpose', function(){
             $scope.togglePurposeText = $scope.togglePurpose ? 'Collapse' : 'Expand';
         })

         $scope.toggleActiveIngredient = true;
         $scope.$watch('toggleActiveIngredient', function(){
             $scope.toggleActiveIngredientText = $scope.toggleActiveIngredient ? 'Collapse' : 'Expand';
         })

         $scope.toggleConditions = true;
         $scope.$watch('toggleConditions', function(){
             $scope.toggleConditionsText = $scope.toggleConditions ? 'Collapse' : 'Expand';
         })

         $scope.toggleDescription = true;
         $scope.$watch('toggleDescription', function(){
             $scope.toggleDescriptionText = $scope.toggleDescription ? 'Collapse' : 'Expand';
         })
        }



        function onDrugEventsArrived() {
          //console.log($scope.events);
          for(var eventIndex in $scope.events) {
            var event = $scope.events[eventIndex];
            //console.log(event);
            for(var drugIndex in event.patient.drug) {
              var drug = event.patient.drug[drugIndex];
              if(drug.openfda && drug.openfda.generic_name) {
                //console.log(drug);
                for(var genericNameIndex in drug.openfda.generic_name) {
                  var genericName = drug.openfda.generic_name[genericNameIndex];
                  //console.log(genericName);
                  if(!$scope.commonDrugsDuringAdverseEvent[genericName]) {
                    $scope.commonDrugsDuringAdverseEvent[genericName] = 1;
                  }
                  else {
                    $scope.commonDrugsDuringAdverseEvent[genericName]++;
                  }
                }
              }
            }
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
        }

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

