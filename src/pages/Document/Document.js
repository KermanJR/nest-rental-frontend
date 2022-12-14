
import React from "react";

export const Document = () =>{
   
    let key = window.localStorage.getItem('key_document_user_new');
    var widget = '';
    var input = '';
    setTimeout(()=>{
        widget = window.document.querySelector("#request_signature_key");
        input = window.document.querySelector("#request_signature_key");
        
    }, 3000)
    
    
    function Clicksign(i){
        "use strict";
        function n(n){
            var t;
            (e[(t=n).name||t]||[]).forEach(function(t){
                t(n.data)})}
                var o,r,t=window.location.protocol+"//"+window.location.host,e={}
                ,u=function(t){n(t.data)};
                return{
                    endpoint:"https://app.clicksign.com",
                    origin:t,
                    mount:function(t){
                        var n="/sign/"+i,
                        e="?embedded=true&origin="+this.origin;
                        e=this.endpoint+n+e;
                        return r=document.getElementById(t),(o=document.createElement("iframe")).setAttribute("src",e),
                        o.setAttribute("style","width: 100%; height: 100%;"),
                        o.setAttribute("allow","camera"),window.addEventListener("message",u),
                        r.appendChild(o)
                    },
                    unmount:function(){
                        return o&&(r.removeChild(o),o=r=null,window.removeEventListener("message",n)),!0},on:function(t,n){return e[t]||(e[t]=[]),e[t].push(n)},trigger:n}
    }

    function run(key){
       
        if(widget){widget.unmount();}
        widget = new Clicksign(key);

        widget.endpoint = 'https://app.clicksign.com';
        widget.origin = 'https://nest-rental-frontend.herokuapp.com/produto/ecolift-50';
        widget.mount('container');

        widget.on('loaded', function(ev) { console.log('loaded!'); });
        widget.on('signed', function(ev) { console.log('signed!'); });
        widget.on('resized', function(height) {
          console.log('resized!');
          document.getElementById('container').style.height = height+'px';
        });
        //window.localStorage.setItem('document_key_signer', '');
    }

    React.useEffect(()=>{
        run(key);
    }, [])

    
   
    return(
        <>
            <div>
                <input id='request_signature_key' style={{display: 'none'}}/>
                
            </div>

            <div id='container' style={{height: "600px"}}></div>
        </>
    );
}