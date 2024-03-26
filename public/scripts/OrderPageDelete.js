console.log('скрипт подключен');

const content = document.querySelector('.card-wrapper');

if (content) {
  content.addEventListener('click', async (event) => {
    if (event.target.classList.contains('order-remove-button')) {
      const { id } = event.target.dataset;
      console.log(id);
      try {
        // event.target.closest('.drug').remove();
        const response = await fetch(`/orders/${id}`, {
          method: 'DELETE',
        });
        console.log(response);
        if (response.status === 200) {
         const item = event.target.closest('.drugOrder');
         console.log(item);
          item.remove();
          // if (!document.querySelector('.drug')) {
          //   window.location.href = '/';
          // }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}
