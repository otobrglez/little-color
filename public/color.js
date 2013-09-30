/* By Oto Brglez - <otobrglez@gmail.com> */

var current_color = null;
var socket = null;

var set_color = function(color){
  if(color==current_color) return;
  return $("div#color").animate({backgroundColor: (current_color=color)});
};

var get_color = function(){
  return current_color;
};

var code = function(){
  return $("body").data("code");
};

var is_online = false;
var go_online = function(){
  if(is_online) return;
  $(".wait").fadeOut("slow");
  $(".wait").html("Connected.")
};

var go_offline = function(){
  is_online = false;
  $(".wait").fadeIn("slow");
  $(".wait").html("Disconnected.");
};

$(document).ready(function(){
  // fuz.si
  socket = io.connect('/');

  socket.on('connect',function(){
    // go_online();
  });

  socket.on('disconnect',function(){
    go_offline();
  });

  socket.on('code:'+code(), function(data){
    go_online()
    if(data.color){
      set_color(data.color);
    };
  });
});
