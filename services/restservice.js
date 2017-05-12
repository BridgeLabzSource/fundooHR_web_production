angular.module('mainApp').service('restService', function ($http, $log, $q, localStorageService) {
    // this.baseUrl = "http://fundoohr.bridgelabz.com/api/";
    this.baseUrl = "http://localhost:1337/api/";
    var self = this;

    //    function for httpRequest for all methods
    this.httpRequest = function (path, data,method) {
      var token = localStorageService.get('token');
      console.log(token);
        var deferred = $q.defer();
        var httpObj = {
            method: method,
            url: self.baseUrl + path,
            headers: {'x-access-token': token}
        };
        if(method==="get" || method === "GET")
        httpObj.params=data;
        else {
        httpObj.data = data;
        }
        $http(httpObj).then(function (data) {
            //sending data...
            deferred.resolve(data);
        }, function (msg, code) {
            deferred.reject(msg);
            $log.error(msg, code);
        });
        return deferred.promise;
    };

});
