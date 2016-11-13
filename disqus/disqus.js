function loadDisqus() {  
  var d = document, s = d.createElement('script');
  s.src = '//huntzhanorg.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}

window.globalDisqusLoaded = false;

$(window).scroll(function() {
  if (window.globalDisqusLoaded) {
    return;
  }

  let windowHeight = $(window).scrollTop() + $(window).height();
  let documentHeight = $(document).height();
  let offset = 800;

  if (windowHeight + offset >= documentHeight) {
    window.globalDisqusLoaded = true;
    loadDisqus();
  }
});
