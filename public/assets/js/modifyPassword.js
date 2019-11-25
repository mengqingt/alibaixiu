//修改密码
$('#modifyPassword').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success: function(){
           if( confirm('你确认要修改密码')){
               location.href = 'login.html'
           }
        }
    })
    return false;
})