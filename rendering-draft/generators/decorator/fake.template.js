import fs from 'fs';
<%= file %>

var stringMagic = function() {
  var chain = "",
      self = this;
  self.toString = function () { return chain; }; // Where the real magic happens.
  self.add = function(str) {
      chain += str + " ";
      return self;
  };
};


<%= file2 %>

var magi = new stringMagic();
alert(magi.add("hello").add("world")); // Alerts, "hello world"
magi.add("and").add("thanks").add("for").add("all").add("the").add("fish");
alert(magi); // Alerts, "hello world and thanks for all the fish"