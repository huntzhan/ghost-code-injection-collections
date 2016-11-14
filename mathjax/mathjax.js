function getScriptWithCache(url, callback) {
  callback = (typeof callback != 'undefined') ? callback : {};
  return $.ajax({
    type: "GET",
    url: url,
    success: callback,
    dataType: "script",
    cache: true
  });
}


function loadMathjax() {  
  if (document.body.innerText.indexOf("$") === -1) {
    return;
  }

  getScriptWithCache(
    "//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
    () => {
      MathJax.Hub.Config({
        tex2jax: {inlineMath: [["$","$"], ["\\(","\\)"]]}
      });
    }
  );
}


loadMathjax();
