'use strict';

// 1行目に記載している 'use strict' は削除しないでください

// クリップボードから画像を貼り付ける
// 参照URL https://www.techiedelight.com/ja/paste-image-from-clipboard-using-javascript/

document.onpaste = function(event) {
  // 最初のアイテムを検討します(複数のアイテムに簡単に拡張できます)
  let item = event.clipboardData.items[0];

  if (item.type.indexOf("image") === 0) {
    let blob = item.getAsFile();

    let reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById("container").src = event.target.result;
    };
    reader.readAsDataURL(blob);
  }
};

let origin;
let xCoord;
let yCoord;
const container = document.getElementById("container");

container.addEventListener("click", function(event) {
  // クリックした点のHTML上の左上からの相対座標を取得
  let clickX = event.pageX;
  let clickY = event.pageY;

  // 画像データ(container)のleft, top, right, bottom, x, y, width, heightの各プロパティを取得
  const graphRect = container.getBoundingClientRect();

  // クリックしたX座標からグラフの左端の隙間を引く
  const xPosition = clickX - graphRect.left;
  // (HTMLの上端からグラフの下端)からクリックしたY座標を引く
  const yPosition = graphRect.bottom - clickY;

  //原点、X軸終点、Y軸終点の座標を取得
  if (!origin) { //原点が取得されていないときに実行される
    origin = { x: xPosition, y: yPosition };
    alert(`原点の座標：X=${origin.x}, Y=${origin.y} を取得しました。
    ※※画像貼り付け前にクリック、原点以外をクリックした場合はWebページをリロードし最初からやり直して下さい※※`);
  } else if (!xCoord) {  //原点は取得、X軸終点が取得されていないときに実行される
    xCoord = { x: xPosition, y: yPosition };
    alert(`X軸終点の座標：X=${xCoord.x}, Y=${xCoord.y} を取得しました。
    ※※X軸終点以外をクリックした場合はWebページをリロードし最初からやり直して下さい※※`);
  } else if (!yCoord) {  //原点、X軸終点は取得、Y軸終点が取得されていないときに実行される
    yCoord = { x: xPosition, y: yPosition };
    alert(`Y軸終点の座標：X=${yCoord.x}, Y=${yCoord.y} を取得しました。
    ※※Y軸終点以外をクリックした場合はWebページをリロードし最初からやり直して下さい※※`);
  } else {  //原点、X,Y軸が取得されたら座標を表示。
    // ユーザーにX軸の最大値、Y軸の最大値を入力してもらう。その値を取得する。
    const xAxisMax = document.getElementById("inputX");
    const yAxisMax = document.getElementById("inputY");
  
    // 1px当たりのグラフ上の数値を計算
    const xScale = xAxisMax.value / (xCoord.x - origin.x);
    const yScale = yAxisMax.value / (yCoord.y - origin.y);
  
    // グラフをクリックした座標を補正した値に変換
    const xValue = (xPosition - origin.x) * xScale;
    const yValue = (yCoord.y - clickY) * yScale;
  
    // 座標を表示
    const outPutCoordinatesX = document.getElementById('click-coordinatesX');
    outPutCoordinatesX.innerHTML += `${xValue.toFixed(0)}\n`;

    const outPutCoordinatesY = document.getElementById('click-coordinatesY');
    outPutCoordinatesY.innerHTML += `${yValue.toFixed(0)}\n`;

  //表示されたX軸の座標をコピーする。
    const getXCoord = document.getElementById("get-xcoord");
    getXCoord.addEventListener("click", () => {
    //クリップボードにコピー
      navigator.clipboard.writeText(outPutCoordinatesX.textContent);
    });

    const getYCoord = document.getElementById("get-ycoord");
    getYCoord.addEventListener("click", () => {
    //クリップボードにコピー
      navigator.clipboard.writeText(outPutCoordinatesY.textContent);
    });
  }
  
});
