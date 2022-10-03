// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   
   document.getElementById("missionTarget").innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">`
   
}

function validateInput(testInput) {
   let numInput = Number(testInput);
   if (testInput ===""){
    return "Empty";
   }else if (isNaN(numInput)){
    return "Not a Number"
   }else if(isNaN(numInput) === false){
    return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {


   //document is basically web page
   //list is for the css page, and is kinda like the result that is printed
   //get element by ID, use it to get the tags for each element, 
   //validateInput(parameters) uses if statments, throws alert that all the feilds are required 
   //else if validates each entry is the right type
   //now we know the data is valid, now we might do an else
   //change list visability to visable, use innerHTML and template literal to set it to statement of results
   //create a variable to define launch status, 
   //use get element by id to get the launchStatus
   //4 blocks of code will have an if, else if, else if, else to make sure the fuel level amd cargo mass are over 10000
   //  fuell level needs to be over 10000, cargo mass needs to be under 10000 to be ready for launch
   // launch
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");

   if (validateInput(pilot) === "Empty" ||validateInput(copilot) === "Empty"|| validateInput(fuelLevel) === "Empty"||validateInput(cargoLevel) ==="Empty" ){
     alert("All Fields Are Required");
   }else if (validateInput(fuelLevel) ==="Not a Number" || validateInput(cargoLevel) === "Not a Number"){
    alert("ENTER a NUMBER value for FUEL LEVEL AND CARGO MASS");
   }else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
    alert("DO NOT enter numbers for the name of pilot or co-pilot ")
   }else{
   list.style.visibility = "visible";
   pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
   copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

   if(fuelLevel < 10000 && cargoLevel <= 10000){
    fuelStatus.innerHTML = "Fuel level too low for launch";
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color =  'rgb(199, 37, 78)'; 
   }else if(fuelLevel >= 10000 && cargoLevel > 10000){
    fuelStatus.innerHTML = "Fuel level high enough for launch"// come back here //fuell level is good enough
    cargoStatus.innerHTML = "Cargo mass too heavy for launch"//cargo level is too heavy for launch
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)'; 
   }else if(fuelLevel < 10000 && cargoLevel > 10000){
    fuelStatus.innerHTML = "Fuel level too low for launch";// fuel level too low 
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";// cargo level too heavy 
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color =  'rgb(199, 37, 78)'; 
   }else{
    fuelStatus.innerHTML = "Fuel level high enough for launch"
    cargoStatus.innerHTML = "Cargo mass low enough for launch"
     launchStatus.innerHTML = 'Shuttle is Ready for Launch';
    launchStatus.style.color = 'rgb(65, 159, 106)';
   }
   };
   
    

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json
});

    return planetsReturned;
}

function pickPlanet(planets) {
   let whichPlanet = Math.floor( Math.random()*planets.length);
return planets[whichPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
