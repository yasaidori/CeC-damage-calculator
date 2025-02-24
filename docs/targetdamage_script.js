let calculationType = false;

function calculateTargetdamage() {

    
    let D = parseFloat(document.getElementById('targetdamage_input_basedamage').value);
    let tD = parseFloat(document.getElementById('targetdamage_input_targetdamage').value);
    let A = 1;
            
    
    
    let acustomflag  = document.querySelector('input[name="targetdamage_coeff"]:checked').id ==="targetdamage_targetdamage_acustom" ? true : false;
            
    if(acustomflag){
        A = parseFloat(document.getElementById('targetdamage_acustominput').value);

    }else{
        A = parseFloat(document.querySelector('input[name="targetdamage_coeff"]:checked').value);
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
    
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

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
                
                const calculatedDamage_raw = ((D + boost * A) * (10 + damagePlus * A) / 10)
                const calculatedDamage = Math.max(Math.min(Math.ceil(calculatedDamage_raw),999),0);
            
                

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
                        //cellResultDamage.textContent = calculatedDamage;
                        cellResultDamage.innerHTML = `<a title="${calculatedDamage_raw}">${calculatedDamage}</a>`;
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
                
                const calculatedDamage_raw = ((D + boost * A) * (10 + damagePlus * A) / 10)
                const calculatedDamage = Math.max(Math.min(Math.ceil(calculatedDamage_raw),999),0);
                
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
                        cellResultDamage.innerHTML = `<a title="${calculatedDamage_raw}">${calculatedDamage}</a>`;
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
            
            document.getElementById('targetdamage_input_basedamage').value = "";
            document.getElementById('targetdamage_acustominput').value = "";
            document.getElementById('targetdamage_input_targetdamage').value = "";
            document.getElementById('targetdamage_a2').checked=true;
            calculateTargetdamage();
            
        }

function targetdamage_setPreset(value) {
            document.getElementById('targetdamage_input_basedamage').value = value;
            calculateTargetdamage();
        }



function targetdamage_console(message){
    console.log(message);
}





calculateTargetdamage();