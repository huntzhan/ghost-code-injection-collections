function loadMathjax() {  
  if (document.body.innerText.indexOf("$") === -1) {
    return;
  }

  $.getScript("https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", () => {
    MathJax.Hub.Config({
      tex2jax: {inlineMath: [["$","$"], ["\\(","\\)"]]}
    });
  });
}

loadMathjax();  
