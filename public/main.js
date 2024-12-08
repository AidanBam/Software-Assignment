// JS for like functinality of buttons or something like that


// Like a function but like a function
function loadContent(page) {


    // Like targeting the database or smth like that
    const contentArea = document.querySelector('.content-area');


    // Removes content from contentArea, if any
    contentArea.innerHTML = '';


    // Alot of things but mainly retrives db content and if it can adds it to the html, let of catches for errors
    fetch(`/db/content/${page}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            data.forEach(lesson => {
                const lessonBox = document.createElement('div');
                lessonBox.classList.add('lesson-card');
                lessonBox.innerHTML = `
                    <h2>${lesson.title}</h2>
                    <p>${lesson.description.replace(/\n/g, '<br>')}</p>
                `;
                contentArea.appendChild(lessonBox);
            });
        })
        .catch(error => {
            console.error(`Error fetching ${page} lessons:`, error);
            contentArea.innerHTML = '<p>Error loading lessons.</p>';
        });
}


// On page load opens home db so there is always content
document.addEventListener('DOMContentLoaded', () => {
    openTab('home');
    loadContent('home');
});



// LIke for switching DB button content things
function openTab(tabName) {
    const tabs = document.querySelectorAll('.content-area');
    tabs.forEach(tab => {
        if (tab.id === tabName) {
            tab.classList.add('active');
            // Umm this is the wrong name but it works so im just going to say its fine, umm probably unnecesary anyways
            // whatever it fine just like yeh, i think its old code, as i had like 3 different versions then merged them all
            // so like its probably unnecisary | Also i cant spell for shit
            loadLesson(tabName);
        } else {
            tab.classList.remove('active');
        }
    });
}

function showOrRemoveSettings() {
    // Show the settings panel and apply the background opacity
    if (document.querySelector('.settings-panel').classList.contains('active')) {
        document.querySelector('.settings-panel').classList.remove('active');
    }
    else {
        document.querySelector('.settings-panel').classList.add('active');
    }
}