
/* gamingcon 2026 js */

/* select main views */
const homeView = document.querySelector("#home-view");
const successView = document.querySelector("#success-view");

/* select left cards */
const leftHomeCard = document.querySelector("#left-home-card");
const datesCard = document.querySelector("#dates-events");

/* select right cards */
const rightHomeCard = document.querySelector("#right-home-card");
const ticketsCard = document.querySelector("#tickets");

/* select navigation elements */
const datesNav = document.querySelector("#dates-nav");
const ticketsNav = document.querySelector("#tickets-nav");
const eventCardLink = document.querySelector("#event-card-link");
const brandLogo = document.querySelector(".brand");

/* show dates and events on the left */
function showDates() {
    homeView.hidden = false;
    successView.hidden = true;

    leftHomeCard.hidden = true;
    datesCard.hidden = false;
}

/* show booking and tickets on the right */
function showTickets() {
    homeView.hidden = false;
    successView.hidden = true;

    rightHomeCard.hidden = true;
    ticketsCard.hidden = false;
}

/* return to original homepage */
function showHome() {
    homeView.hidden = false;
    successView.hidden = true;

    leftHomeCard.hidden = false;
    rightHomeCard.hidden = false;

    datesCard.hidden = true;
    ticketsCard.hidden = true;
}

/* navigation event listeners */
datesNav.addEventListener("click", function(event) {
    event.preventDefault();
    showDates();
});

ticketsNav.addEventListener("click", function(event) {
    event.preventDefault();
    showTickets();
});

/* homepage event card link */
eventCardLink.addEventListener("click", function(event) {
    event.preventDefault();
    showDates();
});

/* clicking logo returns to homepage */
brandLogo.addEventListener("click", function(event) {
    event.preventDefault();
    showHome();
});

/* ==========================================
   event selection
========================================== */

/* select event buttons */
const eventOptions = document.querySelectorAll(".event-option");

/* select display elements */
const selectedEventDisplay = document.querySelector("#selected-event-display");
const summaryEvent = document.querySelector("#summary-event");

/* store selected event */
let selectedEvent = null;

/* function to select an event */
function selectEvent(button) {
    /* get information from the html */
    const eventName = button.dataset.event;
    const eventDate = button.dataset.date;
    const eventTime = button.dataset.time;

    /* save event information as an object */
    selectedEvent = {
        name: eventName,
        date: eventDate,
        time: eventTime
    };

    /* highlight the selected event */
    eventOptions.forEach(function(option) {
        if (option === button) {
            option.setAttribute("aria-pressed", "true");
        } else {
            option.setAttribute("aria-pressed", "false");
        }
    });

    /* display the selected event */
    selectedEventDisplay.textContent =
        `Selected: ${selectedEvent.name} - ${selectedEvent.date} at ${selectedEvent.time}`;

    selectedEventDisplay.hidden = false;

    /* update the booking summary (still hidden at this stage) */
    summaryEvent.textContent = selectedEvent.name;
}

/* event listeners for all event buttons */
eventOptions.forEach(function(button) {
    button.addEventListener("click", function() {
        selectEvent(button);
    });
});
