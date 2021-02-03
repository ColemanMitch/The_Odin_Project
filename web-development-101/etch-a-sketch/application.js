const container = document.getElementById("container");
let num = 16;
let blackPen = true;

let penColorBlack = document.getElementById("black");
penColorBlack.addEventListener("click", setColorBlack);

let penColorRGB = document.getElementById("rgb");
penColorRGB.addEventListener("click", setColorRGB);

function setColorBlack() {
  blackPen = true;
  console.log('black pen')
  alert('black pen');
}

function setColorRGB() {
  blackPen = false;
  console.log('rgb pen')
  alert('rgb');
}



function getRandomColor() {
  var r = function () {
    return Math.floor(Math.random() * 256);
  };
  return "rgb(" + r() + "," + r() + "," + r() + ")";
}

function buildGrid(num) {
  for (var i = 0; i < num; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (var j = 0; j < num; j++) {
      const box = document.createElement("div");
      box.className = "box";
      row.appendChild(box);
    }
    console.log(row);
    container.appendChild(row);
  }
}
buildGrid(num);
changeColor();

function changeColor() {
  let boxes = document.querySelectorAll(".box");
  for (var i = 0; i < boxes.length; i++) {
    let opacity = "0.1";
    boxes[i].addEventListener("mouseover", function () {
      if (blackPen) 
      {
        this.style.backgroundColor = `rgba(0, 0, 0,${opacity}`;
        let o = parseFloat(opacity);
        o+=0.1;
        console.log(o);
        opacity=o.toString();
      }
      else 
      {
          this.style.backgroundColor = getRandomColor();

      }
      //console.log(this);
    });
  }
}
let btn = document.getElementById("reset");
btn.addEventListener("click", resetGrid);

function resetGrid() {
  let boxes = document.querySelectorAll(".box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].setAttribute("style", "background-color: white");
  }
  
  let newSize = num;
  do 
  {
     newSize = prompt("How many boxes per side would you like the new grid to be (2-100)?");
  }
  while (newSize < 2 || newSize > 100)
  
  
  console.log(container.firstChild);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  num = newSize;
  buildGrid(newSize);

  n = (400 - newSize - 1) / newSize;
  newHeight = n.toString();
  console.log(n);
  console.log(newHeight.concat("px"));

  let b = document.querySelectorAll(".box");
  b.forEach((element) => {
    element.style.width = newHeight.concat("px");
    element.style.height = newHeight.concat("px");
    //accessing the single properties of style one by one is the preferred way
    //than changing the whole `style` string
  });

  changeColor();
}

