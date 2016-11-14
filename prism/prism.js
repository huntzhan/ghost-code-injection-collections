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


let prism_base = "//cdn.bootcss.com/prism/1.5.1";


function toThemePath(theme) {
  return `${prism_base}/themes/${theme}.min.css`;
}


function toComponentPath(component) {
  return `${prism_base}/components/prism-${component}.min.js`;
}


function toPluginPath(plugin) {
  return [
    `${prism_base}/plugins/${plugin}/prism-${plugin}.min.css`,
    `${prism_base}/plugins/${plugin}/prism-${plugin}.min.js`
  ];
}


function loadCss(path) {  
  let linkText = `<link href='${path}' rel='stylesheet' type='text/css' />`;
  let link = $(linkText);
  link.appendTo("head");
}


function extractDataField(key) {
  let currentScript = document.getElementById('load-prism');
  let data = currentScript.dataset[key];
  if (data) {
    return data.trim().split(/\s+/);
  } else {
    return [];
  }
}


// data-prism-theme="xxx"
// return css paths.
function extractTheme() {
  // prism.min.css, required.
  let theme = ['prism'];
  return theme.concat(extractDataField('prism-theme')).map(toThemePath);
}


// data-prism-components="xxx xxx"
// return js paths.
function extractComponents() {
  let components = ['c', 'markup', 'css', 'javascript'];
  return components.concat(extractDataField('prism-components')).map(toComponentPath);
}


// data-prism-plugins="xxx xxx"
// return (css, js) paths.
function extractPlugins() {
  let pluginCss = [];
  let pluginJs = [];
  for (let plugin of extractDataField('prism-plugins')) {
    let [css, js] = toPluginPath(plugin);
    pluginCss.push(css);
    pluginJs.push(js);
  }
  return [pluginCss, pluginJs];
}


function loadPrismRest() {  
  let prismCss = [];
  let prismJs = [];

  // theme.
  prismCss = prismCss.concat(extractTheme());

  // components.
  prismJs = prismJs.concat(extractComponents());

  // plugins.
  let [pluginCss, pluginJs] = extractPlugins();
  prismCss = prismCss.concat(pluginCss);
  prismJs = prismJs.concat(pluginJs);

  // load css.
  for (let cssPath of prismCss) {
    loadCss(cssPath);
  }
  // patch style.
  $(
    `<style>
     .token.operator {
       background: hsla(0, 0%, 100%, 0) none repeat scroll 0 0;
     }
    </style>`
  ).appendTo("head");

  // load js.
  $.when(
    ...prismJs.map(jsPath => getScriptWithCache(jsPath))
  ).done(() => {
    Prism.highlightAll();
  });
}


function loadPrismMain() {  
  getScriptWithCache(`${prism_base}/prism.min.js`, loadPrismRest);
}


function loadPrism() {  
  if (document.getElementsByTagName('pre').length === 0) {
    return;
  }
  loadPrismMain();
}


loadPrism();
