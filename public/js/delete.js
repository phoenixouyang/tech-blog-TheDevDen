const deleteButtons = document.querySelectorAll('[id^="delete-btn-"]');

const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.id.split('-')[2];

    console.log(post_id)

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something went wrong. Please try again!');
    }
};

deleteButtons.forEach(button => {
  button.addEventListener('click', deletePostFormHandler);
});
