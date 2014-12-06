Meteor.startup(function () {
  Npm.require('JSONPath');
  Thermostates.remove({});
});

Meteor.methods({
  checkFhem: function (device) {
    this.unblock();
    return Meteor.http.get("http://media:8083/fhem?cmd=jsonlist2%20"+device+"&XHR=1");
  }
});

Thermostates = new Mongo.Collection("thermostates");
Meteor.publish('thermostates', function () {
  return Thermostates.find();
});

var thermostate = ["EG.BD.HZ.Clima", "EG.WZ.HZ.Clima"];
var rolladen = ["EG.WZ.RO.rechts", "EG.WZ.RO.links"];

Meteor.setInterval( function () {

  for (var i = 0; i < thermostate.length; i++) {
    var result = Meteor.http.get("http://media:8083/fhem?cmd=jsonlist2%20"+thermostate[i]+"&XHR=1");
    var fhem = JSON.parse(result.content);
    var desired = fhem['Results'][0].Readings['desired-temp'].Value;
    var measured = fhem['Results'][0].Readings['measured-temp'].Value;
    var valve = fhem['Results'][0].Readings.ValvePosition.Value;
    Thermostates.upsert({'name': thermostate[i]}, {'name': thermostate[i], 'desired': desired, 'measured': measured, 'valve': valve});
  };

}, 1000 );
