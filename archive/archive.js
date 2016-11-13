function renderPosts(tags, ...datas) {  
  // inject to
  // <div>
  // <ul id="customized-archive"></ul>
  // </div>
  document.getElementById('customized-archive-loading').style.display = 'none';
  tagList = document.getElementById('customized-archive');

  let n = tags.length;
  for (let i = 0; i < n; ++i) {
    let tag = tags[i];
    let posts = datas[i][0].posts;

    // filter posts by state.
    posts = posts.filter(post => post.status === "published");
    // ignore.
    if (!posts[0]) {
      continue;
    }

    // generate new tag.
    let tagLiNode = document.createElement("li");
    tagLiNode.appendChild(document.createTextNode(tag));

    let tagUlNode = document.createElement("ul");

    for (let post of posts) {
      let postLiNode = document.createElement("li");

      let aNode = document.createElement("a");
      aNode.href = `${post.url}`;
      aNode.innerHTML = `${post.title}`;

      postLiNode.appendChild(aNode);
      tagUlNode.appendChild(postLiNode);
    }

    tagLiNode.appendChild(tagUlNode);
    tagList.appendChild(tagLiNode);
  }
}

function renderTags(data) {  
  let slugs = data.tags.map(obj => obj.slug);
  let names = data.tags.map(obj => obj.name);

  let GETUrls = slugs.map(slug => ghost.url.api(
    'posts', {
      limit: 'all',
      filter: `tags:[${slug}]`
    }
  ));

  $.when(names, ...GETUrls.map(url => $.get(url))).done(renderPosts);
}


$.getScript('//code.jquery.com/jquery-1.12.0.min.js', () => {
  $.get(ghost.url.api('tags')).done(renderTags);
});
