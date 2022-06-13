const editPostForm = async (event) => {
  event.preventDefault();
  const title = document.querySelector('textarea[name="title"]').value;
  const post_txt = document.querySelector(
    'textarea[name="post-content"]'
  ).value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  if (title && post_txt && id) {
    const response = await fetch("/api/posts/" + id, {
      method: "PUT",
      body: JSON.stringify({ title: title, post_txt: post_txt }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (id) {
    const response = await fetch("/api/posts/${id}", {
      method: "DELETE",
      body: JSON.stringify({ post_id: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editPostForm);

document.querySelector("#delete-post").addEventListener("submit", deletePost);
