"use strict"

class Project {
    constructor( name ) {
        this.name = name;
    }

    start() {
        return "Project " + this.name + " starting";
    }
}

let project = new Project("Journal");
let test = project.start(); // "Project Journal starting"
console.log(test);


let main = ( var1 ) => {
    return function ( var2 ) {
        return var1 + " test "  + var2;
    }
}

let first = main("welcome");
let second = main("bye");

// console.log(first);
console.log(first("firstguy"));
console.log(second("firstguy"));
// console.log(second("secondguy"));
