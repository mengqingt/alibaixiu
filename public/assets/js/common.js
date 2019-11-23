$('#logout').on('click',function(){
    var logConfirm =  confirm('你确认要退出吗');
    if(logConfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success : function(){
          location.href = 'login.html'
        },
        error : function(){
          alert('退出错误')
        }
        
      })
    }
})