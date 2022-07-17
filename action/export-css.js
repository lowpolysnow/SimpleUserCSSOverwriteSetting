/**
 * CSS定義のみ取り出し
 * 
 * ## インストール＆実行方法
 * ```shell
 * $ npm i comment-json
 * $ npm i fs
 * $ node action/export-css.js
 * ```
 */
const fs = require('fs');
const jsonparse = require('comment-json');

let targetList = [
  'jira'
 ,'confluence'
 ,'Microsoft docs,code'
 ,'slide share'
];
let setting = jsonparse.parse(fs.readFileSync('setting.json').toString());
 
setting.filter((curEl)=>{ //ターゲットのJSON定義のみCSS出力
  targetList.forEach((key) => {
    if(curEl.name == key){
      if(!fs.existsSync('./destcss')){  //writeFileSync()では自動でディレクトリを作ってくれないので、ここで生成する
        fs.mkdirSync('./destcss');
      }
      fs.writeFileSync('./destcss/'+curEl.name+'.css', curEl.css);
    }
  });
});
