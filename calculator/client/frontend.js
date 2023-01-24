function change(value) {
    const input = document.getElementById('MainForm');
    input.value += value;
}

function result () {
    const input = document.getElementById('MainForm');
    return fetch('/calc/', {method : 'POST', 'body': JSON.stringify({ data: input.value }) }).then((response) => response.json())
    .then((data) => input.value = data.result); 
}