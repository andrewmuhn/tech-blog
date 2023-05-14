const selectPostHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  const blogPostId = event.target.getAttribute('id').split('-')[1];
  console.log(blogPostId);
  document.location.replace(`/view-post/${blogPostId}`);
  // console.log(document.location);
};

document
  .querySelector('.homepage-post-list')
  .addEventListener('click', selectPostHandler);
