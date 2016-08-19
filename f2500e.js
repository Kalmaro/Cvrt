var f2500eWeekend = function(){
    var self = this;

    var data = null;
    var drivers = null;
    var teams = {};
    var cars = {};
    var engines = {};



    this.init = function(){
        return moduleService.loadJsonData('f2500edata').then(function(d){
            data = d;

            data.eng.forEach(function(engine){
                engines[engine.id] = engine;
            });

            data.und.forEach(function(car){
                cars[car.id] = car;
            });

            data.team.forEach(function(team){
                teams[team.id] = team;
            });

            drivers = data.drivers.map(function(driver){
                var team = teams[driver.teamId];
                console.log(!!team, driver);
                var car = cars[team.undId];
                var eng = engines[team.engId];
                return {
                    driver: new Driver(driver.name, driver.id, driver.talent),
                    car: new Car(car.id, car.und, car.aero, eng.power),
                    team: team
                }
            });
        });
    };

    this.getParticipants = function(){
        if(!data){
            throw new Error('load data first');
        }

        var part = [];
        for(var team in teams){
            var teamDrivers = drivers.filter(function (driver){
                return driver.team.id === team;
            });
            part.push(new Team(teams[team].name, teams[team].id, teamDrivers.map(function(dr){ return dr.driver}),  teamDrivers[0].car));
        }

        return part;

        //teams['Willhams'] = new Team('Willhams', 't1', [new Driver('Massa', 'd1', 0.8), new Driver('Bottas', 'd2', 0.86)], new Car('m1', 7, 7, 7));
    };

    this.weekend = function(){
        if(!data){
            throw new Error('load data first');
        }

        var we = new Weekend(new Track(data.track, data.track.und, data.track.aero, data.track.eng), self.getParticipants());
        we.qualification();
        we.race();
        var res = we.weekEndResults();
        var resultToSave = {
            qual: res[0],
            race: res[1][0],
            out: res[1][1]
        };
        console.log();
    };
}