function locate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition,showError);
    }
    else {
        alert("Browser unterstützt Geolocation nicht!");
        // Position Friedberg als Start
        lon = 8.7321;
        lat = 50.3398;
        drawmap();
    }
}

function getPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    drawmap();


}

function showError(error) {
    // Position Friedberg als Start
    lon = 8.7321;
    lat = 50.3398;
    drawmap();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}