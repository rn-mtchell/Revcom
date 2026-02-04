document.addEventListener("DOMContentLoaded", function () {

    // --- 1. LOGIN/REGISTER PAGE LOGIC ---
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // Only run this if we are actually on the Login page
    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });

        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('error') === 'notfound') {
            container.classList.add("right-panel-active");
            alert("Email not found. Please create an account first!");
        } 
        else if (urlParams.get('error') === 'wrongpassword') {
            alert("Invalid password. Please try again.");
        }
        else if (urlParams.get('error') === 'invalidemail') {
            alert("Please enter a valid email address.");
        }
    }

    // --- 2. DASHBOARD NAVBAR SCROLL EFFECT ---
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. WATCHLIST TOGGLE LOGIC (AJAX) ---
    const watchlistBtns = document.querySelectorAll('.watchlist-btn');

    watchlistBtns.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent any accidental jumps
            
            // Get data from the parent movie-card
            const card = this.closest('.movie-card');
            const movieId = card.getAttribute('data-id');
            const title = card.getAttribute('data-title');
            const poster = card.getAttribute('data-poster');
            const icon = this.querySelector('i');

            // Send data to PHP without refreshing
            fetch('add_to_watchlist.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `movie_id=${movieId}&title=${encodeURIComponent(title)}&poster=${poster}`
            })
            .then(response => response.text())
            .then(data => {
                if (data.trim() === 'added') {
                    // Visual change to "Filled" state
                    this.classList.add('active');
                    icon.classList.replace('fa-regular', 'fa-solid');
                } else if (data.trim() === 'removed') {
                    // Visual change to "Outline" state
                    this.classList.remove('active');
                    icon.classList.replace('fa-solid', 'fa-regular');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });

});