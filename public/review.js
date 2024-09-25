document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    const reviewData = {
        name,
        email,
        rating,
        comments
    };

    // Send data to the server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/submit-review', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Clear the form
                document.getElementById('feedback-form').reset();
                // Show thank you message
                alert("Thank you for your feedback!"); // Show success message
            } else {
                const errorResponse = JSON.parse(xhr.responseText);
                alert(errorResponse.error); // Show error message
            }
        }
    };

    xhr.send(JSON.stringify(reviewData)); // Send the JSON data
});