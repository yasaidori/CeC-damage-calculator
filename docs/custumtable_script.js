let custumtable_resizewidth = 960;
let custumtable_resizeflag = false;

let custumtable_backup_BaseDamage = 0;
let custumtable_backup_BoostStart = 0;
let custumtable_backup_DamageStart = 0;
let custumtable_backup_A = 1;
let custumtable_backup_Type = "cardtype_normal";
let custumtable_backup_X = 1;
let custumtable_backup_Y = 0;

function createTable(BaseDamage, BoostStart , DamageStart, A,Type,X,Y) {
    
    custumtable_backup_BaseDamage = BaseDamage;
    custumtable_backup_BoostStart = BoostStart;
    custumtable_backup_DamageStart = DamageStart;
    custumtable_backup_A = A;
    custumtable_backup_Type = Type;
    custumtable_backup_X = X;
    custumtable_backup_Y = Y;
    
    
    BaseDamage = parseFloat(BaseDamage);
    DamageStart = parseFloat(DamageStart);
    BoostStart = parseFloat(BoostStart);
    
    let size = 10;
    
    let mediaQuery = window.matchMedia('(max-width: '+custumtable_resizewidth+'px)');
    
    
    
    if (mediaQuery.matches){
        size = 7;
    }
    
    
    if ((DamageStart >100 - size + 1)&&(DamageStart <100)&&(Number.isInteger(DamageStart))){
        DamageStart = 100 - size + 1;
    }
    if ((BoostStart >100 - size + 1)&&(BoostStart <100)&&(Number.isInteger(BoostStart))){
        BoostStart = 100 - size + 1;
    }
    
    
    A = parseFloat(A);
    
    
    
    
    
    
    
    let damageRange = Array.from({length: size}, (_, i) => i + DamageStart);
    let boostRange = Array.from({length: size}, (_, i) => i + BoostStart);
    
    if (DamageStart>0){
        damageRange.unshift(0);
        damageRange.pop();
    }
    if (BoostStart>0){
        boostRange.unshift(0);
        boostRange.pop();
    }
    
    
    const headerRow = document.getElementById('header-row');
    const tableBody = document.getElementById('table-body');
    
    // ヘッダーをクリア
    headerRow.innerHTML = '<th style="text-align: start;" id="top-left-cell" class="customtable_top-left-cell"></p></th>';
    tableBody.innerHTML = '';

    // ヘッダーにアイコンと値を追加
    damageRange.forEach(value => {
        const th = document.createElement('th');
        th.classList.add('customtable_header');
        const img = document.createElement('img');
        img.src = 'damage+.png';
        img.alt = 'damage+';
        img.className = 'icon';
        th.appendChild(img);
        th.appendChild(document.createTextNode(` ${value}`));
        headerRow.appendChild(th);
    });
    
    // テーブルの行を生成
    boostRange.forEach((value, row) => {
        const tr = document.createElement('tr');
        
        // 行の見出しにアイコンと値を追加
        const rowHeader = document.createElement('th');
        const img = document.createElement('img');
        rowHeader.classList.add('customtable_header');
        rowHeader.classList.add('customtable_boost');
        img.src = 'boost.png';
        img.alt = 'boost';
        img.className = 'icon';
        rowHeader.appendChild(img);
        rowHeader.appendChild(document.createTextNode(` ${value}`));
        tr.appendChild(rowHeader);
        
        for (let col = 0; col < damageRange.length; col++) {
            const td = document.createElement('td');
            td.classList.add('customtable_cellcolor');
            td.id = `cell${row}${col}`;
            const damageValue = damageRange[col];
            const boostValue = value;
            
            //別の関数で計算
            let results = calculation(BaseDamage,boostValue,damageValue,A,Type,X,Y);
            
            
            const result_cell = results.result;
            const result_cell2 = results.result_total_added;
            

            
            let resultHTML = `<a title="${result_cell}">${result_cell2}</a>`;
            
            if (results.result_additonal_fixed){
                
                resultHTML = `<a title="${results.result_titleformula}">${result_cell2}</a>`;
                
            }
            
            
            
            
            if (((damageValue >= 0 && damageValue <= 2 && boostValue >= 0 && boostValue <= 2)&&!(damageValue == 0 && boostValue == 0))&&(result_cell2<999)) {
                td.style.color = '#c0c0c0';
            }
            
            if (result_cell2>=999){
                //td.style.color = '#000000';
                td.classList.remove('customtable_cellcolor');
                td.style.opacity = '1';
            }
            
            if (result_cell2>999){
                //std.style.fontSize = '16px';
            }
            
            td.innerHTML = resultHTML;
            
            td.addEventListener('mouseover', () => highlightCells(row, col));
            td.addEventListener('mouseout', () => unhighlightCells(row, col));
            tr.appendChild(td);
        }
        
        tableBody.appendChild(tr);
    });
}

