import { fetchFlightsToItaly } from './fetch.js'

/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    lentoTiedot();


});

function tamanPaivanLennot(flighsData) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const todayDate = `${year}-${month}-${day}`;
    const todaysFlights = flighsData.filter(function (flight) {
        return flight.flight_date === todayDate;
    });

    return todaysFlights;
}

function lentoTiedot() {
    fetchFlightsToItaly().then(function (flighsData) {
        const todaysFlights = tamanPaivanLennot(flighsData);
        let table = "<table class='table table-bordered' border='2'>";
        table += "<thead><tr><th>Pvm</th><th>Lentoyhtiö</th><th>Lennon nro</th></tr></thead><tbody>";

        todaysFlights.forEach(flight => {
            const flightDate = flight.flight_date;
            const airline = flight.airline.name;
            const flightNumber = flight.flight.iata;

            table += `<tr>
                        <td>${flightDate}</td>
                        <td>${airline}</td>
                        <td>${flightNumber}</td>
                      </tr>`;
        });

        table += "</tbody></table>";

        document.getElementById("tulos").innerHTML = table;
    })
}


// {
//     "pagination": {
//         "limit": 10,
//             "offset": 0,
//                 "count": 6,
//                     "total": 6
//     },
//     "data": [
//         {
//             "flight_date": "2024-12-18",
//             "flight_status": "landed",
//             "departure": {
//                 "airport": "Helsinki-vantaa",
//                 "timezone": "Europe\/Helsinki",
//                 "iata": "HEL",
//                 "icao": "EFHK",
//                 "terminal": null,
//                 "gate": "21",
//                 "delay": 17,
//                 "scheduled": "2024-12-18T07:25:00+00:00",
//                 "estimated": "2024-12-18T07:25:00+00:00",
//                 "actual": "2024-12-18T07:41:00+00:00",
//                 "estimated_runway": "2024-12-18T07:41:00+00:00",
//                 "actual_runway": "2024-12-18T07:41:00+00:00"
//             },
//             "arrival": {
//                 "airport": "Leonardo Da Vinci (Fiumicino)",
//                 "timezone": "Europe\/Rome",
//                 "iata": "FCO",
//                 "icao": "LIRF",
//                 "terminal": "1",
//                 "gate": null,
//                 "baggage": null,
//                 "delay": null,
//                 "scheduled": "2024-12-18T09:55:00+00:00",
//                 "estimated": "2024-12-18T09:55:00+00:00",
//                 "actual": "2024-12-18T09:42:00+00:00",
//                 "estimated_runway": "2024-12-18T09:42:00+00:00",
//                 "actual_runway": "2024-12-18T09:42:00+00:00"
//             },
//             "airline": {
//                 "name": "Finnair",
//                 "iata": "AY",
//                 "icao": "FIN"
//             },
//             "flight": {
//                 "number": "1761",
//                 "iata": "AY1761",
//                 "icao": "FIN1761",
//                 "codeshared": null
//             },
//             "aircraft": {
//                 "registration": "OH-LXB",
//                 "iata": "A320",
//                 "icao": "A320",
//                 "icao24": "461F63"
//             },
//             "live": null
//         }]

// }