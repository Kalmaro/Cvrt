
var Race = function(drivers){
    this.drivers = drivers;

    var classified = [];
    var notClassified = [];

    var preResults = function(){
        drivers.forEach(function(driver){
            var rand = Math.randomInt(0,10);
            if(rand < 3){
                driver.racePos = null;
            } else{
                driver.racePos *= Math.random();
                console.log(driver.racePos);
            }
        });
    };

    var results = function(){
        drivers.forEach(function(driver){
            if(!driver.racePos){
                notClassified.push(driver);
                return;
            }
            var rand = Math.randomFloat(0.5, 1);
            driver.racePos -= driver.koeff * rand;
            classified.push(driver);
        });
    };

    this.doRace = function(){
        preResults();
        results();
        classified.sort(function(d1,d2){
            return d1.racePos < d2.racePos ? -1 : d1.racePos > d2.racePos ? 1 : 0;
        });
        return [classified, notClassified];
    };

    this.print = function(){
        console.log('Race results: \n  Classified:');
        classified.forEach(function(driver,index){
            console.log(index + 1 + '.  ' + driver.name + '\t' + driver.team.name + '\t' + driver.racePos);
        });
        console.log('Not Classified');
        notClassified.forEach(function(driver,index){
            console.log('\t  ' + driver.name + '\t' + driver.team.name + '\t' + driver.racePos);
        });
    }
};

Race.prototype.version = function(){
    return '1.0';
};
