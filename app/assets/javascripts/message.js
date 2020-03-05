$(function(){ 

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.Message:last').data("message-id");
  
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.main_chat-middle').append(insertHTML);
      $('.main_chat-middle').animate({ scrollTop: $('.main_chat-middle')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };

  function buildHTML(message){
   if ( message.content && message.image ) {
     var html =
      `<div class="Message" data-message-id=${message.id} >
         <div class="message-name">
           <div class="left">
             ${message.user_name}
           </div>
           <div class="right">
             ${message.created_at}
           </div>
         </div>
         <div class="message-content">
           <p class="message-content">
             ${message.content}
           </p>
         </div>
         <div class="chat-image">
         <img src=${message.image} class="chat-image">
         </div>
       </div>`
   } else if(message.content) {
    var html =
     `<div class="Message" data-message-id = ${message.id}>
         <div class="message-name">
           <div class="left">
             ${message.user_name}
           </div>
           <div class="right">
             ${message.created_at}
           </div>
         </div>
         <div class="message-content">
           <p class="message-content">
             ${message.content}
           </p>
        </div>
      </div>`
    return html;
  } else if (message.image){
     var html =
      `<div class="Message" data-message-id =${message.id}>
          <div class="message-name">
            <div class="left">
              ${message.user_name}
            </div>
            <div class="right">
              ${message.created_at}
            </div>
          </div>
          <div class="message-content">
            <div class="chat-image">
              <img src=${message.image} class="chat-image">
            </div>
          </div>
       </div>`
      };
      return html;
   };
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main_chat-middle').append(html);  
    $('form')[0].reset();
    $('.main_chat-middle').animate({ scrollTop: $('.main_chat-middle')[0].scrollHeight});  
    $('.send-button').prop("disabled", false);  
  })
})
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});