function updateCellValue(row, col, value) {
    const cellId = `cell${row}${col}`;
    const cellElement = document.getElementById(cellId);
    if (cellElement) {
        cellElement.innerText = value;
    }
}

function updateTopLeftCell(value) {
    const topLeftCell = document.getElementById('top-left-cell');
    topLeftCell.innerText = value;
}

function highlightCells(row, col) {
    const headerRow = document.getElementById('header-row').children;
    const tableBody = document.getElementById('table-body').children;

    // 列のヘッダーをハイライト
    headerRow[col + 1].classList.add('highlight');

    // 行と列のセルをハイライト
    for (let i = 0; i < tableBody.length; i++) {
        tableBody[i].children[col + 1].classList.add('highlight'); // 列のセルをハイライト
        tableBody[row].children[i + 1].classList.add('highlight'); // 行のセルをハイライト

        // 行のヘッダーをハイライト
        if (i === row) {
            tableBody[i].children[0].classList.add('highlight');
        }
    }
}

function unhighlightCells(row, col) {
    const headerRow = document.getElementById('header-row').children;
    const tableBody = document.getElementById('table-body').children;

    // 列のヘッダーのハイライトを解除
    headerRow[col + 1].classList.remove('highlight');

    // 行と列のセルのハイライトを解除
    for (let i = 0; i < tableBody.length; i++) {
        tableBody[i].children[col + 1].classList.remove('highlight'); // 列のセルのハイライトを解除
        tableBody[row].children[i + 1].classList.remove('highlight'); // 行のセルのハイライトを解除

        // 行のヘッダーのハイライトを解除
        if (i === row) {
            tableBody[i].children[0].classList.remove('highlight');
        }
    }
}

function updateTable(newX, newDamageStart, newBoostStart , newA) {
    X = newX;
    damageRange = Array.from({length: 10}, (_, i) => i + newDamageStart);
    boostRange = Array.from({length: 10}, (_, i) => i + newBoostStart);
    DamageStart = newDamageStart;
    BoostStart = newBoostStart;
    A = newA;
    createTable(X,DamageStart,BoostStart,A);
}

//画面横幅を監視し、一定値を超えたら表のセルの数を変更するため、表を作り直し

let WindowWidth = window.innerWidth

window.addEventListener('resize', () => {
  if (WindowWidth == window.innerWidth) return
    
    let mediaQuery = window.matchMedia('(max-width: '+custumtable_resizewidth+'px)');
    
  
  
    if ((mediaQuery.matches)&&(custumtable_resizeflag==false)){
        custumtable_resizeflag=true;
        
        createTable(custumtable_backup_BaseDamage, custumtable_backup_BoostStart , custumtable_backup_DamageStart, custumtable_backup_A,custumtable_backup_Type,custumtable_backup_X,custumtable_backup_Y)
        
        
        
        
  }
    
    if ((mediaQuery.matches==false)&&(custumtable_resizeflag)){
        custumtable_resizeflag=false;
        
        createTable(custumtable_backup_BaseDamage, custumtable_backup_BoostStart , custumtable_backup_DamageStart, custumtable_backup_A,custumtable_backup_Type,custumtable_backup_X,custumtable_backup_Y)
        
  }
  
  WindowWidth = window.innerWidth
  
    


})




