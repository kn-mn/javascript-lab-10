let fetchButtonAPI = document.getElementById(`fetchDataFetchBtn`);
let dataDisplay = document.getElementById(`dataDisplayFetch`);

fetchButtonAPI.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response =>{
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayData(data);
      })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
});

function displayData(data){
    // let dataDisplay = document.getElementById("dataDisplayFetch");
    dataDisplay.innerHTML = `<h4>${data.title}</h4>` +`<p>${data.body}</p>`;
}