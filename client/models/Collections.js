app.factory('Collections', function($resource) {
  var Collections = $resource('/api/collections', {},
    {
      save: {method: "POST", cache: false},
      query: {method: "GET", cache: false, isArray: false}
    }
  );
  return Collections;
})