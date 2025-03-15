let calculationType = false;

function calculateTargetdamage() {

    
    let Type = document.getElementById('targetdamage_cardtypeselect').value;
    
    let D = parseFloat(document.getElementById('targetdamage_input_basedamage').value);
    let tD = parseFloat(document.getElementById('targetdamage_input_targetdamage').value);
    let A = 1;
    
    let Setup = parseFloat(document.getElementById('targetdamage_input_Setup').value);
    
    if (isNaN(Setup)) {
                Setup = 0;
            }
            
    let Breakdown  = document.getElementById('targetdamage_breakdownbox').checked;
    
    
    
    let acustomflag  = document.querySelector('input[name="targetdamage_coeff"]:checked').id ==="targetdamage_targetdamage_acustom" ? true : false;
            
    if(acustomflag){
        A = parseFloat(document.getElementById('targetdamage_acustominput').value);

    }else{
        A = parseFloat(document.querySelector('input[name="targetdamage_coeff"]:checked').value);
        }
    
    let X = parseFloat(document.getElementById('targetdamage_input_X').value);
    let Y = parseFloat(document.getElementById('targetdamage_input_Y').value);
    
    
    
    
    if (Type=="cardtype_LustrousHeroicKing"){
        X = Setup * X;
        Y = parseFloat(document.getElementById('targetdamage_input_ADD').value);
    }
    
    if ((Type=="cardtype_RadiantMaestro")||(Type=="cardtype_setup")||(Type=="cardtype_debug")){
                X = Setup;
                Y = parseFloat(document.getElementById('targetdamage_input_ADD').value);
            }
            
            if (Type=="cardtype_AbsolutePower"){
                X = 1;
                Y = parseFloat(document.getElementById('targetdamage_input_ADD').value);
            }
            
    
    
    
    
    //入力が不正なら0として扱う
            
            
            if (isNaN(D)) {
                D = 0;
            }

            if (isNaN(tD)) {
                tD = 0;
            }
    
            if (isNaN(A)) {
                A = 1;
            }
    
            if (isNaN(X)) {
                X = 0;
            }
    
            if (isNaN(Y)) {
                Y = 0;
            }
    
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    //元のカードテキストを描写
    
    let basetext_basedamageHTML = messages[currentLanguage].cardtext_damage.replace("{0}",Math.ceil(Math.min(Math.max(D,0),999)));
    
    if (Type=="cardtype_AbsolutePower"){
        basetext_basedamageHTML = "";
    }
    
    document.getElementById('targetdamage_basetext_basedamage').innerText = basetext_basedamageHTML;

    
    if (A!=1){
                    document.getElementById('targetdamage_basetext_multipleeffect').innerText = messages[currentLanguage].cardtext_damageratio.replace("{0}", A);
                
                if (!acustomflag){
                    if (A==2){
                    document.getElementById('targetdamage_basetext_multipleeffect').innerText = messages[currentLanguage].cardtext_damageratio_2.replace("{0}", messages[currentLanguage].cardtext_2x);
                    }
                    if (A==4){
                    document.getElementById('targetdamage_basetext_multipleeffect').innerText = messages[currentLanguage].cardtext_damageratio_2.replace("{0}", messages[currentLanguage].cardtext_4x);
                    }
                }
                
            }else{
                document.getElementById('targetdamage_basetext_multipleeffect').innerText = "";
            }
    
    let additionalHTML = "";
    
    
    let basedamage_Y_fixed = Math.max(Math.min(Math.ceil(Y),999) , 0);
    let basedamage_additonal_fixed = Math.max(Math.ceil(X * basedamage_Y_fixed), 0);
    
    
    
    
    if ((Type=="cardtype_setup")||(Type=="cardtype_debug")){
                    
                     let setupHTML = "";
                     let setupAddTotalHTML = "";
                     let key = "cardtext_setup";
                     
                     if (Type=="cardtype_debug"){
                         key = "cardtext_debug";
                     }
                     
                     
                     
                     if ((X!=1)&&(X!=0)){
                         setupAddTotalHTML = messages[currentLanguage].cardtext_addtotal.replace("{0}", basedamage_additonal_fixed)
                     }
                     
                    if (X!=1){
                        setupHTML = "×"+X;
                        
                    }
                    additionalHTML = messages[currentLanguage][key].replace("{0}", basedamage_Y_fixed).replace("{1}",setupHTML)+setupAddTotalHTML;
                }
    
    if (Type=="cardtype_XY"){
                    additionalHTML = messages[currentLanguage].cardtext_eachXplusY.replace("{0}",basedamage_Y_fixed).replace("{1}",basedamage_additonal_fixed)
                }
    
    if (Type=="cardtype_LustrousHeroicKing"){
                    
                    let setupHTML = "";
                    
                    if (Setup!=1){
                        setupHTML = "×"+Setup;
                    }
                    additionalHTML = messages[currentLanguage].cardtext_each5cardsplusY.replace("{0}", basedamage_Y_fixed).replace("{3}",setupHTML).replace("{1}",basedamage_additonal_fixed);
                }
    
    
    if (Type=="cardtype_RadiantMaestro"){
                    
                    let setupHTML = "";
                    
                    if (X!=1){
                        setupHTML = "×"+X;
                    }
                    additionalHTML = messages[currentLanguage].targetdamage_cardtext_eachDamagePlusplusY.replace("{0}", basedamage_Y_fixed).replace("{3}",setupHTML);
                }
    
    if (Type=="cardtype_AbsolutePower"){
                    additionalHTML = messages[currentLanguage].targetdamage_cardtext_eachBoostplusY.replace("{1}", basedamage_Y_fixed).replace("{0}", Math.ceil(Math.min(Math.max(D,0),999)));
                }
    
    
    document.getElementById('targetdamage_basetext_additonal').innerHTML = additionalHTML;
    
    
    
    
    
    let previousDamagePlus = null;
    let previousBoost = null;
    let foundtD = 0 ;
    let col = 0 ;

    if (!(calculationType)) {
        const headerBoost = document.createElement('th');
        headerBoost.innerHTML = '<img src="boost.png">'+messages[currentLanguage].targetdamage_table_boost;
        headerRow.appendChild(headerBoost);

        const headerDamagePlus = document.createElement('th');
        headerDamagePlus.innerHTML = '<img src="damage+.png">'+messages[currentLanguage].targetdamage_table_damageplus;
        headerRow.appendChild(headerDamagePlus);

        const headerResultDamage = document.createElement('th');
        headerResultDamage.textContent = messages[currentLanguage].targetdamage_table_damage;
        headerRow.appendChild(headerResultDamage);

        table.appendChild(headerRow);

        for (let boost = 0; boost <= 99; boost++) {
            let damagePlusFound = false;
            for (let damagePlus = 0; damagePlus <= 99; damagePlus++) {
                
                
                //let results = calculation(D,boost,damagePlus,A);
                
                let results = calculation(D,boost,damagePlus,A,Type,X,Y,Breakdown);
                
                
                
                const calculatedDamage_raw = results.result;
                const calculatedDamage = results.result_total_added;

                if ((calculatedDamage >= tD) || (((damagePlus == 0) && (boost == 0)))|| (((damagePlus == 99) && (boost == 99)))) {
                    
                    
                    if (previousDamagePlus !== damagePlus) {
                        
                        if ((boost - 1 > previousBoost) && (foundtD>0)){
                        //スキップした際、スキップしたのがわかるように
                            
                            
                        const row = document.createElement('tr');

                        const cellBoost = document.createElement('td');
                        cellBoost.className += " targetdamage_skip";
                        cellBoost.innerHTML = '︙';
                        
                        row.appendChild(cellBoost);

                        const cellDamagePlus = document.createElement('td');
                        cellDamagePlus.className += " targetdamage_skip";
                        cellDamagePlus.innerHTML = '︙';
                        row.appendChild(cellDamagePlus);

                        const cellResultDamage = document.createElement('td');
                        cellResultDamage.className += " targetdamage_skip";
                        cellResultDamage.innerHTML = '︙';
                        row.appendChild(cellResultDamage);

                        table.appendChild(row);
                        col += 1;
                        
                            
                    }
                        
                        
                        const row = document.createElement('tr');
                        const currentcol = col;

                        const cellBoost = document.createElement('td');
                        cellBoost.innerHTML = '<img src="boost.png" > '+boost;
                        row.appendChild(cellBoost);

                        const cellDamagePlus = document.createElement('td');
                        cellDamagePlus.innerHTML = '<img src="damage+.png" > '+damagePlus;
                        row.appendChild(cellDamagePlus);

                        const cellResultDamage = document.createElement('td');
                        
                        if (results.result_additonal_fixed){        //追加ダメージがあるならタイトルを変更
                        cellResultDamage.innerHTML = `<a title="${results.result_titleformula}">${calculatedDamage}</a>`;
                            }else{
                                cellResultDamage.innerHTML = `<a title="${calculatedDamage_raw}">${calculatedDamage}</a>`;
                            }
                        
                        
                        row.appendChild(cellResultDamage);

                        table.appendChild(row);
                        previousDamagePlus = damagePlus;
                        previousBoost = boost;
                        
                        
                        
                        //ハイライトなど
                        const rowarray = [cellBoost , cellDamagePlus , cellResultDamage]
                        
                        for (const cellhighlight of rowarray) {
                            cellhighlight.addEventListener('mouseover', () => targetdamage_highlightCells(currentcol) );
                            cellhighlight.addEventListener('mouseout', () => targetdamage_unhighlightCells(currentcol));
                            
                            if (calculatedDamage < tD){
                                cellhighlight.style.color = '#a0a0a0';
                            }
                            
                            
                            
                            }
                        
                        
                        
                        col += 1;
                        
                        
                    }
                    
                    if (calculatedDamage >= tD){
                        foundtD += 1;
                        damagePlusFound = true;
                        break;
                        }
                    
                    
                }
            }
            if (!damagePlusFound) {
                previousDamagePlus = null;
                previousBoost = null;
                
            }
        }
    } else if (calculationType) {
        const headerDamagePlus = document.createElement('th');
        headerDamagePlus.innerHTML = '<img src="damage+.png">'+messages[currentLanguage].targetdamage_table_damageplus;
        headerRow.appendChild(headerDamagePlus);

        const headerBoost = document.createElement('th');
        headerBoost.innerHTML = '<img src="boost.png">'+messages[currentLanguage].targetdamage_table_boost;
        headerRow.appendChild(headerBoost);

        const headerResultDamage = document.createElement('th');
        headerResultDamage.textContent = messages[currentLanguage].targetdamage_table_damage;
        headerRow.appendChild(headerResultDamage);

        table.appendChild(headerRow);

        for (let damagePlus = 0; damagePlus <= 99; damagePlus++) {
            let boostFound = false;
            for (let boost = 0; boost <= 99; boost++) {
                
                let results = calculation(D,boost,damagePlus,A,Type,X,Y,Breakdown);
                const calculatedDamage_raw = results.result;
                const calculatedDamage = results.result_total_added;

                
                if ((calculatedDamage >= tD) || (((damagePlus == 0) && (boost == 0)))|| (((damagePlus == 99) && (boost == 99)))) {
                    if (previousBoost !== boost) {
                        
                        if ((damagePlus - 1 > previousDamagePlus) && (foundtD>0)){
                        //スキップした際、スキップしたのがわかるように
                            
                            
                        const row = document.createElement('tr');

                        const cellDamagePlus = document.createElement('td');
                        cellDamagePlus.className += " targetdamage_skip";
                        cellDamagePlus.innerHTML = '︙';
                        
                        row.appendChild(cellDamagePlus);

                        const cellBoost = document.createElement('td');
                        cellBoost.className += " targetdamage_skip";
                        cellBoost.innerHTML = '︙';
                        row.appendChild(cellBoost);

                        const cellResultDamage = document.createElement('td');
                        cellResultDamage.className += " targetdamage_skip";
                        cellResultDamage.innerHTML = '︙';
                        row.appendChild(cellResultDamage);

                        table.appendChild(row);
                        
                        col += 1;
                    }
                        
                        const row = document.createElement('tr');
                        const currentcol = col;
                        
                        
                        const cellDamagePlus = document.createElement('td');
                        cellDamagePlus.innerHTML = '<img src="damage+.png" > '+damagePlus;
                        row.appendChild(cellDamagePlus);

                        const cellBoost = document.createElement('td');
                        cellBoost.innerHTML = '<img src="boost.png" > '+boost;
                        row.appendChild(cellBoost);

                        const cellResultDamage = document.createElement('td');
                        
                        if (results.result_additonal_fixed){        //追加ダメージがあるならタイトルを変更
                        cellResultDamage.innerHTML = `<a title="${results.result_titleformula}">${calculatedDamage}</a>`;
                            }else{
                                cellResultDamage.innerHTML = `<a title="${calculatedDamage_raw}">${calculatedDamage}</a>`;
                            }
                        
                        
                        row.appendChild(cellResultDamage);

                        table.appendChild(row);
                        previousBoost = boost;
                        previousDamagePlus = damagePlus;
                        
                        //ハイライトなど
                        const rowarray = [cellBoost , cellDamagePlus , cellResultDamage]
                        
                        for (const cellhighlight of rowarray) {
                            cellhighlight.addEventListener('mouseover', () => targetdamage_highlightCells(currentcol) );
                            cellhighlight.addEventListener('mouseout', () => targetdamage_unhighlightCells(currentcol));
                            
                            if (calculatedDamage < tD){
                                cellhighlight.style.color = '#a0a0a0';
                            }
                            
                            
                            }
                        
                        col += 1;
                        
                    }
                    
                    if (calculatedDamage >= tD){
                        foundtD += 1;
                        boostFound = true;
                        }
                    break;
                }
            }
            if (!boostFound) {
                previousBoost = null;
                previousDamagePlus = null;
            }
        }
    }

    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = ''; // 前の結果をクリア
    resultTable.appendChild(table);
}


