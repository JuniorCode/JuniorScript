/*

     _              _            ___           _        _     ____
  _ | | _  _  _ _  (_) ___  _ _ / __| __  _ _ (_) _ __ | |_  |__ /
 | || || || || ' \ | |/ _ \| '_|\__ \/ _|| '_|| || '_ \|  _|  |_ \
  \__/  \_,_||_||_||_|\___/|_|  |___/\__||_|  |_|| .__/ \__| |___/
                                                 |_|              

JuniorScript 3.0.1 Alpha 1

Copyright (c) 2018 JuniorCode
https://github.com/JuniorCode

*/

function $(code) {
  var temp_variables = {};
  var temp_splitCode = code.split(/[\n;]+/);

  for (var i in temp_splitCode) {
    var temp_splitLine = temp_splitCode[i].trim().split(" ").map(function(value) {
      if (value.charAt(0) === "$" && temp_variables.hasOwnProperty(value.substr(1))) {
        return temp_variables[value.substr(1)];
      } else {
        if (value === "true" || value === true) {
          return true;
        } else {
          if (value === "false" || value === false) {
            return false;
          } else {
            if (!isNaN(Number(value))) {
              return Number(value);
            } else {
              return value;
            }
          }
        }
      }
    });

    var temp_first = temp_splitLine[0];
    var temp_second = temp_splitLine[1];
    var temp_third = temp_splitLine[2];
    var temp_fourth = temp_splitLine[3];
    var temp_fifth = temp_splitLine[4];

    var temp_rest = temp_splitLine;
    temp_rest.shift();
    temp_rest = temp_rest.join(" ");

    var temp_rest2 = temp_splitLine;
    temp_rest2.shift();
    temp_rest2 = temp_rest2.join(" ");

    if (temp_second === "=") {
      if (typeof temp_first !== "undefined" && temp_rest2 !== "undefined") {
        temp_variables[temp_first] = temp_rest2;
      } else {
        throw new Error("Not enough arguments.");
      }
    } else {
      switch (temp_first) {
        case "print":
          document.documentElement.innerHTML += temp_rest;
          break;
        case "write":
          document.open();
          document.write(temp_rest);
          break;
        case "exit":
          if (typeof temp_rest !== "undefined") {
            document.documentElement.innerHTML += temp_second;
          }
          break;
        case "delete":
          temp_variables.splice(temp_variables.indexOf(second), 1);
          break;
      }
    }

    // Delete variables to free up memory and
    // prevent memory leaks.

    delete temp_splitLine;
    delete temp_first;
    delete temp_second;
    delete temp_third;
    delete temp_fourth;
    delete temp_fifth;
    delete temp_rest;
  }

  // Delete variables to prevent memory leaks.

  delete temp_variables;
}
