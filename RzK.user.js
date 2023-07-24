// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Grzegorz Wilczyński
// @match        https://rysujzkrissem.pl/moje-konto/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rysujzkrissem.pl
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

setTimeout(function(){
(function() {
    'use strict';
    document.querySelector("#title").innerHTML="<h1>Moje kursy</h1>"
            var html=""

    function httpGet(theUrl)
{
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)

        {
            if(!localStorage.getItem("kursy")){
            var text=xmlhttp.responseText.substring(xmlhttp.responseText.indexOf('<table class="woocommerce-table woocommerce-table--order-downloads shop_table shop_table_responsive order_details">'),xmlhttp.responseText.length)
            var tabela=text.substring(1,text.indexOf('</table>'))
            tabela=tabela.replaceAll("\n","")
            tabela=tabela.replaceAll("\t","")

            var regexp = /<a href=.*woocommerce-MyAccount-downloads-file button alt.*<\/a>/g;
            var regexp4 = /<tr>.*<\/tr></g;
            var regexp3 = /data-title="Produkt">\n<a href=.*<\/a>/g;
            var a3=[...tabela.matchAll(regexp)];
            var array = [...tabela.matchAll(regexp4)];
            var bylo=0,masterclass=0;
            var regexp2 = /RzK\d{2}/g;
            var arrayRZK=[]
            var arrayMaster=[]
            array=tabela.split("</tr><tr>")
            for(i=0;i<array.length;i++){
                var tmp=array[i].split("</td><td")
                var linkdoodcinka=tmp[0].match(/<a href=\".*\"/)
                var o=new Object()

                o['url']=array[i].match(/\"Pobierz\"><a href=\".*\" c/)[0]
                o['url']=o['url'].substring(19,o['url'].length-3)
                o['tekst']=array[i].match(/alt\"\>.*\<\//)[0]
                o['tekst']=o['tekst'].substring(5,o['tekst'].length-6)
                o['tekst']=o['tekst'].toUpperCase()
                if(linkdoodcinka==null){
                    if(array[i].indexOf("MASTERCLASS PORTRET")!=-1){
                        o['img']="https://rysujzkrissem.pl/wp-content/uploads/2022/11/Kopia-Kopia-Kopia-Kopia-Kopia-Kopia-Rysuj-z-Krissem-4.jpg"
                    }
                    if(array[i].indexOf("Kurs MASTERCLASS POSTACIE *VIP*")!=-1){
                        o['img']="https://rysujzkrissem.pl/wp-content/uploads/2023/01/Kopia-Kopia-Kopia-Kopia-Kopia-Kopia-Rysuj-z-Krissem-15.jpg"
                    }
                    if(array[i].indexOf("MASTERCLASS ZWIERZAKI")!=-1){
                        o['img']="https://rysujzkrissem.pl/wp-content/uploads/2023/02/Kopia-Kopia-Kopia-Kopia-Kopia-Kopia-Rysuj-z-Krissem-16.jpg"
                    }
                }else{
                    $.ajax({
                        url: linkdoodcinka[0].substring(9,linkdoodcinka[0].length-2),
                        type: "post",
                        data: null,
                        contentType: false,
                        processData: false,
                        async: false,
                        cache: false,
                        timeout: 30000,
                        success: function(json){

                            var texttmp=json.substring(json.indexOf('rel="prettyPhoto[pp_gal]"'),json.indexOf('rel="prettyPhoto[pp_gal]"')+150)
                            var texttmp2=texttmp.match("href=.*>")[0]
                            o['img']=texttmp2.substring(6,texttmp2.length-2)
                        },
                        error: function(json){


                        }
                    });
                }
                arrayRZK.push(o)
            }

            arrayRZK.sort(function(a,b) {
                return a.tekst < b.tekst ? -1 : a.tekst > b.tekst ? 1 : 0;
            })
            for(var i=0;i<arrayRZK.length;i++){
                html+="<a href="+arrayRZK[i].url+" target='_blank'><img src='"+arrayRZK[i].img+"' style='width:100px;padding:5px' title='"+arrayRZK[i].tekst+"'></a>"
            }
            localStorage.setItem("kursy",html)
            }else{
            html=localStorage.getItem("kursy")
            }
            document.querySelector("#title").innerHTML="<h1>Moje kursy</h1>"
             document.querySelector("#title").innerHTML+=html
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();
}
    httpGet("https://rysujzkrissem.pl/moje-konto/downloads/")

})();
},1000)
