//ACFA58
var index;
var op;
var list;
var listOfArrays=[];
var conditionArray=[];

document.querySelector("#add").onclick =
function addCondition(){
  
  var currentDiv = document.createElement("div");
  var select0 = document.createElement("select");select0.setAttribute("class","condition");
  //select0.setAttribute
  var op01 = document.createElement("option");
  var t01 = document.createTextNode("AND");
  var op02 = document.createElement("option");
  var or = document.createTextNode("OR");
  op01.appendChild(t01);
  op02.appendChild(or);
  select0.appendChild(op01);
  select0.appendChild(op02);

  var select1 = document.createElement("select");select1.setAttribute("class","condition");
 // console.log("k0");
  var op1 = document.createElement("option");
  var t1 = document.createTextNode("population");
  var op2 = document.createElement("option");
  var t2 = document.createTextNode("GDP");
  var op3 = document.createElement("option");
  var t3 = document.createTextNode("gender-ratio");
  op1.appendChild(t1);
  op2.appendChild(t2);
  op3.appendChild(t3);
  select1.appendChild(op1);
  select1.appendChild(op2);
  select1.appendChild(op3);
//console.log("1");

  var select2 = document.createElement("select");select2.setAttribute("class","condition");
  var op21 = document.createElement("option");
  var t21 = document.createTextNode("is less than");
  var op22 = document.createElement("option");
  var t22 = document.createTextNode("is greater than");
  var op23 = document.createElement("option");
  var t23 = document.createTextNode("is equal to");
  op21.appendChild(t21);
  op22.appendChild(t22);
  op23.appendChild(t23);
  select2.appendChild(op21);select2.appendChild(op22);select2.appendChild(op23);

  var x = document.createElement("INPUT");x.setAttribute("class","condition");
  x.setAttribute("type", "number");

  var mydiv = document.getElementById("selector"); 
  //document.body.insertBefore(newDiv, currentDiv);
  var para = document.createElement("p"); 
  var para2 = document.createElement("p"); 
  var para3 = document.createElement("p");
  var para4 = document.createElement("p"); 
  currentDiv.appendChild(para);
  currentDiv.appendChild(select0);
  currentDiv.appendChild(para2);
  currentDiv.appendChild(select1);
  currentDiv.appendChild(para3);
  currentDiv.appendChild(select2);
  currentDiv.appendChild(para4);
  currentDiv.appendChild(x);

 // document.body.insertBefore(currentDiv, d);
mydiv.appendChild(currentDiv);

}

document.querySelector("#go").onclick =
function go(){
  var boundary1 = document.querySelector("#num").value;
 
  var attr1 = document.querySelector("#attribute").selectedIndex;
  
  var comparison1 = document.querySelector("#comparison").selectedIndex;
  var arr=[];
  arr=query(attr1,comparison1,boundary1);
  listOfArrays.push(arr);
  list = document.querySelectorAll(".condition");
  
  var i=0;var vals=[];
  for(i=0;i<list.length;i++){  
    if(i%4==3)
      {
        vals.push(list[i].value);
      }
    vals.push(list[i].selectedIndex);
    }
  console.log(vals);
  var j=0;
  for(j=0;j<vals.length;j+=5){
    conditionArray.push(vals[j]);
    arr=query(vals[j+1],vals[j+2],vals[j+3]);
    listOfArrays.push(arr);
  }
  console.log(conditionArray);
  console.log(listOfArrays);
  finalArray();
}

function finalArray(){
  var i;var farr=[];
  for(i=conditionArray.length-1;i>=0;i--){
    var k=listOfArrays.length-1;
    if(conditionArray[i]==1){
      var a= _.union(listOfArrays[k], listOfArrays[k-1]);
      }
    else if(conditionArray[i]==0){
      var a= _.intersection(listOfArrays[k], listOfArrays[k-1]);
    }
    listOfArrays.pop(listOfArrays[k]);
    listOfArrays.pop(listOfArrays[k-1]);
    listOfArrays.push(a);
  }
  console.log(listOfArrays);
  initialize();
}


function query(attr,comparison,boundary){
  var plot=[];
  //console.log(attr);console.log(boundary);
 index=attr+1;
 if(comparison==0){
  for(i=0;i<cities.length; i++){
    var city=cities[i];
   // console.log("1:"+city);
    if(city[index] < boundary)
      plot.push(city);
  }
}
//console.log(plot);
  if(comparison==1){
  for(i=0;i<cities.length; i++){
    var city=cities[i];
     if(city[index] > boundary)
      plot.push(cities[i]);
    
  }
}
  if(comparison==2){
  for(i=0;i<cities.length; i++){
    var city=cities[i];
    if(city[index]==boundary)
      plot.push(cities[i]);
  }
}
 //console.log(plot);
 return plot;
 
}

function initialize() {
        var myLatlng = new google.maps.LatLng(22,77);
        var mapOptions = {
        zoom: 4,
        center: myLatlng
  }
    var map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);
    setMarkers(map, listOfArrays[0]);
    listOfArrays=[];
 }

var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };
var table=['city', 'population','gdp', 'gender-ratio', 'latitude', 'longitude', 'n'];
var cities = [
  ['Mumbai',20222, 233, 87, 19.075984, 72.877656, 4],
  ['Delhi', 12345, 212, 97, 28.613939, 77.209021, 5],
  ['Lucknow', 12441, 233, 88, 26.846511, 80.946683, 3],
  ['Bangalore',42422, 433, 99, 12.971599, 77.594563, 2],
  ['Hyderabad',34242, 342, 87, 17.385044, 78.486671, 1],
  ['Pune', 18762, 121, 92, 18.520430, 73.856744,6],
  ['Bhopal', 19822, 134, 89, 23.259933, 77.412615, 7]
];
function setMarkers(map, locations) {
  
  for (var i = 0; i < locations.length; i++) {
   // console.log(i);
    var place = locations[i];
    var myLatLng = new google.maps.LatLng(place[4], place[5]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        shape: shape,
        title: place[0],
        zIndex: place[3]
       
    });
  }
}

//google.maps.event.addDomListener(window, 'load', init);
