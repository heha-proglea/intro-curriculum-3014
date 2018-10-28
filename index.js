'use strict';
// 各種モジュールの読み込み
const http = require('http');
const fs = require('fs');

// サーバーの作成
const server = http.createServer((req, res) => {
	// サーバーにリクエストがあった時に呼び出されるコールバック関数
	// アクセスログの出力
	const now = new Date();
	console.info('[' + now + '] Requested by ' + req.connection.remoteAddress); // req.cone...→リクエストが送られたIP情報

	let url = req.url; //リクエストからURLを取得
	console.log('url -> ' + url);
	// 「/」に対するリクエストには index.html を返す
	if(url === '/') {
	// url = '/index.html';
	url = '/form.html';
	}
	const fileNameArray = url.split('.'); //splitで . で区切られた配列にする 
	const ext = fileNameArray[fileNameArray.length - 1]; //tmp配列の最後の要素(外部ファイルの拡張子)を取得
	console.log('ext -> ' + ext);
	
	// 拡張子をキーにContent-Typeを得るための連想配列を定義しておく
	const extToType = {
		'html': 'html',
		'js'  : 'javascript',
		'css' : 'css'
	};
	console.log('extToType[ext] -> ' + extToType[ext]);

	// Content-Typeが分かればそれに、分からなければプレーンテキストとして返す
	const type = extToType[ext] || 'plain';
	console.log('type -> ' + type);
	console.log('content-type -> ' + `text/${type}; charset=utf-8` );
	// HTTP200として返答する
	res.writeHead(200, {
		'Content-Type': `text/${type}; charset=utf-8` // 変数展開を用いてContent-Typeを指定
	});

	switch (req.method) {
		// reqオブジェクトHTTPメソッドreq.methodの文字列値に応じて条件分岐
		case 'GET':
			// urlで指定されたファイルの内容を、レスポンスのコンテンツに返す

			// const rs = fs.createReadStream(`.${url}`);// ファイルの読み込み、Streamを作成
			// rs.pipe(res);// 読み取り用Stream:rsデータを、書き込み用Stream:res(レスポンスオブジェクト)に渡す(=pipe関数によるパイプ)
			// break;
			// // ※ pipe関数を使った場合、 res.end(); しなくてよい


			console.log('url now -> ' + `.${url}`);
			fs.readFile(`.${url}`, 'utf-8', (error, filedata) => {
				if (error) {
					console.log('404 Error');
					res.weiteHead(404);
				} else {
					// console.log(filedata);
					res.write(filedata); // 読み込んだファイルデータの書き出し
					res.end(); // ←Node.jsは非同期的なので、res.end()する場所に注意すること！
					res.end(filedata); // 上記2行の代わりに、こちらでもファイルデータの書き出しができる。行われている処理は同じである(by公式ドキュメント)
				}
			})
			break;
		case 'POST':
			// 追加で送られてくるデータに対する処理
			let body = [];
			// リクエストオブジェクトreqの発行するイベントを補足する
			req.on('data', (chunk) => { // 変数chunkには細切れなデータが入る
				// dataイベント発生時(=データを受け取った時)に行う処理
				body.push(chunk); // 受け取ったデータchunkを、配列bodyに追加していく
			}).on('end', () => {
				 // endイベント発生時(=データを全て受信し終わった時)に行う処理
				body = Buffer.concat(body).toString(); // 配列bodyを全てくっつけて、文字列に変換する
				const decoded = decodeURIComponent(body); // decodeURIComponent関数で、URLエンコードされた値→元の文字列 に変換
				console.info('[' + now + '] 投稿: ' + decoded); // 送られてきたデータをログとして残す
				res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
					  decoded + 'が投稿されました</h1></body></html>'); // 送られてきたデータ(投稿内容)を、HTMLの見出しとして表示する
				res.end();
			});
			break;
		default:
			break;
	}

}).on('error', (e) => { // httpサーバーの発行するエラーイベントを補足する(=ハンドリングを行う、という)
	// errorイベント発生時に呼び出されるコールバック関数
	console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
	// clientErrorイベント発生時に呼び出されるコールバック関数
	console.error('[' + new Date() + '] Client Error', e);
});

// httpの起動ポートを宣言し、サーバーを起動
const port = 8000;
server.listen(port, () => {
	// サーバーを起動時に実行されるコールバック関数
	console.info('[' + new Date() + '] Listening on ' + port);
});
