//Get the display to alter DOM
const display = document.getElementById("display");
let batteryAlive = false;

//Initialize the value to be 0 and faded color.
display.value = "DEAD BATTERY";
display.style.color = "rgb(200,200,200)";

//When button is pressed, add it to display.  
//Change to more visible white color
function appendToDisplay(input){
    if(batteryAlive == true) {
        //Take away initial 0
        if (display.value == 0){
            display.value = '';
        }
  
        display.style.color = "white";
        display.value += input;
    }
}

// Calculate whatever is on the screen when = is pressed.
// Display an Error if cannot evaluate.
function calculate(){
    if (batteryAlive == true) {
        try{
            display.value = eval(display.value).toFixed(2);
        }
        catch{
            display.value = "Error";
        }
    }
}

//Clear the display and initialize back to 0 and faded color when C is pressed.
function clearDisplay(){
    if(batteryAlive == true){
        display.value = "0";
        display.style.color = "rgb(200,200,200)";
    }
}

//  --------    SPECIAL BUTTONS      -------------------------------

//Get each of the number buttons
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");
let zero = document.getElementById("0");

//initialize an array and push all of the elements into it.
let nums = [];
nums.push(one, two, three, four, five, six, seven, eight, nine, zero);

//remove all even numbers when E is pressed.
function evenRemove(){
    if (batteryAlive == true) {
        for(i = 0; i < nums.length; i++){
            if(nums[i].id % 2 == 0){
                nums[i].style.color = "red";
                //nums[i].parentElement.style.backgroundColor = "black";
                nums[i].disabled = true;
            }
        }
    }
}

//remove all odd numbers when O is pressed.
function oddRemove(){
    if (batteryAlive == true) {
        for(i = 0; i < nums.length; i++){
            if(nums[i].id % 2 != 0){
                nums[i].style.color = "red";
                nums[i].disabled = true;
            }
        }
    }
}

//reset the numbers when R is pressed.
function reset(){
    for(i = 0; i < nums.length; i++){
        nums[i].style.color = "white";
        nums[i].disabled = false;
    }
}


//------------  Flipping The calculator -------------------------------------------------------

const keys = document.getElementById("keys");
const back = document.getElementById("back");

function flipCalc(){
  
    //If the batteries are out, cannot flip to front until they are put in.
    if (batteries.style.display == "block") {
        flipBtn.disabled = true;
        window.alert("You need to put the batteries in");
        
    } else {
        flipBtn.disabled = false;
        
        // Flip to the side of the calculator that it currently isn't on.
        if(back.style.display == "block"){
            keys.style.display = "grid";
            display.style.display = "block";
            back.style.display = "none";
            batteryBtn.disabled = true;

        } else {
            keys.style.display = "none";
            display.style.display = "none";
            back.style.display = "block";
            batteryBtn.disabled = false;
        }
    }
}

//------ UNSCREWING BOLTS ------------------------------------------------

const bolt1 = document.getElementById("bolt1");
const bolt2 = document.getElementById("bolt2");
// screw 1 is right, screw 2 is left.
let isScrewed1;
let isScrewed2;
const calculator = document.getElementById("calculator");

// Cannot move the back pannel until the bolts are removed. Disable
back.disabled = true;

function unscrew(screwNum){

    // if the first screw
    if(screwNum == 1){

        //if the first screw rotating animation is complete the screw is removed.
        bolt1.addEventListener("animationend", function() {
            bolt1.style.width = "7px";
            bolt1.style.height = "7px";
            bolt1.style.backgroundImage = "radial-gradient(black, rgb(50,50,50))";
            document.getElementById("bolthead1").innerHTML = '';
            isScrewed1 = false;

            //if both screws are removed, the back shows that its propped open a little and is no longer disabled.
            if (isScrewed1 == false && isScrewed2 == false) {
                back.style.boxShadow = "-1px -6px 10px rgba(30,30,30, 0.8)";
                back.disabled = false;
                back.style.cursor = "grab";
            }
        });
        
    } else if (screwNum ==2) {

        //if the second screw rotating animation is complete, the screw is removed.
        bolt2.addEventListener("animationend", function() {
            bolt2.style.width = "7px";
            bolt2.style.height = "7px";
            bolt2.style.backgroundImage = "radial-gradient(black, rgb(50,50,50))";
            document.getElementById("bolthead2").innerHTML = '';
            isScrewed2 = false;

            //  same as in bolt1 (embedded so that it is synchronus.)
             if (isScrewed1 == false && isScrewed2 == false) {
                back.style.boxShadow = "-1px -6px 10px rgba(30,30,30, 0.8)";
                back.disabled = false;
                back.style.cursor = "grab";
        }
        });
    }
}

// -------  Moving the Battery Cover ----------------------------

var mousePosition;
var offset = [0,0];
var isDown = false;

//Placing the back cover in the center of the screen, directly on top of the batterySpot.
back.style.position = "absolute";
back.style.left = "calc(50vw - (/* width */140px / 2)); ";
back.style.top = "calc(50vh - (/* height */100px / 2));";

document.body.appendChild(back);

//Make the mouse draggable and it will go down wherever the mouseup is.
back.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        back.offsetLeft - e.clientX,
        back.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        back.style.left = (mousePosition.x + offset[0]) + 'px';
        back.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);


//---   Getting the Batteries   ---------------------------------------

const batteries = document.getElementById("batteriesdiv");
const batteryBtn = document.getElementById("batteryBtn");
const batterySpot = document.getElementById("batterySpot");

function getBatteries(){

    // if on the back side, allow, don't allow if not.
    if (back.style.display == "block") {
        batteries.style.display = "block";
        batteryBtn.innerHTML = "";
        batteryBtn.disabled = true;
        batteries.style.cursor = "grab";

    // disable battery button if not on the back side.
    } else {
        batteryBtn.disabled = true;
        window.alert("Check out the other side first.");
    }
}

// --- MOVING THE BATTERIES ----------------------------------------------

function moveBatteries(){

     //If it is on the back side of the calculator.
    if (back.style.display == "block") {

        const source = document.querySelector(".batteriesdiv");
        const target = document.querySelector(".batterySpot");

        // Allow the batteries to be dragged. They can only be moved to the batterySpot position. 
        // Not anywhere like the back cover.
        source.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        target.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            const sourceID = e.dataTransfer.getData('text/plain');
            e.target.appendChild(document.getElementById(sourceID));
        
            // When the batteries are in place, everything is cleaned up and the calculator goes back to the front side
            // The calculator now works.
            source.setAttribute("draggable", "false");
            keys.style.display = "grid";
            display.style.display = "block";
            back.style.display = "none";
            batteryBtn.disabled = true;
            flipBtn.disabled = true;
            flipBtn.innerHTML = '';

            batteryAlive = true;
            display.value = 0;

            //window.alert('Now you can put the cover back on and start calcuating!');
        });

    } else {
        // If the battery cover is not moved away from the battery spot, make an alert.
        window.alert("You need to remove the battery cover!");
    }
}