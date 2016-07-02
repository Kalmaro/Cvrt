var Team = function(name, id, drivers, car){
    var name = name,
        drivers = drivers,
        id = id;
        car = car;
    this.driverFirst = function() {return drivers[0]};
    this.driverSecond = function() {return drivers[1]};

    this.drivers = function(drvs){
        drvs && (drivers = drvs);
        return drivers;
    };

    this.name = function(newName){
        newName && (name = newName);
        return name
    };

    this.car = function() {return car;};
    this.id = function() {return id; };
};