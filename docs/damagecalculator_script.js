
        let currentLanguage = 'jp';
        window.onload = (event) => {
           
           
        };
        

        
        
        function setPreset(Basedamage,Boost,Damageplus,Multiplier,X,Y,Setup,ADD) {
            document.getElementById('damage').value = Basedamage;
            
            !isNaN(Boost) && (document.getElementById('input_boost').value = Boost);
            !isNaN(Damageplus) && (document.getElementById('input_damagePlus').value = Damageplus);
            
            if (!isNaN(Multiplier)){
                
                switch (Multiplier) {
                    case 1:
                        document.getElementById('a1').checked = true;
                        break;
                    case 2:
                        document.getElementById('a2').checked = true;
                        break;
                    case 4:
                        document.getElementById('a4').checked = true;
                        break;
                    default:
                        document.getElementById('acustom').checked = true;
                        document.getElementById('acustominput').value = Multiplier;
                    }
                
            }
            
            !isNaN(X) && (document.getElementById('input_X').value = X);
            
            !isNaN(Y) && (document.getElementById('input_Y').value = Y);
            
            !isNaN(ADD) && (document.getElementById('input_ADD').value = ADD);
            
            
            !isNaN(Setup) && (document.getElementById('input_Setup').value = Setup);
            
            calculate();
        }

        function calculate() {
            let Basedamage = parseFloat(document.getElementById('damage').value);
            let Boost = parseFloat(document.getElementById('input_boost').value);
            let Damageplus = parseFloat(document.getElementById('damagePlus').value);
            let Multiplier = 1;
            
            let X = parseFloat(document.getElementById('input_X').value);
            let Y = parseFloat(document.getElementById('input_Y').value);
            
            let Setup = parseFloat(document.getElementById('input_Setup').value);
            
            if (isNaN(Setup)) {
                Setup = 0;
            }
            
            let acustomflag  = document.querySelector('input[name="coeff"]:checked').id ==="acustom" ? true : false;
            
            if(acustomflag){
                Multiplier = parseFloat(document.getElementById('acustominput').value);
            }else{
              Multiplier = parseFloat(document.querySelector('input[name="coeff"]:checked').value);
            }
            
            let Type = document.getElementById('cardtypeselect').value;
            
            
            if (Type=="cardtype_LustrousHeroicKing"){
                X = X * Setup;
                Y = parseFloat(document.getElementById('input_ADD').value);
            }
            
            if ((Type=="cardtype_RadiantMaestro")||(Type=="cardtype_setup")||(Type=="cardtype_debug")){
                X = Setup;
                Y = parseFloat(document.getElementById('input_ADD').value);
            }
            
            if (Type=="cardtype_AbsolutePower"){
                X = Boost;
                Y = parseFloat(document.getElementById('input_ADD').value);
            }
            
            
            //入力が不正なら0として扱う
            
            if (isNaN(Boost)) {
                Boost = 0;
            }
            
            if (isNaN(Damageplus)) {
                Damageplus = 0;
            }
            
            if (isNaN(Basedamage)) {
                Basedamage = 0;
            }
                
            if (isNaN(X)) {
                X = 0;
            }
            
            if (isNaN(Y)) {
                Y = 0;
            }
            
            
            if (isNaN(Multiplier)) {
                Multiplier = 1;
            }
            
            
            //別の関数で計算
            //function calculation(Basedamage,Boost,Damageplus,Multiplier,Type,X,Y)
            let results = calculation(Basedamage,Boost,Damageplus,Multiplier,Type,X,Y);
            
            
            
            let resultvaluehtml = results.result_total;
        
            
            if (results.result_total>Math.max(Math.ceil(Basedamage),0)){
            resultvaluehtml = "<span style=\"color:#00ff00;\">"+resultvaluehtml+"</span>";
            }else if(results.result_total<Math.min(Basedamage,999)){
            resultvaluehtml = "<span style=\"color:#ff0000;\">"+resultvaluehtml+"</span>";
            }
            
            const resulthtml = document.getElementById('cardtext_damage');
            resulthtml.innerHTML = messages[currentLanguage].cardtext_damage.replace("{0}", resultvaluehtml)
            

            /*
            
            document.getElementById('result_Basedamage').innerText = Basedamage;
            document.getElementById('result_Boost').innerText = Boost;
            document.getElementById('result_Multiplier_Boost').innerText = Multiplier;
            document.getElementById('result_Multiplier_Damageplus').innerText = Multiplier;
            document.getElementById('result_Damageplus').innerText = Damageplus;
            document.getElementById('result2_boosted').innerText = results.result_boosted;
            document.getElementById('result2_multiplied').innerText = results.result_multiplied;
            document.getElementById('result2').innerText = results.result;
            */
            const multipleTEXT = document.getElementById('multiple');
            
            if (Multiplier!=1){
                    multipleTEXT.innerText = messages[currentLanguage].cardtext_damageratio.replace("{0}", Multiplier);
                
                if (!acustomflag){
                    if (Multiplier==2){
                    multipleTEXT.innerText = messages[currentLanguage].cardtext_damageratio_2.replace("{0}", messages[currentLanguage].cardtext_2x);
                    }
                    if (Multiplier==4){
                    multipleTEXT.innerText = messages[currentLanguage].cardtext_damageratio_2.replace("{0}", messages[currentLanguage].cardtext_4x);
                    }
                }
                
            }else{
                multipleTEXT.innerText = "";
            }
            
            
             if (["cardtype_setup", "cardtype_debug","cardtype_XY","cardtype_LustrousHeroicKing","cardtype_RadiantMaestro", "cardtype_AbsolutePower"].includes(Type)) {


                
                let result_total_added_HTML = results.result_total_added;
                
                if (results.result_total_added>Math.min(Math.max(Math.ceil(Basedamage),0),999)){
                    result_total_added_HTML = "<span style=\"color:#00ff00;\">"+result_total_added_HTML+"</span>";
                    }else if(results.result_total_added<Math.min(Basedamage,999)){
                    result_total_added_HTML = "<span style=\"color:#ff0000;\">"+result_total_added_HTML+"</span>";
                    }
            
                    const ADDEDTEXT = document.getElementById('resulttotalvalue');
                ADDEDTEXT.innerHTML = messages[currentLanguage].cardtext_totaldamage.replace("{0}", result_total_added_HTML);
                
                
                
                let multipliedY_fixed_HTML = results.result_multipliedY_fixed;
                let additonal_fixed_HTML = results.result_additonal_fixed;
                
                if (results.result_multipliedY_fixed>Math.max(Math.ceil(Y),0)){
                    multipliedY_fixed_HTML = "<span style=\"color:#00ff00;\">"+multipliedY_fixed_HTML+"</span>";
                    }else if(results.result_multipliedY_fixed<Math.min(Y,999)){
                    multipliedY_fixed_HTML = "<span style=\"color:#ff0000;\">"+multipliedY_fixed_HTML+"</span>";
                    }
                
                if (results.result_additonal_fixed>0){
                    additonal_fixed_HTML = "<span style=\"color:#00ff00;\">"+additonal_fixed_HTML+"</span>";
                    }
                
                
                const XYTEXT = document.getElementById('resultadditonal');
                
                if (Type=="cardtype_XY"){
                    XYTEXT.innerHTML = messages[currentLanguage].cardtext_eachXplusY.replace("{0}", multipliedY_fixed_HTML).replace("{1}", additonal_fixed_HTML);
                }
                
                 if ((Type=="cardtype_setup")||(Type=="cardtype_debug")){
                    
                     let setupHTML = "";
                     let setupAddTotalHTML = "";
                     let key = "cardtext_setup";
                     
                     if (Type=="cardtype_debug"){
                         key = "cardtext_debug";
                     }
                     
                     
                     
                     if ((X!=1)&&(X!=0)){
                         setupAddTotalHTML = messages[currentLanguage].cardtext_addtotal.replace("{0}", additonal_fixed_HTML)
                     }
                     
                    if (X!=1){
                        setupHTML = "×"+X;
                        
                    }
                    XYTEXT.innerHTML = messages[currentLanguage][key].replace("{0}", multipliedY_fixed_HTML).replace("{1}",setupHTML)+setupAddTotalHTML;
                }
                
                 
                if (Type=="cardtype_LustrousHeroicKing"){
                    
                    let setupHTML = "";
                    
                    if (Setup!=1){
                        setupHTML = "×"+Setup;
                    }
                    XYTEXT.innerHTML = messages[currentLanguage].cardtext_each5cardsplusY.replace("{0}", multipliedY_fixed_HTML).replace("{1}", additonal_fixed_HTML).replace("{3}",setupHTML);
                }
                
                 
                if (Type=="cardtype_RadiantMaestro"){
                    
                    let setupHTML = "";
                    
                    if (X!=1){
                        setupHTML = "×"+X;
                    }
                    XYTEXT.innerHTML = messages[currentLanguage].cardtext_eachDamagePlusplusY.replace("{0}", multipliedY_fixed_HTML).replace("{1}", additonal_fixed_HTML).replace("{3}",setupHTML);
                }
                
                if (Type=="cardtype_AbsolutePower"){
                    XYTEXT.innerHTML = messages[currentLanguage].cardtext_eachBoostplusY.replace("{1}", multipliedY_fixed_HTML).replace("{2}", additonal_fixed_HTML).replace("{0}", resultvaluehtml);
                }
                
            }
            
            
            
            if (results.result_total_added>=999){
            document.getElementById('glitchyourwaytovictory').innerHTML = messages[currentLanguage].catchphrase;}else{
                document.getElementById('glitchyourwaytovictory').innerHTML ="";}
            
            
            createTable(Basedamage,Boost,Damageplus,Multiplier,Type,X,Y); //計算した後、表の更新を行う
            
            
            //計算式用HTMLを作成
            
            let resultformulaaddHTML = [];
            resultformulaaddHTML[0] = "";
            resultformulaaddHTML[1] = "";
            resultformulaaddHTML[2] = "";
            resultformulaaddHTML[3] = "";
            resultformulaaddHTML[4] = "";
            resultformulaaddHTML[5] = "";
            resultformulaaddHTML[6] = "";
            resultformulaaddHTML[7] = "";
            resultformulaaddHTML[8] = "";
            
            let resulthtmlX = X;
            
            

            if (Type=="cardtype_LustrousHeroicKing"){
                
                if (Setup!=1){
                resultformulaaddHTML[8] = Setup+'&nbsp;*&nbsp;';
                }
            }
            
            if (Type=="cardtype_RadiantMaestro"){
                resulthtmlX = Damageplus;
                if (X!=1){
                resultformulaaddHTML[8] = X+'&nbsp;*&nbsp;';
                }
            }
            
            
            
            if (["cardtype_setup", "cardtype_debug","cardtype_XY","cardtype_LustrousHeroicKing","cardtype_RadiantMaestro", "cardtype_AbsolutePower"].includes(Type)) {
                resultformulaaddHTML[0] = '[';
                resultformulaaddHTML[1] = ']';
                resultformulaaddHTML[2] = '<span style="text-align:center;">+&nbsp'+resultformulaaddHTML[8]+resulthtmlX+'&nbsp;*&nbsp;['+Y+'&nbsp;*&nbsp(1&nbsp;+&nbsp;<img src="damage+.png">'+Damageplus+'&nbsp;*&nbsp;0.1&nbsp;*&nbsp;'+Multiplier+')]</span>';
                
                resultformulaaddHTML[3] = '[';
                resultformulaaddHTML[4] = ']';

                resultformulaaddHTML[5] = '&nbsp;+&nbsp;'+resultformulaaddHTML[8]+resulthtmlX+'&nbsp;*&nbsp;['+Y+'&nbsp;*&nbsp;'+results.result_multiplied+']</span>';
                
                
                if (String(results.result_multiplied).length>5){
                    resultformulaaddHTML[5] = '</span><span style="text-align:center;">'+resultformulaaddHTML[5]+'</span>';
                }
                
                
                resultformulaaddHTML[6] = '<span>=&nbsp;'+results.result_total_notadded+'&nbsp;+&nbsp;'+resultformulaaddHTML[8]+resulthtmlX+'&nbsp;*&nbsp;'+results.result_multipliedY_fixed+'</span>'
                resultformulaaddHTML[7] = '<span>=&nbsp;'+results.result_total_notadded+'&nbsp;+&nbsp;'+results.result_additonal_fixed;
                
            }
            
            if (Type=="cardtype_AbsolutePower"){
                Boost = 0;
            }
            
            //計算式の更新を行う
            let resultformulaHTML = "<span>&nbsp;&nbsp;"+resultformulaaddHTML[0]+"("+Basedamage+'&nbsp;+&nbsp;<img src="boost.png">'+Boost+'&nbsp;*&nbsp;'+Multiplier+')&nbsp;*&nbsp;(1&nbsp;+&nbsp;<img src="damage+.png">'+Damageplus+'&nbsp;*&nbsp;0.1&nbsp;*&nbsp;'+Multiplier+')'+resultformulaaddHTML[1]+'</span>'+resultformulaaddHTML[2];
            
            resultformulaHTML +="<span>=&nbsp;"+resultformulaaddHTML[3]+results.result_boosted+'&nbsp;*&nbsp;'+results.result_multiplied+resultformulaaddHTML[4]+resultformulaaddHTML[5];
            
            resultformulaHTML += resultformulaaddHTML[6];
            resultformulaHTML += resultformulaaddHTML[7];
            
            resultformulaHTML +="</span><span>=&nbsp;"+results.result+'</span>'
            
            
            
            document.getElementById('resultformula').innerHTML = resultformulaHTML;
            
        }
        
        function clearInput() {
            
            const Type = document.getElementById('cardtypeselect').value;
            
            
            document.getElementById('damage').value = "";
            document.getElementById('input_boost').value = "";
            document.getElementById('damagePlus').value = "";
            document.getElementById('acustominput').value = "";
            document.getElementById('input_X').value = "";
            document.getElementById('input_Y').value = "";
            document.getElementById('input_ADD').value = "";
            document.getElementById('input_Setup').value = 1;
            document.getElementById('a1').checked=true;
            
            if (Type=="cardtype_normal"){
                document.getElementById('a2').checked=true;
            }
            
            if (Type=="cardtype_LustrousHeroicKing"){
                document.getElementById('damage').value = 8;
                document.getElementById('input_Setup').value = 1;
                document.getElementById('input_ADD').value = 8;
            }
            
            if (Type=="cardtype_RadiantMaestro"){
                document.getElementById('damage').value = 5;
                document.getElementById('input_Setup').value=1;
                document.getElementById('input_ADD').value = 1;
            }
            
            if (Type=="cardtype_AbsolutePower"){
                document.getElementById('damage').value = 5;
                document.getElementById('input_ADD').value = 3;
            }
            
            calculate();
            
        }
        
        function toggleLanguage(selectedLanguage) {
            
            
            currentLanguage = selectedLanguage;
            
            Object.keys(messages[currentLanguage]).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    
                    const replacetext = messages[currentLanguage][key];
                    
                    //翻訳テキストに "<" が含まれるならHTMLごと変換
                    if(replacetext.includes("<")){
                        element.innerHTML = replacetext;
                    }else{
                    element.innerText = replacetext;
                    }
                }
            });
            
            Object.keys(buttons[currentLanguage]).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    
                    const replacetext = buttons[currentLanguage][key];
                    
                    if(replacetext.includes("<")){
                        element.innerHTML = replacetext;
                    }else{
                    element.innerText = replacetext;
                    }
                }
            });
            
            Object.keys(options[currentLanguage]).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    
                    const replacetext = options[currentLanguage][key];
                    
                    if(replacetext.includes("<")){
                        element.innerHTML = replacetext;
                    }else{
                    element.innerText = replacetext;
                    }
                }
            });
            
            /* 画像を使用し、差し替える場合、コメントアウトを解除
            Object.keys(images[currentLanguage]).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.src = images[currentLanguage][key];
                }
            });
            */
            calculate();
            calculateTargetdamage();
            
            
        }

