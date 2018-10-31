# intro-curriculum-3014
入門コースの3章14節の練習 (ISC License)

を、改造した。

# ブランチの関係
master→with-comments→extend

# 変更点
- HTMLページを新たに追加
- CSSファイルの作成
- 上記CSSファイルを読み込めるように、index.jsをアップデート
参考リンク: 
http://neos21.hatenablog.com/entry/2018/03/24/080000  
←'css' : 'stylesheet'だと動かなかった。'css' : 'css'とした。  
https://qiita.com/723ch/items/68ee87a64c9aeb60dd1b  

# アクセスURI
http://localhost:8000/  

# その他
デバッグに使ったconsole.logをそのまま残してあるため、コンソールに色々な変数が出力されるはず。たぶん残しておいたほうが後で嬉しいので残す。

# やりたかったけどできなかったこと
- フォーム送信時に、各項目が空欄か確認して空欄ならjavascriptのalertをだす
- アンケート入力結果を別のファイル(result.html)か何かに書き出して、index.jsではそれを参照するようにしたかった
