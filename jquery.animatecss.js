// jquery animate using css3 transitions if available
// Author: Filipe Almeida
// Usage: $(selector).animateCss(properties,options);
// Options: Same as animate

(function($) {
  var detected=null;

  $.hascsstransition=function(){
    var style=(document.body||document.documentElement).style,prop='transition';

    if(window.Modernizr && Modernizr.prefixed)return Modernizr.prefixed(prop);

    if(typeof style !== 'undefined')
      for(var pf=['Moz','Webkit','O','ms'], p=prop, i=pf.length; i>=0; p=pf[--i]+prop.charAt(0).toUpperCase()+prop.substr(1))
        if(typeof style[p] !== 'undefined')
          return ["-moz-","-webkit-","-o-","ms",''][i]+prop;
    
    return false;
  };
  
  $.fn.animateCss = function(props, opt) {
    if(!isNaN(opt))opt={duration:opt};
    opt = $.extend({duration:400}, opt);

    //lazy detection
    if(detected===null) detected=$.hascsstransition();

    //css transition not available
    if(!detected)return $(this).animate(props, opt);

    //css transition
    var t=[];
    for(var p in props)t.push( [p,opt.duration+'ms'].join(' ') );
    return $(this).css( {transition : t.join(', ')} ).css(props).delay(opt.duration);

  };

  $.fn.animateCssEnd=function(){ $(this).css({transition:'none'}) };

})(jQuery);