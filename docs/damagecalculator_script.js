
        
        let currentLanguage = 'jp';
        
        window.onload = (event) => {
           if(window.navigator.language!="ja"){
               toggleLanguage('en');
           }
        };

        
        
        function setPreset(value) {
            document.getElementById('damage').value = value;
            calculate();
        }

        function calculate() {
            let D = parseFloat(document.getElementById('damage').value);
            let X = parseFloat(document.getElementById('input_boost').value);
            let Y = parseFloat(document.getElementById('damagePlus').value);
            let A = 1;
            
            let acustomflag  = document.querySelector('input[name="coeff"]:checked').id ==="acustom" ? true : false;
            
            if(acustomflag){
                A = parseFloat(document.getElementById('acustominput').value);
            }else{
              A = parseFloat(document.querySelector('input[name="coeff"]:checked').value);
            }
            
            
            
            //入力が不正なら0として扱う
            
            if (isNaN(X)) {
                X = 0;
            }
            
            if (isNaN(Y)) {
                Y = 0;
            }
            
            if (isNaN(D)) {
                D = 0;
            }

            if (isNaN(A)) {
                A = 1;
            }
            
            let AX = A;
            let AY = A;
            
            let result2 = ((D + X * AX) * (10 + Y * AY)/10);
            let result2_boosted = (D + X * AX);
            let result2_multiplied = (10 + Y * AY)/10;
            let result = Math.max(Math.min(Math.ceil(result2),999) , 0);
            
            let resulthtml = result + (currentLanguage === 'jp' ? "" : "&nbsp;");

           
            
            
            if (result>Math.max(Math.ceil(D),0)){
            resulthtml = "<span style=\"color:#00ff00;\">"+resulthtml+"</span>";
            }else if(result<Math.min(D,999)){
            resulthtml = "<span style=\"color:#ff0000;\">"+resulthtml+"</span>";
            }
            
            document.getElementById('result').innerHTML = resulthtml;
            
            
            document.getElementById('result_D').innerText = D;
            document.getElementById('result_X').innerText = X;
            document.getElementById('result_AX').innerText = AX;
            document.getElementById('result_AY').innerText = AY;
            document.getElementById('result_Y').innerText = Y;
            document.getElementById('result2_boosted').innerText = result2_boosted;
            document.getElementById('result2_multiplied').innerText = result2_multiplied;
            document.getElementById('result2').innerText = result2;
            
            
            
            if (A!=1){
                    document.getElementById('multiple').innerText = messages[currentLanguage].cardtext_damageratio.replace("{0}", A);
                
                if (!acustomflag){
                    if (A==2){
                    document.getElementById('multiple').innerText = messages[currentLanguage].cardtext_damageratio_2.replace("{0}", messages[currentLanguage].cardtext_2x);
                    }
                    if (A==4){
                    document.getElementById('multiple').innerText = messages[currentLanguage].cardtext_damageratio_2.replace("{0}", messages[currentLanguage].cardtext_4x);
                    }
                }
                
            }else{
                document.getElementById('multiple').innerText = "";
            }
            
            if (result>=999){
            document.getElementById('glitchyourwaytovictory').innerHTML = messages[currentLanguage].catchphrase;}else{
                document.getElementById('glitchyourwaytovictory').innerHTML ="";}
            
            
            createTable(D,Y,X,A); //計算した後、表の更新を行う
            
            
            
        }
        
        function clearInput() {
            
            document.getElementById('damage').value = "";
            document.getElementById('input_boost').value = "";
            document.getElementById('damagePlus').value = "";
            document.getElementById('acustominput').value = "";
            //document.querySelector('input[name="coeff"]:checked').checked=false;
            document.getElementById('a2').checked=true;
            calculate();
            
        }
        
        function toggleLanguage(selectedLanguage) {
            
            currentLanguage = selectedLanguage;
            
            Object.keys(messages[currentLanguage]).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.innerText = messages[currentLanguage][key];
                }
            });
            
            Object.keys(buttons[currentLanguage]).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.innerText = buttons[currentLanguage][key];
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
            
            
        }
        calculate();
        // 表を生成
        createTable(29,0,0,2);
