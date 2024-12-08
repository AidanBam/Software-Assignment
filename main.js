// Function to show the popup
function showPopup() {
    document.getElementById('popup-overlay').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}

// Show the popup
setTimeout(showPopup);