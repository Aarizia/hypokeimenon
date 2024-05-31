let allProjectsButtonContainer = document.querySelector("#allProjectsButtonContainer");
let allProjectsMenuFrame = document.querySelector("#allProjectsMenuFrame");


allProjectsButtonContainer.addEventListener('click', function() {
    if (allProjectsMenuFrame.classList.contains("hidden")) {
    allProjectsMenuFrame.classList.remove("hidden");
    } else {
        allProjectsMenuFrame.classList.add("hidden");
    }
});