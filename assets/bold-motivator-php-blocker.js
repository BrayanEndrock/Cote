var blackList = ["motivator.php"];
 
function shappify_block_scripts(list) {
  document.createElement = (function(){
    var cached_function = document.createElement;
    return function(list){
    if(arguments[0].toLowerCase() !== 'script'){
      return cached_function.apply(this, arguments);
    }
    var scriptElt = cached_function.apply(this, arguments);
    var originalDescriptors = {
      src: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src'),
      type: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'type')
    }
    Object.defineProperties(scriptElt, {
      'src': {
        set(value) {
          // If we set the source to a blacklisted url, we enforce the right type.
          if(isInBlacklist(value)) {
            scriptElt.type = 'javascript/blocked'
          }
          return originalDescriptors.src.set.call(this, value)
        },
        get() {
          return originalDescriptors.src.get.call(this)
        }
      },
      'type': {
        set(value) {
          return originalDescriptors.type.set.call(
            this,
            isInBlacklist(scriptElt.src)?'javascript/blocked' : value
         )
        },
        get() {
          return originalDescriptors.type.get.call(this)
        }
       }
     })
     scriptElt.setAttribute = function(name, value) {
       if(name === 'type' || name === 'src'){
         scriptElt[name] = value;
       } else{
         HTMLScriptElement.prototype.setAttribute.call(scriptElt, name, value);
       }
      }
      return scriptElt;
     }
  })();
 
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
      mutation.addedNodes.forEach(function(node){
        if(node.nodeType === 1 && node.tagName === 'SCRIPT'){
          var src = node.src || '';
          if(isInBlacklist(src)){
          node.type = "javascript/blocked";
        }
      }
    });
   });
  });
 
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
 
  function isInBlacklist(src){
    if(list.includes(src) || (list.filter(function(str){
      return src.includes(str);
    }).length > 0)){
      return true;
    }
    return false;
  }
 
}
 
shappify_block_scripts(blackList);