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

  $.when(
    names,
    ...slugs.map(slug => $.ajax({
      // generate request url.
      url: ghost.url.api(
        'posts', {
          limit: 'all',
          filter: `tags:[${slug}]`
        }
      ),
      // enable cache.
      // https://github.com/SaneMethod/jquery-ajax-localstorage-cache
      localCache: true,
      cacheTTL: 3,
      cacheKey: `ghost-archive-tag-${slug}`
    }))
  ).done(
    renderPosts
  );
}


$.get(ghost.url.api('tags')).done(renderTags);