function changeTargetdamage() {
    calculationType = !calculationType;
    calculateTargetdamage();
}

function targetdamage_highlightCells(col) {

    const tableBody = document.getElementById('resultTable').children;

    // 行と列のセルをハイライト
    for (let i = 0; i < tableBody.length; i++) {
        tableBody[i].children[col + 1].classList.add('targetdamage_highlight'); // 列のセルをハイライト

    }
}

function targetdamage_unhighlightCells(col) {
    
    const tableBody = document.getElementById('resultTable').children;

    // 行と列のセルのハイライトを解除
    for (let i = 0; i < tableBody.length; i++) {
        
        tableBody[i].children[col + 1].classList.remove('targetdamage_highlight'); // 列のセルのハイライトを解除

        
    }
}

function targetdamage_clearInput() {
                        
            const Type = document.getElementById('targetdamage_cardtypeselect').value;
            
            
            document.getElementById('targetdamage_input_basedamage').value = "";
            document.getElementById('targetdamage_acustominput').value = "";
            document.getElementById('targetdamage_input_X').value = "";
            document.getElementById('targetdamage_input_Y').value = "";
            document.getElementById('targetdamage_input_ADD').value = "";
            document.getElementById('targetdamage_input_Setup').value = 1;
            document.getElementById('targetdamage_a1').checked=true;
            document.getElementById('targetdamage_breakdownbox').checked=false;
            document.getElementById('targetdamage_input_targetdamage').value = "";
            
            if (Type=="cardtype_normal"){
                document.getElementById('targetdamage_a2').checked=true;
            }
            
            if (Type=="cardtype_LustrousHeroicKing"){
                document.getElementById('targetdamage_input_basedamage').value = 8;
                document.getElementById('targetdamage_input_Setup').value = 1;
                document.getElementById('targetdamage_input_ADD').value = 8;
            }
    
    
            if (Type=="cardtype_RadiantMaestro"){
                document.getElementById('targetdamage_input_basedamage').value = 5;
                document.getElementById('targetdamage_input_Setup').value=1;
                document.getElementById('targetdamage_input_ADD').value = 1;
            }
            
            if (Type=="cardtype_AbsolutePower"){
                document.getElementById('targetdamage_input_basedamage').value = 5;
                document.getElementById('targetdamage_input_ADD').value = 3;
            }
            
            calculateTargetdamage();
    
    
    
    
    
        }

