// This script manages the header menu toggle functionality for the navigation menu.
// It expands or collapses the menu when the menu button is clicked.

const menuButton = document.querySelector("#header-menu-button");

// Adds a click event listener to the menu button to toggle the menu's maxHeight.
menuButton.addEventListener("click", (event) => {
    let menu = event.target.nextElementSibling;
    // If the menu is open, collapse it; otherwise, expand it to its scroll height.
    if(menu.style.maxHeight){
        menu.style.maxHeight = null;
    }
    else{
        menu.style.maxHeight = menu.scrollHeight + "px";
    }
});