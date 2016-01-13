var app = angular.module('myApp', []);

app.controller("mainController", ['$scope', '$http', function($scope, $http){
    $scope.assignment = {};
    $scope.assignments = [];

    //Let's us know if we are in 'update mode'
    $scope.update = false;

    var fetchAssignments = function() {
        return $http.get('/findAssignments').then(function(response){
            if(response.status !== 200){
                throw new Error('Where dem assignmnets, yo?');
            }
            $scope.assignments = response.data;
            console.log("Got some assignments for ya guv");
            return response.data;
        })
    };

    $scope.addAssignment = function(assignment){
        $http.post('/createAssignment', assignment).then(fetchAssignments());
        $scope.assignment = {};
    };

    $scope.deleteAssignment = function(id) {
        $scope.update = false;
        $http.delete('/deleteAssignment/' + id).then(fetchAssignments());
        $scope.assignment = {};
    };

    $scope.updateAssignment = function(assignment){
        $scope.update = false;
        $http.put('/updateAssignment', assignment).then(function(response){
            if(response.status !== 200){
                throw new Error('Where dem assignments, yo?');
            }
            $scope.assignment = {};
            $scope.assignments = response.data;
            console.log("Got some assignments for ya guv");
            return response.data;
        });
    };

    $scope.updateMode = function(id) {
        $scope.update = true;
        $scope.assignment = $http.get('/findAssignments/'+id).then(function(response){
            if(response.status !== 200){
                throw new Error('Where dem assignmnets, yo?');
            }
            $scope.assignment = {};
            $scope.assignment = response.data[0];

            $scope.assignment.id = id;


            return response.data;
        });
    };

    $scope.beingUpdated = function(id) {
        if ($scope.assignment.id == id) {
            return 'beingUpdated';
        } else {
            return '';
        }
    };


    fetchAssignments();
    setInterval(fetchAssignments, 5000);

}]);


