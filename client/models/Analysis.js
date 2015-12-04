app.factory('Analysis', function ($resource) {
  var Analysis = $resource('/api/analysis/:collectionId', {},
    {
      get: { method: "GET", cache: false },
      start: { method: "POST", cache: false },
      list: { method: "GET", cache: false, isArray: false }
    }
    );
  return Analysis;
});