app.factory('Collections', function($resource) {
  var Collections = $resource('/api/collections/:id', {},
    {
      get: {method: "GET", cache: false},
      save: {method: "POST", cache: false},
      list: {method: "GET", cache: false, isArray: false}
    }
  );
  return Collections;
})