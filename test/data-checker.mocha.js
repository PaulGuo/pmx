
process.env.DEBUG="axm:smart:checker";

var dataChecker = require('../lib/utils/datachecker.js');
var Plan        = require('./helpers/plan.js');

describe('Smart Data Checker', function() {
  var current_value = 10;

  it('Scenario 0 - handle 0 and linear augmentation', function(done) {

    var dtCheck = new dataChecker({
      timer : 100,
      dev   : 1,
      callback : function() {
        done(new Error('should not be called'));
      },
      refresh : function() {
        return current_value;
      }
    });

    var interval = setInterval(function() {
      current_value++;
    }, 100);


    setTimeout(function() {
      clearInterval(interval);
      dtCheck.stop();

      // Success!
      done();
    }, 15000);
  });

  it('Scenario 1 - slow increment with short anomalies', function(done) {

    var dtCheck = new dataChecker({
      timer : 100,
      dev   : 1,
      callback : function() {
        done(new Error('should not be called'));
      },
      refresh : function() {
        return current_value;
      }
    });

    var interval = setInterval(function() {
      current_value++;

      if (current_value % 30 == 0)
        current_value = 90000;
    }, 100);


    setTimeout(function() {
      clearInterval(interval);
      dtCheck.stop();

      // Success!
      done();
    }, 15000);
  });

  it.skip('Scenario 1 - slow increment with short anomalies', function(done) {

    var dtCheck = new dataChecker({
      timer : 100,
      dev   : 1,
      callback : function() {
        done(new Error('should not be called'));
      },
      refresh : function() {
        return current_value;
      }
    });

    setInterval(function() {
      current_value++;

      if (current_value % 30 == 0)
        current_value = 90000;
    }, 100);

    setTimeout(function() {
      // Success!
      done();
    }, 15000);
  });


});