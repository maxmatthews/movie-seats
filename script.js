const movies = {
  "The Godfather": {
    price: 8,
    seats: [],
  },
  "Shawshank Redemption": {
    price: 9,
    seats: [],
  },
  Casablanca: {
    price: 10,
    seats: [],
  },
  "Citizen Kane": {
    price: 11,
    seats: [],
  },
  "Gone with the Wind": {
    price: 12,
    seats: [],
  },
  "Wizard of Oz": {
    price: 13,
    seats: [],
  },
  Veritgo: {
    price: 14,
    seats: [],
  },
  Psycho: {
    price: 15,
    seats: [],
  },
};

const movieDropdown = document.getElementById("movieSelection");

movieDropdown.addEventListener("change", (evt) => {
  selectedMovie = evt.target.value;
  updateSeats(selectedMovie);
});

let options = "<select id='movieSelection'><option></option>";
for (const [title, movie] of Object.entries(movies)) {
  options += `<option value="${title}">${title} ($${movie.price})</option>;`;
}
options += `</select>`;
console.log(options);
movieDropdown.innerHTML = options;

const seatsGenerator = () => {
  for (const movie of Object.values(movies)) {
    for (let rowIterator = 0; rowIterator < 8; rowIterator++) {
      let row = [];
      for (let colIterator = 0; colIterator < 8; colIterator++) {
        row.push({ occupied: Math.random() < 0.5, selected: false });
      }
      movie.seats.push(row);
    }
  }
};

const updateSeats = (selectedMovieTitle) => {
  const seats = document.getElementById("seats");
  const movie = movies[selectedMovieTitle];

  let seatsHTML = "";
  let selectedSeats = 0;
  for (const [rowIndex, row] of Object.entries(movie.seats)) {
    seatsHTML += `<div>`;
    for (const [colIndex, col] of Object.entries(row)) {
      if (col.selected) {
        selectedSeats++;
      }

      seatsHTML += `<span class="material-symbols-outlined seat ${
        col.occupied ? "occupied" : ""
      } ${col.selected ? "selected" : ""}" 
	  data-rowIndex="${rowIndex}" 
	  data-colIndex="${colIndex}" 
	  onclick="chairClicked(event)"> 
	  chair 
	  </span>`;
    }
    seatsHTML += `</div>`;
  }

  seatsHTML += `<div id="screen">Screen</div>`;
  if (selectedSeats) {
    seatsHTML += `<div>You have <strong>${selectedSeats}</strong> seats selected for a total of <strong>$${
      selectedSeats * movie.price
    }</strong></div>`;
    seatsHTML += `<button onclick="checkout()">Checkout</button>`;
  }

  seats.innerHTML = seatsHTML;
};

const chairClicked = (evt) => {
  const rowIndex = evt.target.getAttribute("data-rowIndex");
  const colIndex = evt.target.getAttribute("data-colIndex");

  let selectedMovieTitle = movieDropdown.value;
  const chair = movies[selectedMovieTitle].seats[rowIndex][colIndex];
  if (!chair.occupied) {
    chair.selected = true;
  }

  updateSeats(selectedMovieTitle);
};

const checkout = () => {
  let selectedMovieTitle = movieDropdown.value;
  const movie = movies[selectedMovieTitle];
  for (const [rowIndex, row] of Object.entries(movie.seats)) {
    for (const [colIndex, col] of Object.entries(row)) {
      if (col.selected) {
        col.selected = false;
        col.occupied = true;
      }
    }
  }
  updateSeats(selectedMovieTitle);
  alert(
    "Normally we'd get your credit card, but for now we'll just mark you seats as occupied! See you at the movies."
  );
};

seatsGenerator();

console.log(movies);
