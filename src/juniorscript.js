/*

       _             _            _____           _       _   
      | |           (_)          / ____|         (_)     | |  
      | |_   _ _ __  _  ___  _ _| (___   ___ _ __ _ _ __ | |_ 
  _   | | | | | '_ \| |/ _ \| '__\___ \ / __| '__| | '_ \| __|
 | |__| | |_| | | | | | (_) | |  ____) | (__| |  | | |_) | |_ 
  \____/ \__,_|_| |_|_|\___/|_| |_____/ \___|_|  |_| .__/ \__|
                                                   | |        
                                                   |_|        

JuniorScript Alpha 2.1

Copyright (©) 2018 JuniorCode

https://github.com/JuniorCode

*/

console.log("%c JuniorScript Alpha 2.1", "background: #0070ff; color: #ffffff");

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

var variables = [];
var values = [];
var last = "";

var JuniorScript = {
  "version": "Alpha 2.1",
  "eval": function(code) {
    if (typeof code !== "undefined") {
      var splitCode = code.replace("\t", "").split(/;|\n/);
      var line = 1;
      var skip = false;

      for (var i = 0; i < splitCode.length; i++) {
        var splitCommand = splitCode[i].replace(/^\s+/g, "");
        splitCommand = splitCommand.replaceAll("$last", last);

        if (variables.length > 0 && splitCommand.split(" ")[0] !== "delete") {
          for (var j = 0; j < variables.length; j++) {
            splitCommand = splitCommand.replaceAll("$" + variables[j], values[j]);
          }
        }

        var all = splitCommand;

        splitCommand = splitCommand.split(" ");

        var first = splitCommand[0];
        var second = splitCommand[1];
        var third = splitCommand[2];
        var fourth = splitCommand[3];
        var fifth = splitCommand[4];

        var rest = splitCommand;
        rest.shift();
        rest = rest.join(" ");

        var rest2 = splitCommand;
        rest2.shift();
        rest2 = rest2.join(" ");

        if (first === "end") {
          skip = false;
        } else {
          if (first === "else") {
            skip = !skip;
          } else {
            if (skip !== true) {
              if (second === "=") {
                variables.push(first);
                values.push(rest2);
              } else {
                switch (first) {
                  case "evaljs":
                    eval(rest);
                  case "eval":
                    this.eval(rest);
                    break;
                  case "about":
                    alert("About JuniorScript:\n\nVersion: " + this.version);
                    break;
                  case "alert":
                    alert(rest);
                    break;
                  case "confirm":
                    last = confirm(rest);
                    break;
                  case "in":
                    last = prompt(rest);
                    break;
                  case "out":
                    document.documentElement.innerHTML += rest;
                    break;
                  case "in":
                    last = prompt(rest);
                    break;
                  case "if":
                    if (third === "=") {
                      skip = !(second == fourth);
                    } else if (third === "!=") {
                      skip = !(second !== fourth);
                    } else if (third === ">") {
                      skip = !(Number(second) > Number(fourth));
                    } else if (third === "<") {
                      skip = !(Number(second) < Number(fourth));
                    } else if (third === ">=") {
                      skip = !(Number(second) >= Number(fourth));
                    } else if (third === "<=") {
                      skip = !(Number(second) <= Number(fourth));
                    }

                    break;
                  case "delete":
                    var index = variables.indexOf(rest);

                    if (index > -1) {
                      variables.splice(index, 1);
                      values.splice(index, 1);
                    }

                    break;
                  case "exit":
                  case "die":
                    document.open();
                    document.write(rest);
                    break;
                  default:
                    if (!!all.trim()) {
                      console.error("JuniorScript Error: Command " + first + " not found on line " + line + ".");
                    }
                }

                line++;
              }
            }
          }
        }
      }
    }
  }
}

var tags = document.getElementsByTagName("script");

for (var i = 0; i < tags.length; i++) {
  if (tags[i].type.toLowerCase().includes("juniorscript")) {
    JuniorScript.eval(tags[i].innerHTML);
  }
}
