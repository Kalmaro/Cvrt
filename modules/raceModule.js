(function () {
    var module = {
        title: 'race-module-MRS2500E',
        type: 'race',
        version: '1.0'
    };

    function sortPosition(rps) {
        return rps.sort(function (a, b) {
            return a.positionKoeff < b.positionKoeff ? 1 : a.positionKoeff === b.positionKoeff ? 0 : -1;
        });
    }

    function attack(rp1, rp2) {
        console.log('attack:', rp1.p.name, rp1.positionKoeff, rp1.damage, rp1.status, 'vs', rp2.p.name, rp2.positionKoeff, rp2.damage, rp2.status);
        if (Math.round(Math.random())) {
            rp1.positionKoeff = rp1.positionKoeff ^ rp2.positionKoeff;
            rp2.positionKoeff = rp1.positionKoeff ^ rp2.positionKoeff;
            rp1.positionKoeff = rp1.positionKoeff ^ rp2.positionKoeff;
        } else if (Math.randomInt(0, 100) < 10) {
            rp1.damage += Math.randomInt(5, 100);
            rp1.damage > 50 && (rp1.status = 'out');

            rp2.damage += Math.randomInt(5, 100);
            rp2.damage > 50 && (rp2.status = 'out');
            console.log('attack.crash:', rp1.p.name, rp1.positionKoeff, rp1.damage, 'vs', rp2.p.name, rp2.positionKoeff, rp2.damage);
        }
    }

    function start(participants) {
        var racePosition = [];
        participants.forEach(function (p, index) {
            racePosition.push({
                p: p,
                positionKoeff: index * 0.4,
                status: 'inRace',
                damage: 0
            });
        });
        return racePosition;
    }

    function lap(racePositions) {
        racePositions.forEach(function (rp) {
            if (rp.status !== 'out') {
                if (rp.damage > 20) {
                    rp.positionKoeff += rp.p.koeff * Math.randomFloat(0.2, 0.4);
                    rp.damage = 0;
                }
                rp.positionKoeff += rp.p.koeff * Math.randomFloat(0.5, 1);
            }
        });

        for (var i = 1; i < racePositions.length; i++) {
            console.log(racePositions[i - 1].positionKoeff*100, racePositions[i].positionKoeff*100, racePositions[i - 1].positionKoeff*100 - racePositions[i].positionKoeff*100, 30);
            if (Math.abs(racePositions[i - 1].positionKoeff*100 - racePositions[i].positionKoeff*100) < 30) {
                attack(racePositions[i - 1], racePositions[i]);
            }
        }

        return sortPosition(racePositions);
    }

    function separateResults(racePositions){
        return [racePositions.filter(function(rp){
            return rp.status !== 'out';
        }), racePositions.filter(function(rp){
            return rp.status === 'out';
        })];
    }

    module.doRace = function (participants, lapsCount) {
        var racePositions = start(participants);
        while(lapsCount){
            console.log('Lap', lapsCount, ':', racePositions);
            racePositions = lap(racePositions);
            lapsCount--;
        }
        var separatedResults = separateResults(racePositions);
        return [separatedResults[0].map(function(item){
            item.p.positionKoeff = item.positionKoeff;
            return item.p;
        }), separatedResults[1].map(function(item){
            item.p.positionKoeff = item.positionKoeff;
            return item.p;
        })];
    };

    moduleService.addModule(module);
})();
