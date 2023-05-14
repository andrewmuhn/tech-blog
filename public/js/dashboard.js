const newPost = () => {
  document.location.replace('/new-post');
};

const selectPostHandler = async (event) => {
  event.preventDefault();
  const blogPostId = event.target.getAttribute('id').split('-')[1];
  console.log(blogPostId);
  document.location.replace(`/edit-post/${blogPostId}`);
  console.log(document.location);
};

document
  .querySelector('.dashboard-post-list')
  .addEventListener('click', selectPostHandler);

document
  .querySelector('#new-post')
  .addEventListener('click', newPost);
