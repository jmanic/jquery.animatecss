// jquery animate using css3 transitions if available
// Author: Filipe Almeida
// Usage: $(selector).animateCss(properties,options);
// Options: Same as animate

(function($) {
  var detected=null, transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition'    : 'transitionend',
    'OTransition'      : 'oTransitionEnd',
    'msTransition'     : 'MSTransitionEnd transitionend',
    'transition'       : 'transitionend'
  },_tend=''

  var _detect=function(){
    if(detected=$.hascsstransition())_tend=transEndEventNames[detected];
    console.log("animateCss uses: "+detected);
    return detected;
  };

  $.hascsstransition=function(){
    var style=(document.body||document.documentElement).style,prop='transition';

    if(window.Modernizr && Modernizr.prefixed)return Modernizr.prefixed(prop);

    if(typeof style !== 'undefined')
      for(var pf=['Moz','Webkit','O','ms',''], p=prop, i=pf.length-1; i>=0; p=pf[--i]+prop.charAt(0).toUpperCase()+prop.substr(1))
        if(typeof style[p] !== 'undefined')return pf[i]+prop;
    
    return false;
  };

  $.fn.animateCss = function(props, opt) { //must add support to ( props, optdur, easing, complete )
    if(!isNaN(opt))opt={duration:opt};
    opt = $.extend({duration:400}, opt);

    //lazy detection
    (detected!==null || _detect());

    //css transition not available
    if(!detected)return $(this).animate(props, opt);

    //css transition
    var t=[];
    for(var p in props)t.push( [p,opt.duration+'ms'].join(' ') );
    return $(this).css( {transition : t.join(', ')} ).css(props).bind(_tend, function(a,b,c,d){
        $(this).css({transition:'none'}).unbind(_tend);
        
        opt.complete&&opt.complete();
    });

  };
})(jQuery);