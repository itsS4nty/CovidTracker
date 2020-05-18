/* FUNCTIONS */ 
function showInfo() {
    var ele = document.getElementById('countries').style.display;
    if(ele == "none") {
        document.getElementById('countries').style.display = "block";
        document.getElementById('infoButton').innerHTML = "Hide info of countries";
    } else {
        document.getElementById('infoButton').innerHTML = "Show info of countries";
        document.getElementById('countries').style.display = "none";
    }
}