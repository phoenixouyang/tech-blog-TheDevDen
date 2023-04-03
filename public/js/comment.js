const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-input').value.trim();
    const post_id = document.querySelector('.comment-form').dataset.post_id;
  
    if (comment_text) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      document.location.reload();
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  