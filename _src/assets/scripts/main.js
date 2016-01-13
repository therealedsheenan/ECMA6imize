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

let first = main("welcome11aa");
let second = main("byezz");

// console.log(first);
console.log(first("SHEENAN"));
console.log(second("TENEPRE"));
// console.log(second("secondguy"));
