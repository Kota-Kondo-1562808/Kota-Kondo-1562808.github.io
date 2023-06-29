'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//クリップボードから画像を貼り付ける
//参照URL https://www.techiedelight.com/ja/paste-image-from-clipboard-using-javascript/

window.alert("最初にグラフ画像を張り付けてください ※グラフの軸のギリギリをコピーして貼り付けて下さい。");
document.onpaste = function(event) {
  //最初のアイテムを検討します(複数のアイテムに簡単に拡張できます)
  let item = event.clipboardData.items[0];

  if (item.type.indexOf("image") === 0) {
      let blob = item.getAsFile();

      let reader = new FileReader();
      reader.onload = function(event) {
          document.getElementById("container").src = event.target.result;
        };    
        reader.readAsDataURL(blob);
  }
}

// const img = document.getElementById("container");
// function imgLoad() {
//   prompt("X軸の最大値を入力して下さい");
//   // prompt("Y軸の最大値を入力して下さい");
// }





//一つの処理を実行するごとに次やる内容をアラートする。


//画像データの原点、X軸終点、Y軸終点をクリックすることで絶対座標を取得する。
//絶対座標はHTMLの左上が原点　やっかい　3回実施（原点、X軸、Y軸）
// const origin = document.body.addEventListener("click", function(event) {
// 	let x = event.pageX;
// 	let y = event.pageY;
// });

// const xCood = document.body.addEventListener("click", function(event) {
// 	let x = event.pageX;
// 	let y = event.pageY;
// });

// const yCood = document.body.addEventListener("click", function(event) {
// 	let x = event.pageX;
// 	let y = event.pageY;
// });

let origin;
let xCoord;
let yCoord;

document.getElementById("container").addEventListener("click", function(event) {
	let x = event.pageX;
	let y = event.pageY;
  
  if (!origin) {
    origin = {x, y};
    alert(`原点の座標：X=${origin.x}, Y=${origin.y} を取得しました。
    ※※画像貼り付け前にクリック、原点以外をクリックした場合はWebページをリロードし最初からやり直して下さい※※`);
  } else if (!xCoord) {
    xCoord = {x, y};
    alert(`X軸終点の座標：X=${xCoord.x}, Y=${xCoord.y} を取得しました。
    ※※X軸終点以外をクリックした場合はWebページをリロードし最初からやり直して下さい※※`);
  } else if (!yCoord) {
    yCoord = {x, y};
    alert(`Y軸終点の座標：X=${yCoord.x}, Y=${yCoord.y} を取得しました。
    ※※Y軸終点以外をクリックした場合はWebページをリロードし最初からやり直して下さい※※`);
  }
});

const xAxisMaxValue = document.getElementById("inputX");
const yAxisMaxValue = document.getElementById("inputY");




//html グラフのｘ軸の最大値を入力するinput
//html グラフのY軸の最大値を入力するinput作成
//ユーザーが入力した最大値を取得する

//ユーザーが入力した値と絶対座標の関係から1pxはどれだけの値になるか計算する関数を作成


//上の関数を使って画像をクリックするとクリックした箇所のxy座標を取得する。


//取得したxy座標は下の方に表示される。

// ① ユーザーが画像を貼り付ける
// ② 画像データ（グラフ波形）の原点、X軸最大値、Y軸最大値をクリックし、その位置データを取得
// ③ ユーザーにX軸の最大値、Y軸の最大値を入力してもらう
// ④ ②と③から取得したデータから1px当たりのグラフ上の数値を計算する。
// ⑤ ユーザーがグラフをクリックするとクリックした座標がHTML上に出力される。（このときの座標は④で補正された値）　
