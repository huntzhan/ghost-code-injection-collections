let prism_base = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.1";

function loadCss(path) {  
  let linkText = `<link href='${path}' rel='stylesheet' type='text/css' />`;
  let link = $(linkText);
  link.appendTo("head");
}

function loadPrismRest() {  
  // css
  loadCss(`${prism_base}/themes/prism.min.css`);
  // patch style.
  $('<style> .token.operator { background: hsla(0, 0%, 100%, 0) none repeat scroll 0 0; } </style>').appendTo("head");

  // components.
  let components = ['c', 'cpp', 'python', 'ini'];
  $.when(...components.map(component => $.getScript(`${prism_base}/components/prism-${component}.min.js`)))
    .done(function () {
      Prism.highlightAll();
    });
}

function loadPrismMain() {  
  $.getScript(`${prism_base}/prism.min.js`, loadPrismRest);
}

function loadPrism() {  
  if (document.getElementsByTagName('pre').length === 0) {
    return;
  }
  loadPrismMain();
}

loadPrism();
