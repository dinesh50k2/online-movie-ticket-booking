const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage(); /* sayfada farklý þeyler seçildikten sonra sayfa yenilenince seçilen iþlemler gitmemesi için bu kodlarý uzun uzun yazdýk */
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {  /* týklanan eleman sadece seat classýna aitse yazacak ve eðer reserved'sa yani beyazsa onu almayacak */
        e.target.classList.toggle('selected'); /* eleman seçildiðinde sarýya boyar seçilmiþ elemana týklanýrsa geri alýr */
        calculateTotal()
    }
});

select.addEventListener('change', function (e) {
    calculateTotal()

});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    //spread operatörü ile kolay yapýlýr

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length; /* seçilen elemanlarýn sayýsý */
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}