document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.getElementById('posts-container');
    const createPostBtn = document.getElementById('create-post-btn');
    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');

    createPostBtn.addEventListener('click', function () {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (title && content) {
            createPost(title, content);

            titleInput.value = '';
            contentInput.value = '';
        } else {
            alert('Please enter a title and content to create a new post');
        }
    });

    function createPost(title, content) {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const displayContent = content.length > 60
            ? content.substring(0, 60) + '... '
            : content;

        const fullContent = content;

        postElement.innerHTML = `
            <h3>${title}</h3>
            <div class="post-content">
                <span>${displayContent}</span>
                ${content.length > 60 ? '<span class="read-more">Read more</span>' : ''}
            </div>
            <div class="comments">
                <h4>Comments</h4>
                <div class="comments-list"></div>
                <div class="comment-form">
                    <input type="text" class="comment-input" placeholder="Add a comment...">
                    <button class="comment-btn">Comment</button>
                </div>
            </div>
        `;

        const commentBtn = postElement.querySelector('.comment-btn');
        const commentInput = postElement.querySelector('.comment-input');
        const commentsList = postElement.querySelector('.comments-list');

        commentBtn.addEventListener('click', function () {
            const commentText = commentInput.value.trim();

            if (commentText) {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.textContent = commentText;

                commentsList.appendChild(commentElement);
                commentInput.value = '';
            }
        });

        const readMoreBtn = postElement.querySelector('.read-more');
        const contentSpan = postElement.querySelector('.post-content span:first-child');

        if (readMoreBtn) {
            let isExpanded = false;

            readMoreBtn.addEventListener('click', function () {
                if (!isExpanded) {
                    contentSpan.textContent = fullContent;
                    readMoreBtn.textContent = 'Show less';
                    isExpanded = true;
                } else {
                    contentSpan.textContent = displayContent;
                    readMoreBtn.textContent = 'Read more';
                    isExpanded = false;
                }
            });
        }

        postsContainer.prepend(postElement);
    }
});