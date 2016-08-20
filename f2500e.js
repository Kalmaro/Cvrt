var f2500eWeekend = function(){
    var self = this;

    var data = null;
    var drivers = null;
    var teams = {};
    var cars = {};
    var engines = {};

    function partJsonMap(part){
        return {
            driverId: part.id,
            teamId: part.team.id()
        };
    }

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
        var dbJson = {
            qual: resultToSave.qual.map(partJsonMap),
            race: resultToSave.race.map(partJsonMap),
            out: resultToSave.out.map(partJsonMap)
        };
        console.log(resultToSave);
        console.log(JSON.stringify(dbJson));
        return resultToSave;
    };

    this.print = function(res){
        var sep = ' | ';
        var str = '<h1>Qual:</h1>';
        str += '<ul>';

        res.qual.forEach(function(res, index){
            str += '<li><span>' + (index + 1) + '</span><span>' + sep + res.name + '</span><span>'
                + sep + res.team.name() + '</span><span>' + sep + res.team.car().title() + '</span><span>' + sep + res.qualRes + '</span><span></li>';
        });

        str += '</br></br>';
        str += '<h1>Race results:</h1>';

        res.race.forEach(function(res, index){
            str += '<li><span>' + (index + 1) + '</span><span>'  + sep + res.name + '</span><span>'
                + sep + res.team.name() + '</span><span>' + sep + res.team.car().title() + '</span><span>' + sep + res.positionKoeff + '</span><span></li>';
        });

        str += '</br></br>';
        str += '<h1>Out:</h1>';

        res.out.forEach(function(res, index){
            str += '<li><span>' + (index + 1) + '</span><span>'  + sep + res.name + '</span><span>'
                + sep + res.team.name() + '</span><span>' + sep + res.team.car().title() + '</span><span>' + sep + res.positionKoeff + '</span><span></li>';
        });

        document.body.innerHTML += str;
    };
};