const editPostForm = async (event) => {
  event.preventDefault();

  const title = document.querySelector('textarea[name="title"]').value;
  console.log(title);

  const post_txt = document.querySelector(
    'textarea[name="post-content"]'
  ).value;
  console.log(post_txt);

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(id);

  if (title && post_txt && id) {
    const response = await fetch("/api/posts/" + id, {
      method: "POST",
      body: JSON.stringify({ title: title, post_txt: post_txt }), //added title: title, and post_txt: post_txt
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
