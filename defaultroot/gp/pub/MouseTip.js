var M_Tip = new MouseTip();
function MouseTip(){
    var id = 'tt';
    var top = 0;
    var left = -10;
    var maxw = 500;
    var speed = 100;
    var timer = 20;
    var endalpha = 100;
    var alpha = 0;
    var tt,t,c,b,h;
    var ie = document.all ? true : false;
    this.x = false;
    var o = this;
    o.x_x = false;
   
    return{
        show:function(v,w){
            if(this.x){
                if(tt == null){
                    tt = document.createElement('div');
                    tt.setAttribute('id',id);
                    t = document.createElement('div');
                    t.setAttribute('id',id + 'top');
                    c = document.createElement('div');
                    c.setAttribute('id',id + 'cont');
                    b = document.createElement('div');
                    b.setAttribute('id',id + 'bot');
                    tt.appendChild(t);
                    tt.appendChild(c);
                    tt.appendChild(b);
                    document.body.appendChild(tt);
                    tt.style.position = "absolute";
                    tt.style.opacity = 100;
                    tt.style.filter = 'alpha(opacity=100)';
                    tt.style.zIndex =3;
                    o.x_x = true;
                    
                    document.onmousemove = this.pos;
                }
                tt.style.display = 'block';
                tt.style.backgroundColor = "#abc";
                tt.style.padding = "5px";
   							c.style.color= 'red';//'#000000';//'#0000FF';
   							c.style.backgroundColor = '#369'; //'#1399EB';
   							c.style.position = "relative";
   							c.style.padding = "2 2 2 2";
   							
   							if(v=" "){
   								tt.style.display ='none';
   								} else{
   									tt.style.display ='';
   									}		
                c.innerHTML = v;
                
                tt.style.width = w ? w + 'px' : 'auto';
                if(!w && ie){
                    t.style.display = 'none';
                    b.style.display = 'none';
                    tt.style.width = tt.offsetWidth;
                    t.style.display = 'block';
                    b.style.display = 'block';
                }
                
               
                tt.style.zIndex =2;
 			          if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
                h = parseInt(tt.offsetHeight) + top;
                clearInterval(tt.timer);
                tt.timer = setInterval(function(){M_Tip.fade(1)},timer);
            }
        },
        pos:function(e){
            if( o.x_x ){
                var u = ie ? event.clientY + document.documentElement.scrollTop: e.pageY;
                var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;   
                tt.style.zIndex = 2;         
                tt.style.top = (u - h +30) + 'px';
                tt.style.left = (l + left + 30) + 'px';
            }
        },
        fade:function(d){
            if( o.x_x ){
                var a = alpha;
                if((a != endalpha && d == 1) || (a != 0 && d == -1)){
                    var i = speed;
                    if(endalpha - a < speed && d == 1){
                        i = endalpha - a;
                    }else if(alpha < speed && d == -1){
                        i = a;
                    }
                    alpha = a + (i * d);
                    tt.style.opacity = alpha * 0.1;
                    tt.style.filter = 'alpha(opacity=' + alpha + ')';
                }else{
                    clearInterval(tt.timer);
                    if(d == -1){tt.style.display = 'none'
                }}
            }
        },
        hide:function(){
            if( o.x_x ){
                clearInterval(tt.timer);
                tt.timer = setInterval(function(){M_Tip.fade(-1)},timer);
            }
        }
    };
}
M_Tip.x = true;