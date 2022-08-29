
import React from "react";
import { useLocation } from "react-router-dom";




export const Document = () =>{
    const key_signature = window.localStorage.getItem('key_signature'); 
    const { state } = useLocation();
    const { token } = state;
    console.log(token)

    var widget = '';
    var input = '';
    setTimeout(()=>{
        widget = window.document.querySelector("#request_signature_key");
        input = window.document.querySelector("#request_signature_key");
        console.log(widget)
    }, 4000)
    
    
    function Clicksign(i){"use strict";function n(n){var t;(e[(t=n).name||t]||[]).forEach(function(t){t(n.data)})}var o,r,t=window.location.protocol+"//"+window.location.host,e={},u=function(t){n(t.data)};return{endpoint:"https://app.clicksign.com",origin:t,mount:function(t){var n="/sign/"+i,e="?embedded=true&origin="+this.origin,e=this.endpoint+n+e;return r=document.getElementById(t),(o=document.createElement("iframe")).setAttribute("src",e),o.setAttribute("style","width: 100%; height: 100%;"),o.setAttribute("allow","camera"),window.addEventListener("message",u),r.appendChild(o)},unmount:function(){return o&&(r.removeChild(o),o=r=null,window.removeEventListener("message",n)),!0},on:function(t,n){return e[t]||(e[t]=[]),e[t].push(n)},trigger:n}}

    function run(){
       // var request_signature_key = input.value;
        if(widget){widget.unmount();}
        widget = new Clicksign(token);

        widget.endpoint = 'https://sandbox.clicksign.com';
        widget.origin = 'https://nest-rental.herokuapp.com';
        widget.mount('container');

        widget.on('loaded', function(ev) { console.log('loaded!'); });
        widget.on('signed', function(ev) { console.log('signed!'); });
        widget.on('resized', function(height) {
          console.log('resized!');
          document.getElementById('container').style.height = height+'px';
        });
    }

    React.useEffect(()=>{
        run();
    }, [key_signature])
    
   
    return(
        <>
            <div>
                <input id='request_signature_key' value={token} style={{display: 'none'}}/>
            </div>

            <div id='container' style={{height: "600px"}}></div>
        </>
    );
}
