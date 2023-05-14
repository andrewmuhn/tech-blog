const postId = window.location.pathname.split('/')[2];

const handleUpdate = async (event) => {
  event.preventDefault();
  console.log('update');

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogpost/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
const handleDelete = async (event) => {
  event.preventDefault();
  console.log('delete');

  const response = await fetch(`/api/blogpost/${postId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    console.log('delete response ok');
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('.edit-post')
  .addEventListener('submit', handleUpdate);
document
  .querySelector('.delete-button')
  .addEventListener('click', handleDelete);
