const addCommentInput = (event) => {
  event.preventDefault();

  const commentHeader = document.createElement('h2');
  commentHeader.textContent = 'New Comment';

  const commentHeaderContainer = document.createElement('div');
  commentHeaderContainer.setAttribute('class', 'form-header');
  commentHeaderContainer.appendChild(commentHeader);

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.name = 'comment';
  commentInput.id = 'comment-input';

  const commentLabel = document.createElement('label');
  commentLabel.setAttribute('for', 'comment-input');
  commentLabel.innerHTML = 'Comment: ';

  const commentSubmit = document.createElement('input');
  commentSubmit.type = 'submit';
  commentSubmit.id = 'create-comment';
  commentSubmit.setAttribute('class', 'button-style');

  const commentForm = document.createElement('form');
  commentForm.setAttribute('class', 'form new-comment-form');
  commentForm.appendChild(commentLabel);
  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentSubmit);

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('class', 'p-div');
  inputContainer.appendChild(commentForm);

  const container = document.getElementById(
    'comment-input-container'
  );
  container.removeAttribute('class', 'none');
  container.setAttribute('class', 'form-container');
  container.appendChild(commentHeaderContainer);
  container.appendChild(inputContainer);

  const newCommentButton = document.getElementById('new-comment');
  newCommentButton.setAttribute('class', 'none');
};

const submitNewComment = async (event) => {
  event.preventDefault();

  const comment = document
    .querySelector('#comment-input')
    .value.trim();

  const postId = window.location.pathname.split('/')[2];

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#new-comment')
  .addEventListener('click', addCommentInput);

document
  .querySelector('#comment-input-container')
  .addEventListener('submit', submitNewComment);
