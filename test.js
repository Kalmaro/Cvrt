var Test = function(){
    var t = '&nbsp&nbsp&nbsp&nbsp';
    var n = '<br/>';
    this.weekendTest = function(){
        var drivers = this.getDriversMock();
        var we = new Weekend(new Track('Test Track', 1,2,2),drivers);
        we.qualification();
        we.race();
        we.print();

        var res = we.weekEndResults();
        document.write(this.qualificationToString(res[0], n, t));
        document.write(this.raceToString(res[1], n, t));
    };
};

Test.prototype.qualificationToString = function(qualRes, n, t){
    var str ='';
    str = 'Qualification:' + n + n;
    qualRes.forEach(function (d, index) {
        str += t + (index + 1) + t + d.name + t + d.team + t + d.qualRes + n;
    });
    return str + n + n;
}

Test.prototype.raceToString = function(raceRes, n, t){
    var str = 'Race:' + n + n;
    raceRes[0].forEach(function (d, index) {
        str += t + (index + 1) + t + d.name + t + d.team + t + d.racePos + n;
    });
    str += n + 'Not Classified:' + n + n;
    raceRes[1].forEach(function (d, index) {
        str += t + d.name + t + d.team + t + n;
    });
    return str;
};

Test.prototype.getDriversMock = function(){
  return [{
      driver: {name: 'Test pilot 1'},
      car: new Car('m1', 7,7,7),
      team: {name: 'mclaren'}
  },{
      driver: {name: 'Test pilot 2'},
      car: new Car('m1', 4,7,5),
      team: {name: 'ferrari'}
  },{
      driver: {name: 'Test pilot 3'},
      car: new Car('m1', 7,6,6),
      team: {name: 'willhams'}
  },{
      driver: {name: 'Test pilot 4'},
      car: new Car('m1', 7,8,6),
      team: {name: 'sauber'}
  }];
};


