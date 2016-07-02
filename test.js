var Test = function(){
    var t = '&nbsp&nbsp&nbsp&nbsp';
    var n = '<br/>';
    document.write('<h4>CEVERT TEST:<h4>' + n + n);
    this.weekendTest = function(){
        var drivers = this.getDriversMock();
        var we = new Weekend(new Track('Test Track', 1,2,2), drivers);
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
            stringRes += t + (index + 1) + '.' + t + team.team.name() + t + team.points + n;
        });

        document.write(stringRes);
    };
};

Test.prototype.qualificationToString = function(qualRes, n, t){
    var str ='';
    str = 'Qualification:' + n + n;
    qualRes.forEach(function (d, index) {
        str += t + (index + 1) + t + d.name + t + d.team.name() + t + d.qualRes + n;
    });
    return str + n + n;
}

Test.prototype.raceToString = function(raceRes, n, t){
    var str = 'Race:' + n + n;
    raceRes[0].forEach(function (d, index) {
        str += t + (index + 1) + t + d.name + t + d.team.name() + t + d.racePos + n;
    });
    str += n + 'Not Classified:' + n + n;
    raceRes[1].forEach(function (d, index) {
        str += t + d.name + t + d.team.name() + t + n;
    });
    return str;
};

Test.prototype.getDriversMock = function(){
    var teams = {
    };
    teams['Willhams'] = new Team('Willhams', 't1', [new Driver('Massa', 'd1', 0.8), new Driver('Bottas', 'd2', 0.86)], new Car('m1', 7, 7, 7));
    teams['Mclaren'] = new Team('Mclaren', 't2', [new Driver('Magnussen', 'd3', 0.76), new Driver('Button', 'd4', 0.76)], new Car('m1', 7,6,6));
    teams['Mercedes'] = new Team('Mercedes', 't3', [new Driver('Hamilton', 'd5', 0.8), new Driver('Rosberg', 'd6', 0.86)], new Car('m1', 7,7,7));
    teams['Ferrari'] = new Team('Ferrari', 't4', [new Driver('Alonso', 'd7', 0.82), new Driver('Raikonnen', 'd8', 0.9)], new Car('m1', 7,8,8));

    return Object.keys(teams).map(function(k) { return teams[k] });
    return [
        {
      driver: new Driver('Massa', 'd1', 0.8),
      car: new Car('m1', 7,7,7),
      team: {name: 'wilhams', id: 't1'}
  },{
      driver: new Driver('Bottas', 'd2', 0.86),
      car: new Car('m1', 7,7,7),
      team: {name: 'wilhams', id: 't1'}
  },{
      driver: new Driver('Magnussen', 'd3', 0.76),
      car: new Car('m1', 7,6,6),
      team: {name: 'Mclaren', id: 't2'}
  },{
        driver: new Driver('Button', 'd4', 0.76),
        car: new Car('m1', 7,6,6),
        team: {name: 'Mclaren', id: 't2'}
  }, {
        driver: new Driver('Hamilton', 'd5', 0.8),
        car: new Car('m1', 7,8,8),
        team: {name: 'mercedes', id: 't3'}
    },{
        driver: new Driver('Rosberg', 'd6', 0.86),
        car: new Car('m1', 7,7,7),
        team: {name: 'mercedess', id: 't3'}
    },{
        driver: new Driver('Alonso', 'd7', 0.82),
        car: new Car('m1', 7,6,6),
        team: {name: 'Ferrari', id: 't4'}
    },{
        driver: new Driver('Raikonnen', 'd8', 0.9),
        car: new Car('m1', 7,8,8),
        team: {name: 'Ferrari', id: 't4'}
    }]
};

Test.prototype.getParticipantMock = function(){
    var teams = {
    };
    teams['Willhams'] = new Team('Willhams', 't1', [new Driver('Massa', 'd1', 0.8), new Driver('Bottas', 'd2', 0.86)], new Car('m1', 7, 7, 7));
    teams['Mclaren'] = new Team('Mclaren', 't2', [new Driver('Magnussen', 'd3', 0.76), new Driver('Button', 'd4', 0.76)], new Car('m1', 7,6,6));
    teams['Mercedes'] = new Team('Mercedes', 't3', [new Driver('Hamilton', 'd5', 0.8), new Driver('Rosberg', 'd6', 0.86)], new Car('m1', 7,7,7));
    teams['Ferrari'] = new Team('Ferrari', 't4', [new Driver('Alonso', 'd7', 0.82), new Driver('Raikonnen', 'd8', 0.9)], new Car('m1', 7,8,8));
    return [teams['Willhams'], teams['Mclaren'], teams['Mercedes'], teams['Ferrari']];
};


