var Championship = function(title, id){
    var weekends = [];
    var driverChamp = {};
    var teamChamp = {};
    var currentRace = null;
    function push(weekend){
        weekends.push(weekend);
    };
    this.startNewWeekend = function(track, participants){
        currentRace = new Weekend(track, participants);
        weekends.push(currentRace);
    };
    this.reset = function(){
        driverChamp = [];
        teamChamp = [];
    };
    this.getCurrentWeekend = function(){
        return currentRace;
    };
    this.weekends = function(){
        return weekends;
    };
    this.addPoints = function(driver, points){
        var drvr = driverChamp[driver.id];
        if(drvr){
            drvr.points += points;
        } else {
            driverChamp[driver.id] = {
                driver: driver,
                points: points
            };
        }
        var team = teamChamp[driver.team.id()];
        if(team){
            team.points += points;
        } else {
            teamChamp[driver.team.id()] = {
                team: driver.team,
                points: points
            };
        }
    };
    this.results = function(){
        var sortPredicat = function(d1, d2){
            return d1.points < d2.points ? 1 : d1.points > d2.points ? -1 : 0;
        };
        var drivers = [];
        var teams = [];
        this.countPoints();
        for(var d in driverChamp){
            drivers.push(driverChamp[d]);
        }

        drivers.sort(function(d1, d2){
          return sortPredicat(d1,d2);
        });

        for(var t in teamChamp){
            teams.push(teamChamp[t]);
        }

        teams.sort(function(d1, d2){
            return sortPredicat(d1, d2);
        });
        return [drivers, teams];
    };
};

Championship.prototype.qualification = function(){
    var currentWeekend = this.getCurrentWeekend();
    return currentWeekend.qualification();
};

Championship.prototype.race = function(){
    var currentWeekend = this.getCurrentWeekend();
    return currentWeekend.race();
};

Championship.prototype.countPoints = function(){
    var _this = this;
    this.reset();
    var weekends = this.weekends();
    weekends.forEach(function(weekend){
       var raceRes = weekend.weekEndResults()[1][0];
       raceRes.forEach(function(driver, index){
            switch (index){
                case 0:
                    _this.addPoints(driver, 20)
                    break;
                case 1:
                    _this.addPoints(driver, 16);
                    break;
                case 2:
                    _this.addPoints(driver, 12);
                    break;
                case 3:
                    _this.addPoints(driver, 8);
                    break;
                case 4:
                    _this.addPoints(driver, 4);
                    break;
                case 5:
                    _this.addPoints(driver, 1);
                    break;
                default:
                    _this.addPoints(driver, 0);
                    break;
            }
       });
    });
};

