let projectLinksContainer = document.querySelector('#projectLinksContainer');
let projectOneContainer = document.querySelector('#sectionOneContainer');
let projectTwoContainer = document.querySelector('#sectionTwoContainer');
let projectThreeContainer = document.querySelector('#sectionThreeContainer');
let projectFourContainer = document.querySelector('#sectionFourContainer');

projectLinksContainer.addEventListener('mouseover', (e) => {

            if (e.target.attributes.id.value == "projectOneLink") {
                projectOneContainer.classList.remove("hidden");
                projectTwoContainer.classList.add("hidden");
                projectThreeContainer.classList.add("hidden");
                projectFourContainer.classList.add("hidden");
            }

            if (e.target.attributes.id.value == "projectTwoLink") {
                projectTwoContainer.classList.remove("hidden");
                projectOneContainer.classList.add("hidden");
                projectThreeContainer.classList.add("hidden");
                projectFourContainer.classList.add("hidden");
            }

            if (e.target.attributes.id.value == "projectThreeLink") {
                projectThreeContainer.classList.remove("hidden");
                projectOneContainer.classList.add("hidden");
                projectTwoContainer.classList.add("hidden");
                projectFourContainer.classList.add("hidden");
            }

            if (e.target.attributes.id.value == "projectFourLink") {
                projectFourContainer.classList.remove("hidden");
                projectOneContainer.classList.add("hidden");
                projectTwoContainer.classList.add("hidden");
                projectThreeContainer.classList.add("hidden");
            }

});