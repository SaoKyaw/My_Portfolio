// window.addEventListener("DOMContentLoaded",
//    function(){
//         if (typeof localStorage === "undefined"){
//             window.alert("このブラウザは Local Storage機能が実装されていません");
//             return;
//         }else{
//             saveLocalStorage();
//         }
//     }, false
// );

// function saveLocalStorage(){
//     const save = document.getElementById("save")
//     save.addEventListener("click", 
//         function (e){
//             e.preventDefault();
//             const key = document.getElementById("textKey").value;
//             const value = document.getElementById("textMemo").value;

//             if (key == "" || value == ""){
//                 window.alert("Key, Memo はいずれも必須です。");
//                 return;
//             } else{
//                 localStorage.setItem(key, value);
//                 let w_msg = "Local Storage に" + key + " " + value + "を保存しました。";
//                 window.alert(w_msg);
//                 document.getElementById("textKey").value = "";
//                 document.getElementById("textMemo").value = "";
//             }
//         } , false
//     );
// };

window.addEventListener("DOMContentLoaded",
    function(){
         if (typeof localStorage === "undefined"){
             window.alert("このブラウザは Local Storage機能が実装されていません");
             return;
         }else{
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            selectTable();
            allClearLocalStorage();
         }
     }, false
 );
 
 function saveLocalStorage(){
     const save = document.getElementById("save")
     save.addEventListener("click", 
         function (e){
             e.preventDefault();
             const key = document.getElementById("textKey").value;
             const value = document.getElementById("textMemo").value;
 
             if (key == "" || value == ""){
                Swal.fire({
                    title: "Memo app"
                    , html : "Key, Memo はいずれも必要だぞ。"
                    , type : "error"
                    , allowOutsideClick : false
                });
                let clickSound = new Audio("./sound/key_memo.wav");
                clickSound.play();
                 //window.alert("Key, Memo はいずれも必須です。");
                 return;
             } else{
                //let w_confirm = window.confirm("LocalStorage に\n「"+ key +" " + value +"」\nを保存しますか?")
                let w_msg = "LocalStorageに\n 「" + key + " " + value + "」\nを保存 (save) しますか？";

                Swal.fire({
                    title : "Memo app"
                    , html : w_msg
                    , type : "question"
                    , showCancelButton : true
                }).then(function(result){
                    if (result.value === true){
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しましただぞ。";
                        Swal.fire({
                            title : "Memo app"
                            , html : w_msg
                            , type : "success"
                            , allowOutsideClick : false
                            , 
                        });
                        // let clickSound = new Audio("./sound/save.mp3");
                        // clickSound.play();
                        let clickSound = new Audio("./sound/saved.wav");
                        clickSound.play();
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                })
            };
         } , false
     );
 };

 function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");

            if (w_cnt >= 1){
                let w_msg = "LocalStorage から選択されている"+ w_cnt +"件を削除 (delete) しますか?"

                Swal.fire({
                    title : "Memo app"
                    , html : w_msg
                    , type : "question"
                    , showCancelButton : true
                }).then(function(result){
                    if (result.value === true){
                        for(let i = 0; i < chkbox1.length; i++){
                            if(chkbox1[i].checked){
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();
                        let w_msg = "localStorage から"+ w_cnt + "件を削除 (delete) しました。";
                        Swal.fire({
                            title : "Memo app"
                            , html : w_msg
                            , type : "success"
                            , allowOutsideClick : false
                        });
                        let clickSound = new Audio("./sound/deleted.wav");
                        clickSound.play();
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });

            }
        }, false
    );

    //D
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) =>{
        if(e.target.classList.contains("trash") === true) {
                let index = e.target.parentNode.parentNode.rowIndex;
                const key = table1.rows[index].cells[1].firstChild.data;
                const value = table1.rows[index].cells[2].firstChild.data;

                let w_delete = "LocalStorageから\n 「" + key + " " + value + "」\nを削除しますか?";
                Swal.fire({
                    title : "Memo app",
                    html : w_delete,
                    type : "question",
                    showCancelButton : true
                }).then(result =>{
                    if(result.value === true){
                        localStorage.removeItem(key);
                        viewStorage();
                        let w_msg = "LocalStorageから\n 「" + key + " " + value + "」\nを削除しましただぞ！";
                        Swal.fire({
                            title : "Memo app",
                            html : w_msg,
                            type : "success",
                            allClearLocalStorage : false
                        });
                        let clickSound = new Audio("./sound/deleted.wav");
                        clickSound.play();
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                })
        }
    });
 };

 function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click", 
        function(e){
            e.preventDefault();
            let w_msg = "LocalStorage のデーターを全て削除(all clear) します。\nよろしいですか？"
            
            Swal.fire({
                title : "Memo app"
                , html : w_msg
                , type : "question"
                , showCancelButton : true
            }).then(function(result){
                if (result.value === true){
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorage のデーターを全て削除(all clear) しましただぞ。";
                    Swal.fire({
                        title : "Memo app"
                        , html : w_msg
                        , type : "success"
                        , allowOutsideClick : false
                    });
                    let clickSound = new Audio("./sound/deleted.wav");
                    clickSound.play();
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
            
        }, false
    );
 };


 function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
 };

 function selectCheckBox(mode){
    //let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = ""; 
    
    for(let i = 0; i < chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                // document.getElementById("textKey").value = table1.rows[i + 1].cells[1].firstChild.data;
                // document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
                //return w_sel="1";
            };
            w_cnt++;
        };
    };

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if(mode === "select"){
        if(w_cnt === 1){
            return w_cnt;
        }else{
            //window.alert("一つ選択 (select) してください。");
            Swal.fire({
                title: "Memo app"
                , html : "一つ選択 (select) してくださいだぞ"
                , type : "error"
                , allowOutsideClick : false
            });
            let clickSound = new Audio("./sound/select.wav");
            clickSound.play();
        };
    }
    
    if(mode === "del"){
        if(w_cnt >= 1){
            return w_cnt;
        }else{
            //window.alert("一つ以上選択 (select) してください。");
            Swal.fire({
                title: "Memo app"
                , html : "一つ以上選択 (select) してくださいだぞ。"
                , type : "error"
                , allowOutsideClick : false
            });
            let clickSound = new Audio("./sound/morethan1select.wav");
            clickSound.play();
        };
    }
    
 };
 
 function viewStorage(){
    const list = document.getElementById("list");

    while(list.rows[0]) list.deleteRow(0);

    for(let i = 0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name = 'chkbox1' type = 'checkBox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

    $("#table1").tablesorter({
        sortList:[[1, 0]]
    });

    $("#table1").trigger("update");

    //page 10
    const table2 = document.getElementById("table2");
    table2.addEventListener("click", (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
        if(e.target.classList.contains("trash") === true){
          let tr = e.target.parentNode.parentNode;
          tr.parentNode.deleteRow(tr.sectionRowIndex); // trのインデックスを取得して行を削除する
        }
    });

    
 }
 