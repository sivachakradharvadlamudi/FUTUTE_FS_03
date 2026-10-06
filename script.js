// Category Tab Filtering
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            menuCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Handle Reservation Form
    const reserveForm = document.getElementById('reservation-form');
    const statusDiv = document.getElementById('res-status');

    if (reserveForm) {
        // Set default minimum date to today
        const dateInput = document.getElementById('res-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        reserveForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('res-name').value.trim();
            const phone = document.getElementById('res-phone').value.trim();
            const date = document.getElementById('res-date').value;
            const time = document.getElementById('res-time').value;
            const guests = document.getElementById('res-guests').value;

            if (!name || !phone || !date || !time) {
                statusDiv.className = 'res-status error';
                statusDiv.textContent = 'Please fill out all required fields.';
                return;
            }

            // Success feedback
            statusDiv.className = 'res-status success';
            statusDiv.textContent = `Reservation confirmed for ${name} on ${date} at ${time} (${guests} guests)! Check SMS for details.`;

            // Save to localStorage
            try {
                const reservations = JSON.parse(localStorage.getItem('aroma_reservations') || '[]');
                reservations.push({ name, phone, date, time, guests, createdAt: new Date().toISOString() });
                localStorage.setItem('aroma_reservations', JSON.stringify(reservations));
            } catch (err) {
                console.log(err);
            }

            reserveForm.reset();

            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = 'res-status';
            }, 6000);
        });
    }
});
