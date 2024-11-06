document.getElementById('eventForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const mensaje = document.getElementById('mensaje').value;

    const response = await fetch('/add-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fecha, mensaje })
    });

    const result = await response.json();
    alert(result.message);
});
