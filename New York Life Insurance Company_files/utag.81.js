//tealium universal tag - utag.81 ut4.0.201410151503, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var _fbds=_fbds||{};var _fbq=_fbq||[];try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){u.data={"base_url":"//connect.facebook.net/en_US/fbds.js","pixel_id":"1500480283499946","value":"","currency":""}
var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf("event.")===0){c.push(b[d]);}else{u.data[e[f]]=b[d];}}}}
window._fbds.pixelId=u.data.pixel_id;if(!u.initialized){u.initialized=true;window._fbq.push(["track","PixelInitialized",{"value":u.data.value,"currency":u.data.currency}]);}
for(var i=0;i<c.length;i++){window._fbq.push(c[i]);}
u.loader_cb=function(){};u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_81'});}};utag.o[loader].loader.LOAD(id);}('81','newyorklife.main'));}catch(error){utag.DB(error);}
