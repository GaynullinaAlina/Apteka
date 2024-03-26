const cardWrapper = document.querySelector('.card-wrapper');

if (cardWrapper) {
  cardWrapper.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
      const { id } = event.target.dataset;
      try {
        const response = await fetch(`/item/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 200) {
          const { err, msg } = await response.json();
          if (msg) {
            event.target.closest('.card').remove();
          }
          if (err) {
            console.log(err);
          }
        } else {
          console.log('Все упало...');
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}
