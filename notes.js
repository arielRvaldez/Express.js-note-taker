const notesData = document.getElementById('notes-data');
const saveNoteBtn = document.getElementById('save-btn');

saveNoteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/';
});

// Handle when a user submits feedback

if (notesData) {
  notesData
    .addEventListener('submit', (e) => {
      e.preventDefault();

      // Get the feedback text from the DOM and assign it to a variable
      let noteTitle = document.getElementById('noteTitle').value;
      // Get the username text and add it to a variable
      let notetext = document.getElementById('noteText').value.trim();

      // Create an object with the username and feedback
      const newNote = {
        noteTitle,
        noteText,
      };

      // Fetch POST request to the server
      fetch('api/htmlRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.status);
          noteTitle = '';
          noteText = '';
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
