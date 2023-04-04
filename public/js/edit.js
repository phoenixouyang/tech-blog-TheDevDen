const editPostFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('textarea[name="edit-post-description"]').value.trim();
    const title = document.querySelector('.edit-title').dataset.post_title;
    const post_id = document.querySelector('.edit-post-section').dataset.post_id;

    if (description) {
        const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({title, description}),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
        alert('Something went wrong. Please try again!');
        }
    }
};
  
document.querySelector('.edit-post').addEventListener('submit', editPostFormHandler);
