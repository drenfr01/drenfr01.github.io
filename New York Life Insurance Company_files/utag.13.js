//tealium universal tag - utag.13 ut4.0.201304031935, Copyright 2013 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.src='2231853';u.type='keepg339';u.cat='nylco405';u.multicat="";u.qty=0;u.countertype='standard';u.qsp_delim=';';u.kvp_delim='=';u.base_url='//fls.doubleclick.net/activityi;';u.map={};u.extend=[];u.send=function(a,b,c,d,e,f,g){if(u.ev[a]||typeof u.ev.all!='undefined'){c=[];g=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'&&b[d]!=''){e=u.map[d].split(',');for(f=0;f<e.length;f++){if(e[f]=='cat'){u.cat=b[d]}
else if(e[f]=='multicat'){u.multicat=b[d]}
else if(e[f]=='type'){u.type=b[d]}
else if(e[f]=='src'){u.src=b[d]}
else{g.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]))}}}}
u.base_url+='src='+u.src+';type='+u.type+';';if(u.multicat==""){u.multicat_arr=[u.cat];}else{u.multicat_arr=u.multicat.split(';');}
if(b._corder){if(typeof b._cquan!='undefined'){for(f=0;f<b._cquan.length;f++){u.qty+=parseInt(b._cquan[f]);}};if(u.qty==0){u.qty=1};c.push('qty='+(u.qty));c.push('cost='+b._csubtotal);if(g.length>0)c.push(g.join(';'));c.push('ord='+b._corder);}else if(u.countertype=='standard'){if(g.length>0)c.push(g.join(';'));c.push('ord='+(Math.random()*10000000000000));}else if(u.countertype=='unique'){if(g.length>0)c.push(g.join(';'));c.push('ord=1');c.push('num='+(Math.random()*10000000000000));}else{if(g.length>0)c.push(g.join(';'));c.push('ord='+utag.data['cp.utag_main_ses_id']);}
for(f=0;f<u.multicat_arr.length;f++){d=document.createElement('iframe');d.setAttribute('id','utag_13_iframe');d.setAttribute('height','1');d.setAttribute('width','1');d.setAttribute('style','display:none');d.setAttribute('src',u.base_url+'cat='+u.multicat_arr[f]+((c.length>0)?';'+c.join(u.qsp_delim):''));document.body.appendChild(d);}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('13','newyorklife.main');}catch(e){}
