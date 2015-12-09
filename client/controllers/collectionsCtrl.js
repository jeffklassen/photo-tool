app.controller('CollectionsCtrl', function ($scope, Collections, Analysis, Session) {
    $scope.header = 'sup';
    $scope.error = "";

    var loadAnalysis = function () {
     if ($scope.collection) {
            if (!$scope.collection.analysis && $scope.collection.analysis !== false) {
                Analysis.get({ collectionId: $scope.collection.id }).$promise.then(function (resp) {
                    console.log("HERE", resp);
                    if (typeof resp.analysis !== 'undefined' && resp.analysis !== null) {
                        $scope.collection.analysis = resp.analysis;
                    }
                    else {
                        $scope.collection.analysis = false;
                    }
                });
            }
        }
}

    $scope.$watch('collection', function (collection) {
        if (typeof $scope.collection !== 'undefined' && $scope.collection !== null) {
            // set session information
            var session = { collection: $scope.collection };
            console.log("Session created, returning session")
            Session.setSession(session);
            loadAnalysis();
        }
    });

    Collections.get({ id: 'default' }).$promise.then(function (resp) {
        $scope.collection = resp.collection;
        
        loadAnalysis();
    });

    //console.log($scope.collection)
    $scope.trySubmit = function () {
        $scope.error = "";

        Collections.save({ collectionRootPath: $scope.newCollectionRoot }).$promise.then(function (resp) {
            console.log("HERE", resp);
            $scope.collection = resp.collection
        }, function (err) {
            console.log("ERR", err);
            $scope.error = err.data;
            $scope.newCollectionForm.$submitted = false;
        });
    };

    $scope.startAnalysis = function () {
        Analysis.start({ collectionId: $scope.collection.id }).$promise.then(function (resp) {
            console.log("HERE", resp);
            $scope.collection.analysis = resp.analysis
        }, function (err) {
            console.log("ERR", err);
        });
    };

});