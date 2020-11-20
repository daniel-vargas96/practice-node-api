const table = document.querySelector("#table");
const tbody = document.getElementById("tableBody");
const buttonParent = document.getElementById("btns");
const tableHeader = document.getElementById("table-header");
const tableTitle = document.getElementById("table-title");
const notesButton = document.getElementById("btn");
const searchInput = document.getElementById("id-input");
const searchButton = document.getElementById("search-btn");
const id = document.getElementById("note-id");
const content = document.getElementById("content");
const errorMessage = document.getElementById("error-message");




// handleNotesCall();
notesButton.addEventListener("click", () => {
  handleNotesCall();
});

//handleSingleNoteCall()
searchButton.addEventListener("click", () => {
  handleSingleNoteCall();
})


function handleSingleNoteCall() {
  $.ajax({
    method: "GET",
    url: `http://localhost:5000/api/data/${searchInput.value}`,
    error: error => {
      errorMessage.textContent = 'ID NOT FOUND!';
    },
    success: data => {
      getSingleNote(data);
    }
  })
}


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

function getSingleNote(data) {
  id.textContent = data.id;
  content.textContent = data.content;
}
