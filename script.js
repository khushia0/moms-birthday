const backendURL = 'http://localhost:5000'; // Change to your deployed backend URL when hosted

async function addNote() {
  const text = document.getElementById('noteText').value.trim();
  if (!text) return;

  const res = await fetch(`${backendURL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  renderNote(data.text);
  document.getElementById('noteText').value = '';
}

async function loadNotes() {
  const res = await fetch(`${backendURL}/messages`);
  const notes = await res.json();
  notes.forEach(note => renderNote(note.text));
}

function renderNote(text) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = text;
  const board = document.getElementById('board');
  board.appendChild(note);
  note.style.left = `${Math.random() * (board.offsetWidth - 160)}px`;
  note.style.top = `${Math.random() * (board.offsetHeight - 160)}px`;
  makeDraggable(note);
}

function makeDraggable(el) {
  let offsetX, offsetY, isDragging = false;
  el.onmousedown = function(e) {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 1000;
  };
  document.onmousemove = function(e) {
    if (isDragging) {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }
  };
  document.onmouseup = function() {
    isDragging = false;
    el.style.zIndex = 1;
  };
}

window.onload = loadNotes;