// タブの切り替え
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";
}

// 最初のタブをデフォルトで開く
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tablinks").click();
    calculate();
        
    if(window.navigator.language!="ja"){
               toggleLanguage('en');
    }
    
    
    //表を生成
        createTable(29,0,0,2);
    

    const linkscontent = document.getElementsByClassName("links");

    linkscontent[0].style.display = "block";
    
    
});


function calculation(Basedamage,Boost,Damageplus,Multiplier,Type,X,Y,Breakdown) {
            
    
            if (Type == "cardtype_AbsolutePower"){
                //console.log(...[Basedamage,Boost,Damageplus,Multiplier,Type,X,Y])
            }
    
            //入力が不正なら0として扱う
            
            if (isNaN(Boost)) {
                Boost = 0;
            }
            
            if (isNaN(Damageplus)) {
                Damageplus = 0;
            }
            
            if (isNaN(Basedamage)) {
                Basedamage = 0;
            }

            if (isNaN(Multiplier)) {
                Multiplier = 1;
            }
    
            if (isNaN(X)) {
                X = 0;
            }
                    
            if (isNaN(Y)) {
                Y = 0;
            }
    
            let result_boosted = (Basedamage + Boost * Multiplier);
            
            //旧計算式
            //let result_multiplied = (10 + Damageplus * Multiplier)/10;
            //let result = (result_boosted * 10) * (result_multiplied * 10) / 100;
    
            let result_multiplied = (1 + 0.1* Damageplus * Multiplier);
            let result = (result_boosted) * (result_multiplied);
            
           
    
    
            let result_total = Math.max(Math.min(Math.ceil(result),999) , 0);
            let result_total_notadded = result_total;
            let result_additonal = null;       
            let result_multipliedY = null;
            let result_multipliedY_fixed = null;
            let result_additonal_fixed = null;
            let result_total_added = result_total;
            let result_titleformula = null;

    
             if (Type=="cardtype_XY") {
                 result_multipliedY = Y * (1 + 0.1* Damageplus * Multiplier);
                 result_multipliedY_fixed = Math.max(Math.min(Math.ceil(result_multipliedY),999) , 0);
                 result_additonal = X * result_multipliedY_fixed;
                 result_additonal_fixed = Math.max(Math.ceil(result_additonal), 0);
                 
                 result_total_added = Math.min(result_total+result_additonal_fixed,9999);
                

                     result = result_total_added;
            }
            
            if ((Type=="cardtype_setup")||(Type=="cardtype_debug")){
                result_multipliedY = Y * (1 + 0.1* Damageplus * Multiplier);
                result_multipliedY_fixed = Math.max(Math.min(Math.ceil(result_multipliedY),999) , 0);
                result_additonal = X * result_multipliedY_fixed;
                result_additonal_fixed = Math.max(Math.ceil(result_additonal), 0);
                 
                result_total_added = Math.min(result_total+result_additonal_fixed,9999);
                

                     result = result_total_added;
                 
            }
    
            if (Type=="cardtype_LustrousHeroicKing"){
                result_multipliedY = Y * (1 + 0.1* Damageplus * Multiplier);
                result_multipliedY_fixed = Math.max(Math.min(Math.ceil(result_multipliedY),999) , 0);
                result_additonal = X * result_multipliedY_fixed;
                result_additonal_fixed = Math.max(Math.ceil(result_additonal), 0);
                 
                result_total_added = Math.min(result_total+result_additonal_fixed,9999);
                

                     result = result_total_added;
                 
            }
    
            if (Type=="cardtype_RadiantMaestro"){
                result_multipliedY = Y * (1 + 0.1* Damageplus * Multiplier);
                result_multipliedY_fixed = Math.max(Math.min(Math.ceil(result_multipliedY),999) , 0);
                result_additonal = X * Damageplus * result_multipliedY_fixed;
                result_additonal_fixed = Math.max(Math.ceil(result_additonal), 0);
                 
                result_total_added = Math.min(result_total+result_additonal_fixed,9999);
                

                     result = result_total_added;
                 
            }
            
            if (Type=="cardtype_AbsolutePower"){
                
                //ブーストを失ってから、ダメージ計算
                
                result_boosted = (Basedamage);
                result = (result_boosted) * (result_multiplied);
                result_total = Math.max(Math.min(Math.ceil(result),999) , 0);
                result_total_notadded = result_total;
                
                result_multipliedY = Y * (1 + 0.1* Damageplus * Multiplier);
                result_multipliedY_fixed = Math.max(Math.min(Math.ceil(result_multipliedY),999) , 0);
                result_additonal = Boost * result_multipliedY_fixed;
                result_additonal_fixed = Math.max(Math.ceil(result_additonal), 0);
                 
                result_total_added = Math.min(result_total+result_additonal_fixed,9999);
                

                result = result_total_added;
                
                 
            }
        
            if (Breakdown){
                
                result_total_notadded = Math.min(result_total_notadded * 2 ,9999);
                result_total = Math.min(result_total * 2 ,9999);
                result = result_total
                result_total_added = Math.min(result_total_added * 2 ,9999);
                result_additonal_fixed = result_additonal_fixed * 2;
            }
    
    
            if (result_additonal_fixed){
                result_titleformula = String(result_total_notadded)+'&nbsp;+&nbsp;'+String(result_additonal_fixed);
            }
    
            
    
    
            let result_array = {
                result_boosted:result_boosted,
                result_multiplied:result_multiplied,
                result:result,
                result_total:result_total,
                result_total_added:result_total_added,
                result_additonal_fixed:result_additonal_fixed,
                result_multipliedY_fixed:result_multipliedY_fixed,
                result_total_notadded:result_total_notadded,        //アディショナルが足される前の最大999の整数値
                result_titleformula:result_titleformula             //アディショナル無し＋アディショナルの文字列
            }
            
            return result_array;
            
        }

