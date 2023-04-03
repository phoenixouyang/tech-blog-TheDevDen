const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="new-post-title"]').value.trim();
    const description = document.querySelector('textarea[name="new-post-description"]').value.trim();

    if (title && description) {
        const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
        alert('Something went wrong. Please try again!');
        }
    }
};
  
document.querySelector('.create-blog').addEventListener('submit', newPostFormHandler);
