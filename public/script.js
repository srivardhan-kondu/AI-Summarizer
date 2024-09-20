
const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
    const textarea = e.target;

    if (textarea.value.length > 200 && textarea.value.length < 100000) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function submitData(e) {
    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;

    fetch('/api/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text_to_summarize })
    })
    .then(response => response.json())
    .then(data => {
        summarizedTextArea.value = data.summarizedText;
        submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
        console.error(error.message);
        summarizedTextArea.value = "An error occurred: " + error.message;
        submitButton.classList.remove("submit-button--loading");
    });
}
        