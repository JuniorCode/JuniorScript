/*
   ___             _            _____           _       _
  |_  |           (_)          /  ___|         (_)     | |
    | |_   _ _ __  _  ___  _ __\ `--.  ___ _ __ _ _ __ | |_
    | | | | | '_ \| |/ _ \| '__|`--. \/ __| '__| | '_ \| __|
/\__/ / |_| | | | | | (_) | |  /\__/ / (__| |  | | |_) | |_
\____/ \__,_|_| |_|_|\___/|_|  \____/ \___|_|  |_| .__/ \__|
                                                 | |
                                                 |_|

JuniorScript Alpha V1 is created by JuniorCode.
https://www.github.com/JuniorCode

*/

var style = document.createElement("style");
document.body.appendChild(style);
style.innerHTML = "juniorscript{display:none;}";

function error(error) {
  alert("JuniorScript Error: " + error);
  throw new Error("JuniorScript Error: " + error);
}

function eval_jrs(code) {
  var last = "";
  var statement = "none";
  var split_code = code.replace('\t', '').split("\n");

  for (var i = 0; i < split_code.length; i++) {

    var split_command = split_code[i].split(" ");

    if (split_command[i] == "about") {
      alert("JuniorScript Alpha V1 is currently running.");
    }

    if (split_command[0] == "out") {
      if (split_command[1] == "=") {
        error("Undeclared context on line " + (i + 1) + ".");
      }

      split_command.shift();

      if (split_command[0] == "(func)") {
        split_command.shift();
      }

      var out_cmd = "";

      for (var j = 0; j < split_command.length; j++) {
        if (split_command[j] == "(last)") {
          split_command[j] = last;
        }
        
        if (j == 0) {
          var out_cmd = out_cmd + split_command[j];
        } else {
          var out_cmd = out_cmd + " " + split_command[j];
        }
      }

      document.write(out_cmd);
    }

    if (split_command[i] == "in") {
      if (split_command[1] == "=") {
        error("Undeclared context on line " + (i + 1) + ".");
      }

      statement = "prompt";

      split_command.shift();

      var in_cmd = split_command[0];

      for (var k = 0; k < split_command.length; k++) {
          split_command[k] = split_command[k].replace("(last)", last);
      }

      for (var j = 1; j < split_command.length; j++) {
          in_cmd = in_cmd + " " + split_command[j];
      }

      if (split_command[0] == "(func)") {
        last = prompt(in_cmd);
      } else {
        last = prompt(in_cmd);
      }

    }

    if (split_command[i] == "if") {
      statement = "if";
    }

    if (split_command[i] == "and") {
      statement = "end if";
    }

    if (statement == "end if") {
      eval_jrs(split_command[i + 1])
      statement = "none";
    }

  }
}

var tags = document.getElementsByTagName("juniorscript");

for (var i = 0; i < tags.length; i++) {
  eval_jrs(tags[i].innerHTML);
}
