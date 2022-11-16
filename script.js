var container = document.getElementById("array");
var arr = [];
var size = 0;

var out = document.getElementById("added");
var chk = 0;

function add() {
  var a = Number(document.getElementById("lvalues").value);
  if (a > 100 || a < 0) {
    out.innerHTML = a + " is out of range.";
    return;
  }
  arr.push(a);
  out.innerHTML = a + " has been added!";
  chk = 1;
}

function generatearray() {
  document.getElementById("array").innerHTML = "";

  if (!chk) {
    arr = [];
    size = 14;
    for (var i = 0; i < 15; i++) {
      var val = Number(Math.ceil(Math.random() * 100));
      arr.push(val);
    }
  }
  else {
    size = arr.length - 1;
  }
  chk = 0;
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];

    var array_ele = document.createElement("div");

    array_ele.classList.add("block");


    array_ele.style.height = `${value * 3}px`;
    var max = screen.width * 95 / 100;
    var wth = max / arr.length;
    array_ele.style.width = `${wth}px`;
    array_ele.style.transform = `translate(${((max / (arr.length)) * (i))}px)`;

    var array_ele_label = document.createElement("label");
    array_ele_label.classList.add("block_id");
    array_ele_label.innerText = value;

    array_ele.appendChild(array_ele_label);
    container.appendChild(array_ele);
  }
}


async function BinarySearch(delay) {
  delay = (120 - Number(document.getElementById("srh").value)) * 10;

  if (arr.length == 0) {
    window.alert("Array is empty!");
    return;
  }
  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      window.alert("Invalid array/Array is not sorted. Please sort first!");
      return;
    }
  }

  var blocks = document.querySelectorAll(".block");

  var num = document.getElementById("fname").value;

  for (var i = 0; i < blocks.length; i += 1) {
    blocks[i].style.backgroundColor = "orange";
  }


  var start = 0;
  var end = size;
  var flag = 0;


  // Searching algo
  while (start <= end) {

    var mid = Math.floor((start + end) / 2);
    blocks[mid].style.backgroundColor = "#FF4949";

    var value = Number(blocks[mid].childNodes[0].innerHTML);

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay)
    );

    if (value == num) {
      window.alert("Element " + value + " found in array!");
      blocks[mid].style.backgroundColor = "#13CE66";
      flag = 1;
      break;
    }

    if (value > num) {
      end = mid - 1;
      blocks[mid].style.backgroundColor = "#6b5b95";
    } else {
      start = mid + 1;
      blocks[mid].style.backgroundColor = "#6b5b95";
    }
  }
  if (flag === 0) {
    window.alert("Element not found!");
  }
}


function swap(el1, el2) {
  return new Promise((resolve) => {

    var temp = el1.style.transform;
    el1.style.transform = el2.style.transform;
    el2.style.transform = temp;

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}


async function BubbleSort(delay) {
  delay = (100 - Number(document.getElementById("srt").value)) * 5;
  if (arr.length == 0) {
    window.alert("Array is empty!");
    return;
  }
  var blocks = document.querySelectorAll(".block");

  var num = document.getElementById("fname").value;

  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundColor = "orange";
  }

  // Sorting algo
  for (var i = 0; i < blocks.length; i += 1) {
    for (var j = 0; j < blocks.length - i - 1; j += 1) {

      blocks[j].style.backgroundColor = "#FF4949";
      blocks[j + 1].style.backgroundColor = "#FF4949";

      await new Promise((resolve) => setTimeout(() => { resolve(); }, delay));

      var value1 = Number(blocks[j].childNodes[0].innerHTML);
      var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);

        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#6b5b95";
      blocks[j + 1].style.backgroundColor = "#6b5b95";
    }
    blocks[blocks.length - i - 1].style.backgroundColor = "yellow";

    arr.sort(function (a, b) { return a - b; });
  }
}