const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;


// save selected movie index and count
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}   


// update total  and count

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // ====== Storing seats in the local storage========
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount*ticketPrice;
}

// Get data from the local storage and populate UI

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
        }
}


//Movie Select
movieSelect.addEventListener("change", e => {
    ticketPrice = + e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// =================Seat click function
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
});

// initial count and total

updateSelectedCount();