var Weekend = function (track, participants) {
    var drivers = [];
    var qualRes = null;
    var racerRes = null;
    participants.forEach(function (p) {
        var trackKs = track.koeff();
        var carKs = p.car.koeff();
        drivers.push({
            name: p.driver.name,
            team: p.team.name,
            koeff: (trackKs[0] * carKs[0] + trackKs[1] * carKs[1] + trackKs[2] * carKs[2]) / 3
        });
    });

    this.qualification = function () {
        var qual = new Qualification(drivers);
        qualRes = qual.doQualification();
        return qualRes;
    };

    this.race = function () {
        if (!qualRes) {
            console.log('Do qual before!');
            return;
        }
        var race = new Race(qualRes);
        racerRes = race.doRace();
        return racerRes;
    };

    this.weekEndResults = function () {
        return [qualRes, racerRes];
    };
};

Weekend.prototype.version = function () {
    return '1.0';
};

Weekend.prototype.print = function () {
    var wRes = this.weekEndResults();
    if (wRes[0]) {
        console.log('Qualification:\n');
        wRes[0].forEach(function (d, index) {
            console.log('\t' + (index + 1) + '.\t' + d.name + '\t' + d.team + '\t' + d.qualRes + '\n');
        });

        if (wRes[1]) {
            console.log('Race:\n');
            wRes[1][0].forEach(function (d, index) {
                console.log('\t' + (index + 1) + '.\t' + d.name + '\t' + d.team + '\t' + d.racePos + '\n');
            });
            console.log('Not Classified:\n');
            wRes[1][1].forEach(function (d, index) {
                console.log('\t' + (index + 1)+ '.\t' + d.name + '\t' + d.team + '\n');
            });
        }
    } else {
        console.log('No results!');
    }
};
