const newPostFormHandler = async (event) => {
  event.preventDefault();
  console.log('inside create new blogpost form handler');

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogpost', {
      method: 'POST',
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

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostFormHandler);
