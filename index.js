'use strict';
// HTTPモジュールの読み込み
const http = require('http');

// サーバーの作成
const server = http.createServer((req, res) => {
	// サーバーにリクエストがあった時に呼び出されるコールバック関数
	// アクセスログの出力
	const now = new Date();
	console.info('[' + now + '] Requested by ' + req.connection.remoteAddress); // req.cone...→リクエストが送られたIP情報
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8'
	});

	switch (req.method) {
		// reqオブジェクトHTTPメソッドreq.methodの文字列値に応じて条件分岐
		case 'GET':
			// form.htmlの内容を、レスポンスのコンテンツに返す
			const fs = require('fs');
			const rs = fs.createReadStream('./form.html');// ファイルの読み込み、Streamを作成
			rs.pipe(res);// 読み取り用Stream:rsデータを、書き込み用Stream:res(レスポンスオブジェクト)に渡す(=pipe関数によるパイプ)
			break;
			// ※ pipe関数を使った場合、 res.end(); しなくてよい
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
