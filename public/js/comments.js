const newCommentForm = async (event) => {
  event.preventDefault();

  const comment_txt = document
    .querySelector('textarea[name="comments"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_txt && post_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id, comment_txt }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentForm);
