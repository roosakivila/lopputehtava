export function fetchFlightsToItaly() {
    const flightUrl = "https://api.aviationstack.com/v1/flights";
    const accessKey = encodeURIComponent('a0def25e65dbc9897706fe8acb707efd');
    const depIataCode = encodeURIComponent("HEL");
    const arrIataCode = encodeURIComponent("FCO");
    const limit = encodeURIComponent(10);

    const url = `${flightUrl}?access_key=${accessKey}&dep_iata=${depIataCode}&arr_iata=${arrIataCode}&limit=${limit}`;


    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched flight data:', data.data);
            return data.data;
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

