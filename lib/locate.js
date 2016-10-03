function locate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition,showError);
    }
    else {
        alert("Browser unterstützt Geolocation nicht!");
        // Position Friedberg als Location
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
    // Position Friedberg als Location
    lon = 8.7321;
    lat = 50.3398;
    drawmap();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            customAlert("Nutzer hat den Zugriff auf die Position abgelehnt.")
            break;
        case error.POSITION_UNAVAILABLE:
            customAlert("Keine Information zum Standort verfügbar.")
            break;
        case error.TIMEOUT:
            customAlert("Die Anfrage der Standortbestimmung hat zu lange gedauert.")
            break;
        case error.UNKNOWN_ERROR:
            customAlert("Bei der Standortbestimmung ist ein unbekannter Fehler aufgetreten..")
            break;
    }
}