function changeCardtype(type){
    //console.log("Changed card type to => "+type);
    
    let elementHideIds = [];
    let elementRevealIds = [];
    
    document.getElementById('a1').checked=true;
    
    if (type=="cardtype_normal"){
        document.getElementById('a2').checked=true;
    }
    
    
    if ((type == "cardtype_normal")||(type == "cardtype_totallyNormal")){
        
        elementHideIds = ["inputdivSetup","inputdivX", "inputdivY", "resultadditonal", "resulttotalvalue","inputdivADD"];
        elementRevealIds = ["cardtext_damage"];
    
        const resultElementDamagevalue = document.getElementById("normalresult");
        resultElementDamagevalue.classList.add("result_big");
        
    }
    if (type == "cardtype_XY"){
        
        elementHideIds = ["inputdivSetup","inputdivADD"];
        elementRevealIds = ["inputdivX", "inputdivY", "resultadditonal", "resulttotalvalue","cardtext_damage"];

        const resultElementDamagevalue = document.getElementById("normalresult");
        resultElementDamagevalue.classList.remove("result_big");
        
    }
    if (type == "cardtype_LustrousHeroicKing"){
        
        elementHideIds = ["inputdivY"];
        elementRevealIds = ["inputdivX","inputdivSetup", "resultadditonal", "resulttotalvalue","inputdivADD","cardtext_damage"];

        const resultElementDamagevalue = document.getElementById("normalresult");
        resultElementDamagevalue.classList.remove("result_big");
        
        const lavelElementSetup = document.getElementById("debug")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="setup";
            lavelElementSetup.innerText = messages[currentLanguage].setup;
        }
        
        document.getElementById('damage').value=8;
        document.getElementById('input_Setup').value=1;
        document.getElementById('input_ADD').value=8;
        
    }
    if (type == "cardtype_RadiantMaestro"){
        
        elementHideIds = ["inputdivX","inputdivY"];
        elementRevealIds = ["inputdivSetup", "resultadditonal", "resulttotalvalue","inputdivADD","cardtext_damage"];

        const resultElementDamagevalue = document.getElementById("normalresult");
        resultElementDamagevalue.classList.remove("result_big");
        
        const lavelElementSetup = document.getElementById("debug")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="setup";
            lavelElementSetup.innerText = messages[currentLanguage].setup;
        }
        
        document.getElementById('damage').value=5;
        document.getElementById('input_Setup').value=1;
        document.getElementById('input_ADD').value=1;
        
    }
    if (type == "cardtype_AbsolutePower"){
        
        elementHideIds = ["inputdivX","inputdivY","inputdivSetup","cardtext_damage"];
        elementRevealIds = ["resultadditonal", "resulttotalvalue","inputdivADD"];

        document.getElementById('damage').value=5;
        document.getElementById('input_ADD').value=3;
    }
    
    if (type == "cardtype_setup"){
        
        elementHideIds = ["inputdivX","inputdivY"];
        elementRevealIds = ["inputdivSetup", "resultadditonal", "resulttotalvalue","inputdivADD","cardtext_damage"];

        const resultElementDamagevalue = document.getElementById("normalresult");
        resultElementDamagevalue.classList.remove("result_big");
        
        const lavelElementSetup = document.getElementById("debug")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="setup";
            lavelElementSetup.innerText = messages[currentLanguage].setup;
        }
        
    }
    
    if (type == "cardtype_debug"){
        
        elementHideIds = ["inputdivX","inputdivY"];
        elementRevealIds = ["inputdivSetup", "resultadditonal", "resulttotalvalue","inputdivADD","cardtext_damage"];

        const resultElementDamagevalue = document.getElementById("normalresult");
        resultElementDamagevalue.classList.remove("result_big");
        
        const lavelElementSetup = document.getElementById("setup")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="debug";
            lavelElementSetup.innerText = messages[currentLanguage].debug;
        }
                
        
    }
    
    elementHideIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                    element.classList.add("default_hidden");
            }
                });
    
    elementRevealIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                    element.classList.remove("default_hidden");
            }
                });
    
    
    changePreset("Calculator",type)
    calculate();
    
}