function targetdamage_setPreset(Basedamage,Boost,Damageplus,Multiplier,X,Y,Setup,ADD) {
            document.getElementById('targetdamage_input_basedamage').value = Basedamage;
            
            if (!isNaN(Multiplier)){
                
                switch (Multiplier) {
                    case 1:
                        document.getElementById('targetdamage_a1').checked = true;
                        break;
                    case 2:
                        document.getElementById('targetdamage_a2').checked = true;
                        break;
                    case 4:
                        document.getElementById('targetdamage_a4').checked = true;
                        break;
                    default:
                        document.getElementById('targetdamage_acustom').checked = true;
                        document.getElementById('targetdamage_acustominput').value = Multiplier;
                    }
                
            }
            
            !isNaN(X) && (document.getElementById('targetdamage_input_X').value = X);
            
            !isNaN(Y) && (document.getElementById('targetdamage_input_Y').value = Y);
            
            !isNaN(ADD) && (document.getElementById('targetdamage_input_ADD').value = ADD);
            
            
            !isNaN(Setup) && (document.getElementById('targetdamage_input_Setup').value = Setup);
            
            calculateTargetdamage();
        }



function targetdamage_console(message){
    console.log(message);
}


function targetdamage_changeCardtype(type){
    console.log("Changed card type to => "+type);
    
    let elementHideIds = [];
    let elementRevealIds = [];
    
    document.getElementById('targetdamage_a1').checked=true;
    
    if (type=="cardtype_normal"){
        document.getElementById('targetdamage_a2').checked=true;
    }
    
    
    if ((type == "cardtype_normal")||(type == "cardtype_totallyNormal")){
        
        elementHideIds = ["targetdamage_inputdivSetup","targetdamage_inputdivX", "targetdamage_inputdivY", "targetdamage_inputdivADD"];
        
    }
    if (type == "cardtype_XY"){
        
        elementHideIds = ["targetdamage_inputdivSetup","targetdamage_inputdivADD"];
        elementRevealIds = ["targetdamage_inputdivX", "targetdamage_inputdivY"];

    }
    
    if (type == "cardtype_LustrousHeroicKing"){
        
        elementHideIds = ["targetdamage_inputdivY"];
        elementRevealIds = ["targetdamage_inputdivX","targetdamage_inputdivSetup","targetdamage_inputdivADD"];

        
        
        const lavelElementSetup = document.getElementById("targetdamage_debug")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="targetdamage_setup";
            lavelElementSetup.innerText = messages[currentLanguage].setup;
        }
        
        document.getElementById('targetdamage_input_basedamage').value=8;
        document.getElementById('targetdamage_input_Setup').value=1;
        document.getElementById('targetdamage_input_ADD').value=8;
        
    }
    
    if (type == "cardtype_RadiantMaestro"){
        
        elementHideIds = ["targetdamage_inputdivX","targetdamage_inputdivY"];
        elementRevealIds = ["targetdamage_inputdivSetup","targetdamage_inputdivADD"];

        
        const lavelElementSetup = document.getElementById("targetdamage_debug")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="targetdamage_setup";
            lavelElementSetup.innerText = messages[currentLanguage].setup;
        }
        
        document.getElementById('targetdamage_input_basedamage').value="5";
        document.getElementById('targetdamage_input_Setup').value=1;
        document.getElementById('targetdamage_input_ADD').value=1;
        
    }
    if (type == "cardtype_AbsolutePower"){
        
        elementHideIds = ["targetdamage_inputdivX","targetdamage_inputdivY","targetdamage_inputdivSetup"];
        elementRevealIds = ["targetdamage_inputdivADD"];

        document.getElementById('targetdamage_input_basedamage').value=5;
        document.getElementById('targetdamage_input_ADD').value=3;
    }
    
    if (type == "cardtype_setup"){
        
        elementHideIds = ["targetdamage_inputdivX","targetdamage_inputdivY"];
        elementRevealIds = ["targetdamage_inputdivSetup","targetdamage_inputdivADD"];

        
        const lavelElementSetup = document.getElementById("targetdamage_debug")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="targetdamage_setup";
            lavelElementSetup.innerText = messages[currentLanguage].setup;
        }
        
    }
    
    if (type == "cardtype_debug"){
        
        elementHideIds = ["targetdamage_inputdivX","targetdamage_inputdivY"];
        elementRevealIds = ["targetdamage_inputdivSetup","targetdamage_inputdivADD"];

        
        const lavelElementSetup = document.getElementById("targetdamage_setup")
        
        if(lavelElementSetup!=undefined){
            lavelElementSetup.id ="targetdamage_debug";
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
    
    
    changePreset("TargetDamage",type)
    calculateTargetdamage();
}


calculateTargetdamage();