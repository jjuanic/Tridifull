document.addEventListener('DOMContentLoaded', function() {
    const likeForms = document.querySelectorAll('.like-form');
    likeForms.forEach(form => {
      form.addEventListener('click', async function(event) {
        if (event.target.classList.contains('like-button')) {
          event.preventDefault(); // Prevent form submission
          const button = event.target;
          const data = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
              'Accept': 'application/json'
            }
          });
  
          if (response.ok) {
            const result = await response.json();
            if (result.liked) {
              button.classList.remove('btn-primary');
              button.classList.add('btn-danger');
              button.innerHTML = '<i class="fas fa-heart"></i> Quitar me gusta';
            } else {
              button.classList.remove('btn-danger');
              button.classList.add('btn-primary');
              button.innerHTML = '<i class="fas fa-heart"></i> Me gusta';
            }
          } else {
            console.error('Failed to like/unlike album');
          }
        }
      });
    });
});