function changePreset(Mode,Type){//Mode:Calculator,TargetDamage
    
    let PresetButton=[];
    let Modename = "";
    
    if (Mode=="TargetDamage"){
        Modename = "targetdamage_"
    }
    
    let Presetargument=[];
    let Presetname=[];
    
    //Argument of setPreset:(Basedamage,Boost,Damageplus,Multiplier,X,Y,Setup,ADD)
    
    
    if (Type=="cardtype_totallyNormal"){
        Presetargument[0]="(15,NaN,NaN,1)";
        Presetname[0]="Bruteforce_Girl";
        Presetargument[1]="(30,NaN,NaN,1)";
        Presetname[1]="Bruteforce_Girl_SP";
        Presetargument[2]="(28,NaN,NaN,1)";
        Presetname[2]="Great_White_Shark_Soulbeast";
    }
    
    if (Type=="cardtype_normal"){
        Presetargument[0]="(29,NaN,NaN,2)";
        Presetname[0]="Blade_of_Retribution";
        Presetargument[1]="(54,NaN,NaN,2)";
        Presetname[1]="Blade_of_Retribution_SP";
        Presetargument[2]="(18,NaN,NaN,2)";
        Presetname[2]="Demon_Hunter_the_Eldest";
        Presetargument[3]="(38,NaN,NaN,2)";
        Presetname[3]="Demon_Hunter_the_Eldest_SP";
    }
    
    
    if (Type=="cardtype_setup"){
        Presetargument[0]="(5,NaN,NaN,1,NaN,NaN,1,13)";
        Presetname[0]="Scions_of_Light";
        Presetargument[1]="(12,NaN,NaN,1,NaN,NaN,2,13)";
        Presetname[1]="Scions_of_Light_SP";
        Presetargument[2]="(5,NaN,NaN,1,NaN,NaN,1,15)";
        Presetname[2]="Martial_Florist";
        Presetargument[3]="(5,NaN,NaN,1,NaN,NaN,2,15)";
        Presetname[3]="Martial_Florist_SP";
    }
    
    if (Type=="cardtype_debug"){
        Presetargument[0]="(10,NaN,NaN,1,NaN,NaN,NaN,5)";
        Presetname[0]="Anti_demon_Submachinegun";
        Presetargument[1]="(20,NaN,NaN,1,NaN,NaN,NaN,10)";
        Presetname[1]="Anti_demon_Submachinegun_SP";
        Presetargument[2]="(5,NaN,NaN,1,NaN,NaN,1,13)";
        Presetname[2]="The_Undying";
        Presetargument[3]="(12,NaN,NaN,1,NaN,NaN,2,13)";
        Presetname[3]="The_Undying_SP";
    }
    
    if (Type=="cardtype_LustrousHeroicKing"){
        Presetargument[0]="(8,NaN,NaN,1,NaN,NaN,1,8)";
        Presetname[0]="Lustrous_Heroic_King";
        Presetargument[1]="(28,NaN,NaN,1,NaN,NaN,2,8)";
        Presetname[1]="Lustrous_Heroic_King_SP";
    }
    
    if (Type=="cardtype_RadiantMaestro"){
        Presetargument[0]="(5,NaN,NaN,1,NaN,NaN,1,1)";
        Presetname[0]="Radiant_Maestro";
        Presetargument[1]="(5,NaN,NaN,1,NaN,NaN,2,1)";
        Presetname[1]="Radiant_Maestro_SP";
    }
    
    if (Type=="cardtype_AbsolutePower"){
        Presetargument[0]="(5,NaN,NaN,1,NaN,NaN,NaN,3)";
        Presetname[0]="Absolute_Power";
        Presetargument[1]="(10,NaN,NaN,1,NaN,NaN,NaN,6)";
        Presetname[1]="Absolute_Power_SP";
    }
    
    if (Type=="cardtype_XY"){
        Presetargument[0]="(20,NaN,NaN,1,1,20,NaN)";
        Presetname[0]="Pale_Mist";
        Presetargument[1]="(30,NaN,NaN,1,1,30,NaN)";
        Presetname[1]="Pale_Mist_SP";
        Presetargument[2]="(16,NaN,NaN,1,NaN,3,NaN)";
        Presetname[2]="Voltaic_Chains";
        Presetargument[3]="(32,NaN,NaN,1,NaN,6,NaN)";
        Presetname[3]="Voltaic_Chains_SP";
    }
    
    
    for (let i = 0; i < 4; i++) {
        
        PresetButton[i] = document.getElementById(Modename+'Preset'+i); 
        
        
        if ((PresetButton[i]==undefined)||((Presetname[i])==undefined)||((Presetargument[i])==undefined)){
            
            PresetButton[i].innerHTML ='<button>&nbsp;</button>'
            continue;
        }
            
        
        PresetButton[i].innerHTML = '<button onclick="'+Modename+'setPreset'+Presetargument[i]+'" id="'+Modename+Presetname[i]+'">'+buttons[currentLanguage][Presetname[i]]+'</button>'
        
        
        
        }
    
    
    
    
    
}




window.onload = (event) => {
        };

        






