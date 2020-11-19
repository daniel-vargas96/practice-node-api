const table = document.querySelector("#table");
const tbody = document.getElementById("tableBody");
const buttonParent = document.getElementById("btns");
const tableHeader = document.getElementById("table-header");
const tableTitle = document.getElementById("table-title");


handleNotesCall();

function handleNotesCall() {
  $.ajax({
    method: "GET",
    url: "http://localhost:5000/api/data",
    error: error => {
      console.log(error)
    },
    success: data => {
      getNotes(data);
    }
  })
}

function getNotes(data) {
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr');
    const noteID = document.createElement('td');
    const noteContent = document.createElement('td');

    noteID.textContent = data[i].id;
    noteContent.textContent = data[i].content;

    //display table
    row.append(noteID, noteContent);
    tbody.append(row);
  }
}
