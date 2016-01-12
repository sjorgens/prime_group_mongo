var app = angular.module('myApp', []);

app.controller("mainController", ['$scope', '$http', function($scope, $http){
    $scope.assignment = {};
    $scope.assignments = [];
    $scope.update = false;

    var fetchAssignments = function() {
        return $http.get('/findAssignments').then(function(response){
            if(response.status !== 200){
                throw new Error('Where dem assignmnets, yo?');
            }
            $scope.assignment = {};
            $scope.assignments = response.data;
            //console.log($scope.assignments[0]["_id"]);
            return response.data;
        })
    };

    $scope.addAssignment = function(assignment){
        return $http.post('/createAssignment', assignment).then(fetchAssignments());
    };

    $scope.deleteAssignment = function(id) {
        return $http.delete('/deleteAssignment/' + id).then(fetchAssignments());
    };

    $scope.updateAssignment = function(assignment){
        $scope.update = false;
        return $http.put('/updateAssignment', assignment).then(fetchAssignments());
    };

    $scope.updateMode = function(id) {
        $scope.update = true;
        $scope.assignment = $http.get('/findAssignments/'+id).then(function(response){
            if(response.status !== 200){
                throw new Error('Where dem assignmnets, yo?');
            }
            $scope.assignment = {};
            $scope.assignments = response.data;

            $scope.assignment.id = id;
            $scope.assignment.assignment_number = $scope.assignments[0].assignment_number;
            $scope.assignment.student_name = $scope.assignments[0].student_name;
            $scope.assignment.score = $scope.assignments[0].score;
            $scope.assignment.date_completed = $scope.assignments[0].date_completed;

            return response.data;
        });
    };

    fetchAssignments();

}]);


