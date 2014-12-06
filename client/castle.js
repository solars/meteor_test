Thermostates = new Mongo.Collection("thermostates");
Meteor.subscribe("thermostates");

Template.body.helpers({
  thermostates: function () {
    return Thermostates.find({});
  }
});

//var thermostate = ["EG.BD.HZ.Clima", "EG.WZ.HZ.Clima"];

//for (var i = 0; i < thermostate.length; i++) {
  //var list = [];
  //Meteor.call("checkFhem", thermostate[i], function(error, result) {
    //var fhem = JSON.parse(result.content);
    ////console.log(jsonPath.eval(fhem, "$..[?Name=\"EG.BD.HZ.Clima\"]"));
    ////  console.log(fhem);

    //var desired = fhem['Results'][0].Readings['desired-temp'].Value;
    //var measured = fhem['Results'][0].Readings['measured-temp'].Value;
    //var valve = fhem['Results'][0].Readings.ValvePosition.Value;
    //list.push({'name': thermostate[i], 'desired': desired, 'measured': measured, 'valve': valve});
    //Session.set('thermos', list);
  //});

//}

//Template.thermos.thermostates = function() {
  //return Session.get("thermos") || [];
//};

Meteor.startup(function(){
  heartBeat = Thermostates.find({});
  heartBeat.observeChanges({
    changed: function(){
      $( "#heart" ).animate({ opacity: 1 }, 150, function() {
        $( "#heart" ).animate({ opacity: 0.4 }, 150, function() { });
      });
    }
  });

});

$(document).ready(function(){
  $('#heart').popup({
    inline   : true,
    hoverable: true,
    position : 'bottom left',
    delay: {
      show: 100,
      hide: 100
    }
  });
});
