console.log("Settings script operational, SIR!");
//Code to open Basic Settings dropdown automatically
let toolbar_height_slider = document.getElementById("toolbar_height");
let toolbar_height_value_output = document.getElementById(
  "toolbar_height_value"
);

var dropdown = document.getElementsByClassName("dropdown");
for (var i = 0; i < dropdown.length; i++) {
  var panel = dropdown[i].nextElementSibling;
  if (dropdown[i].id == "basic_settings") {
    panel.style.display = "block";
  }
}
//Code to get the dropdowns to open and close on click
for (var i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function bakeCookie(cname, cvalue, exdays) {
  //sets the cookie name, the cookie itself, and the days until expiry
  var d = new Date(); //makes new date function
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); //gets current time
  var expires = "expires=" + d.toUTCString(); //turns d (date) into a string
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; //cookie = cookie name + cookie value + when it expires
}

function getCookie(cname) {
  var name = cname + "="; //adds the equals symbol because you cant put that in brackets
  var decodedCookie = decodeURIComponent(document.cookie); //decodes it or something
  var ca = decodedCookie.split(";"); //splits all cookies (divided by the semicolons)
  //space for readability
  for (var i = 0; i < ca.length; i++) {
    //repeats as many cookies as there are
    var c = ca[i]; //sets ca to c
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      //if cookie is found
      return c.substring(name.length, c.length); //return value of that cookie
    }
  }
  return ""; //else return nothing
}

//THEME

const modeSwitch = document.getElementById("modeSwitch");

function theme() {
  chrome.storage.sync.get(["theme"], function (items) {
    console.log("Settings retrieved", items);
  });
}

modeSwitch.addEventListener("change", function () {
  document.body.classList.toggle("dark");
  chrome.storage.sync.set(
    { theme: document.body.classList.contains("dark") ? "dark" : "light" },
    function () {
      console.log("Settings saved");
    }
  );
  theme();
  console.log(document.body.classList);
});

var checkbox = document.getElementById("modeSwitch");
checkbox.addEventListener("change", function () {
  theme();
});

toolbar_height.addEventListener("input", function () {
  chrome.storage.sync.set({ toolbar_height: toolbar_height_slider.value });
  toolbar_height_value_output.innerHTML = toolbar_height_slider.value + "%";
});

window.onload = function () {
  chrome.storage.sync.get("toolbar_height", function (data) {
    toolbar_height_slider.value = data.toolbar_height;
    console.log("SET THE VALUE");
    toolbar_height_value_output.innerHTML = data.toolbar_height + "%";
  });
};
