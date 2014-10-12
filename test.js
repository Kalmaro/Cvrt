var Test = function(){
    var t = '&nbsp&nbsp&nbsp&nbsp';
    var n = '<br/>';
    document.write('<h4>CEVERT TEST:<h4>' + n + n);
    this.weekendTest = function(){
        var drivers = this.getDriversMock();
        var we = new Weekend(new Track('Test Track', 1,2,2),drivers);
        we.qualification();
        we.race();
        we.print();

        var res = we.weekEndResults();
        document.write('Weekend test:' + n + n);
        document.write(this.qualificationToString(res[0], n, t));
        document.write(this.raceToString(res[1], n, t));
    };
    this.championshipTest = function(){
        var _this = this;
        document.write(n + n + 'Championship test:' + n + n);
        var drivers = this.getDriversMock();
        var champ = new Championship('Test champ', 'champ1');

        var tracks = [new Track('Track 1', 1,2,2),
        new Track('Track 2', 1,1,2),
        new Track('Track 3', 1,1,1),
        new Track('Track 4', 1,1,2),
        new Track('Track 5', 2,2,1)];

        tracks.forEach(function(track, index){
            champ.startNewWeekend(track, drivers);
            champ.qualification();
            champ.race();
            var we = champ.getCurrentWeekend();
            var res = we.weekEndResults();
            document.write(n + n + 'Race #' + (index + 1)+ ':' + n + n);
            document.write(_this.qualificationToString(res[0], n, t));
            document.write(_this.raceToString(res[1], n, t));
        });

        var cRes = champ.results();
        var stringRes = 'Driver champ:' + n;
        var drivers = cRes[0];
        var teams = cRes[1];
        drivers.forEach(function(driver, index){
            stringRes += t + (index + 1) + '.' + t + driver.driver.name + t + driver.points + n;
        });

        stringRes += n + 'Team champ:' + n;
        teams.forEach(function(team, index){
            stringRes += t + (index + 1) + '.' + t + team.team.name + t + team.points + n;
        });

        document.write(stringRes);
    };
};

Test.prototype.qualificationToString = function(qualRes, n, t){
    var str ='';
    str = 'Qualification:' + n + n;
    qualRes.forEach(function (d, index) {
        str += t + (index + 1) + t + d.name + t + d.team.name + t + d.qualRes + n;
    });
    return str + n + n;
}

Test.prototype.raceToString = function(raceRes, n, t){
    var str = 'Race:' + n + n;
    raceRes[0].forEach(function (d, index) {
        str += t + (index + 1) + t + d.name + t + d.team.name + t + d.racePos + n;
    });
    str += n + 'Not Classified:' + n + n;
    raceRes[1].forEach(function (d, index) {
        str += t + d.name + t + d.team.name + t + n;
    });
    return str;
};

Test.prototype.getDriversMock = function(){
  return [{
      driver: {name: 'Test pilot 1', id: 'd1'},
      car: new Car('m1', 7,7,7),
      team: {name: 'mclaren', id: 't1'}
  },{
      driver: {name: 'Test pilot 2', id: 'd2'},
      car: new Car('m1', 4,7,5),
      team: {name: 'ferrari', id: 't2'}
  },{
      driver: {name: 'Test pilot 3', id: 'd3'},
      car: new Car('m1', 7,6,6),
      team: {name: 'willhams', id: 't3'}
  },{
      driver: {name: 'Test pilot 4', id: 'd4'},
      car: new Car('m1', 7,8,6),
      team: {name: 'sauber', id: 't4'}
  }];
};


