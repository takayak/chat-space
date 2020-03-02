$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="Message">
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
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="Message">
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
   };
 }
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
});