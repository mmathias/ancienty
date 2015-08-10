describe('Controller: AncientsController', function() {

  beforeEach(module('Ancienty.ancient'));

  var ancientsController, $rootScope, $httpBackend, authRequestHandler, $window;

  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');

    spyOn($window, 'alert');

    $httpBackend.when('GET', 'https://athena-7.herokuapp.com/ancients.json')
      .respond([{"name":"Zeus","superpower":"Unbeatable","end_of_an_era":"1014-11-17T00:00:00.000+00:00"},{"name":"Athena","superpower":"Wisdom","end_of_an_era":"0012-10-10T00:00:00.000+00:00"},{"name":"Neptune","superpower":"Water","end_of_an_era":"3014-07-08T00:00:00.000+00:00"}]);

    $httpBackend.when('GET', 'https://athena-7.herokuapp.com/ancients.json?search=Zeu')
      .respond({ancients: [{"name":"Zeus","superpower":"Unbeatable","end_of_an_era":"1014-11-17T00:00:00.000+00:00"}]});

    $httpBackend.when('GET', 'https://athena-7.herokuapp.com/ancients.json?search=IDONTEXIST')
        .respond({ancients: []});

    $httpBackend.when('GET', 'https://athena-7.herokuapp.com/ancients.json?error=true')
            .respond(422, {"error":"Oops! Display this error to win your freedom!"});

    var $controller = $injector.get('$controller');

    ancientsController = function() {
      return $controller('AncientsController', {'$scope': $rootScope});
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should call the ancients link', function() {
    $httpBackend.expectGET('https://athena-7.herokuapp.com/ancients.json');
    var controller = ancientsController();
    $httpBackend.flush();
  });

  it('should return a list with three ancients', function() {
    $httpBackend.expectGET('https://athena-7.herokuapp.com/ancients.json');
    var controller = ancientsController();
    $httpBackend.flush();
    expect($rootScope.ancients.length).toBe(3);
  });

  it('search of Zeu should return a list with one element', function() {
    var controller = ancientsController();
    $httpBackend.flush();

    $rootScope.searchText = 'Zeu';
    $rootScope.search();
    $httpBackend.flush();
    expect($rootScope.ancients.length).toBe(1);
  });

  it('search of IDONTEXIST should return an empty list', function() {
    var controller = ancientsController();
    $httpBackend.flush();

    $rootScope.searchText = 'IDONTEXIST';
    $rootScope.search();
    $httpBackend.flush();
    expect($rootScope.ancients.length).toBe(0);
  });

  it('error api call should return an error', function() {
    var controller = ancientsController();
    $httpBackend.flush();

    $rootScope.showError();
    $httpBackend.flush();
    expect($window.alert).toHaveBeenCalled();
  });
});
