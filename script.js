const form=document.getElementById("movie-form");
const list=document.getElementById("movie-list");

let movies=[];
let editIndex=null;

function render() {
  list.innerHTML = "";

  movies.forEach((movie, index) => {
    const card=document.createElement("div");
    card.className="card";

    card.innerHTML= `
      <img src="${movie.poster}" alt="Poster">
      <div class="card-content">
        <h3>${movie.title} (${movie.year})</h3>
        <p>🎭 Theme: ${movie.theme}</p>
        <p>⭐Rating: ${movie.rating}/10</p>
        <p class="status">📺 ${movie.status}</p>
        <div class="buttons">
          <button class="edit-btn" onclick="editMovie(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteMovie(${index})">Delete</button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const movie = {
    title: document.getElementById("title").value,
    poster: document.getElementById("poster").value,
    theme: document.getElementById("theme").value,
    year: document.getElementById("year").value,
    rating: document.getElementById("rating").value,
    status: document.getElementById("status").value,
  };

  if (editIndex === null) {
    movies.push(movie); // Create
  } else {
    movies[editIndex]=movie; // Update
    editIndex=null;
    form.querySelector("button").textContent = "Add Movie";
  }

  form.reset();
  render();
});

function deleteMovie(index) {
  if (confirm("Are You sure,Delete this movie?")) {
    movies.splice(index, 1);
    render();
  }
}

function editMovie(index) {
  const movie=movies[index];
  document.getElementById("title").value = movie.title;
  document.getElementById("poster").value = movie.poster;
  document.getElementById("theme").value = movie.theme;
  document.getElementById("year").value = movie.year;
  document.getElementById("rating").value = movie.rating;
  document.getElementById("status").value = movie.status;

  editIndex=index;
  form.querySelector("button").textContent="Update Movie";
}

render();
