# intro-curriculum-3014
入門コースの3章14節の練習 (ISC License)

を、大幅に改造した。

# 変更点
- HTMLページを新たに追加
- CSSファイルの作成
- 上記CSSファイルを読み込めるように、index.jsをアップデート
ここが一番つらかった…！以下参考リンク。
http://neos21.hatenablog.com/entry/2018/03/24/080000  
←'css' : 'stylesheet'だと動かないので注意。'css' : 'css'とすること。  
https://qiita.com/723ch/items/68ee87a64c9aeb60dd1b  

# ？
http://localhost:8000/  
へ行くとアクセスできる。

# できなかったこと
- フォーム送信時に、各項目が空欄か確認して空欄ならjavascriptのalertをだす
- アンケート入力結果を別のファイル(result.html)か何かに書き出して、index.jsではそれを参照するようにしたかった

# その他
コンソールに途中の色々な変数が出力されてるのはデバッグのをそのまま残してあるから。たぶん残しておいたほうが後で嬉しい。
