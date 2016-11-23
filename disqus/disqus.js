var disqus_config = function () {
  // https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables#thispageurl
  this.page.url = window.location.href.split('?')[0];
};


function getSrc() {
  let thread = document.getElementById('disqus_thread');
  let shortname = thread.dataset.shortname;
  return `//${shortname}.disqus.com/embed.js`;
}


function loadDisqus() {  
  var d = document, s = d.createElement('script');
  s.src = getSrc();
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}


function loadDisqusOnScroll() {
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
}


window.globalDisqusLoaded = false;
$(window).scroll(loadDisqusOnScroll);
