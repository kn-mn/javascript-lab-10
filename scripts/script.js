
const fetchButton = document.getElementById("fetchDataFetchBtn");
const xhrButton   = document.getElementById("fetchDataXHRBtn");
const displayArea = document.getElementById("dataDisplay");

// Task 1: API Interaction Using GET Requests
function getPostWithFetch() {
displayArea.innerHTML = "";
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Unable to fetch data.");
      }
      return response.json();
    })
    .then(function(data) {
      displayArea.innerHTML =
        "<h4>" + data.title + "</h4><p>" + data.body + "</p>";
    })
    .catch(function(error) {
      displayArea.innerHTML = "<p>" + error.message + "</p>";
    });
}

fetchButton.addEventListener("click", getPostWithFetch);

// Task 2: API Interaction Using XMLHttpRequest
function getPostWithXHR() {
displayArea.innerHTML = "";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
  
  xhr.onload = function() {
    if (xhr.readyState === 4){
    if (xhr.status === 200) {
    
        const data = JSON.parse(xhr.responseText);
          console.log(data)
          displayArea.innerHTML = "<h4>" + data.title + "</h4><p>" + data.body + "</p>";
    } else {
      displayArea.innerHTML = "<p>Unable to fetch</p>";
    }
  }};
  xhr.onerror = function() {
    displayArea.innerHTML = "<p>Unable to fetch</p>";
};
  xhr.send();
}

xhrButton.addEventListener("click", getPostWithXHR);

// Task 3 and Task 4
const formElement   = document.getElementById("inputForm");
const formResponse  = document.getElementById("formResponse");
const modeRadios    = document.querySelectorAll('input[name="mode"]');
const postIdField   = document.getElementById("postId");

function updateFormMode() {
  const selectedMode = document.querySelector('input[name="mode"]:checked').value;
  if (selectedMode === "edit") {
    postIdField.style.display = "block";
    postIdField.required     = true;
  } else {
    postIdField.style.display = "none";
    postIdField.required     = false;
  }
}

modeRadios.forEach(function(radio) {
  radio.addEventListener("change", updateFormMode);
});
updateFormMode();

function showFormMessage(text) {
  formResponse.innerHTML = "<p>" + text + "</p>";
}

formElement.addEventListener("submit", function(event) {
  event.preventDefault();

  const titleValue = document.getElementById("title").value;
  const bodyValue  = document.getElementById("body").value;
  const selectedMode = document.querySelector('input[name="mode"]:checked').value;

  if (selectedMode === "create") {

// Task 3: Send Data Using POST
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titleValue, body: bodyValue })
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Unable to submit post.");
        }
        return response.json();
      })
      .then(function(data) {
        showFormMessage("Post created");
        formElement.reset();
        updateFormMode();
      })
      .catch(function(error) {
        showFormMessage(error.message);
      });

  } else {

// Task 4: Update Data Using PUT
    const postIdValue = postIdField.value;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://jsonplaceholder.typicode.com/posts/" + postIdValue);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
      if (xhr.status === 200) {
        showFormMessage("Updated. " + "(Post ID: " + postIdValue + ")");
        formElement.reset();
        updateFormMode();
      } else {
        showFormMessage("Unable to update post.");
      }
    };
    xhr.onerror = function() {
      showFormMessage("Unable to update post.");
    };
    xhr.send(JSON.stringify({ title: titleValue, body: bodyValue }));
  }
});
