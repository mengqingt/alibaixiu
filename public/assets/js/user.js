//用户添加
$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
  $.ajax({
      type:'post',
      url:'/users',
      data: formData,
      success : function(){
          location.reload();
      },
      error : function(){
          alert('错误')
      }
  })
   
    return false
})
//上传头像
$('.row').on('change','#avatar',function(){
   var   formData = new FormData();
   // console.log(this.files[0]);
     formData.append('avatar',this.files[0]);
   $.ajax({
       type:'post',
       url:'/upload',
       data: formData,
       //不需要解析参数
       processData:false,
       contentType:false,
       success :function(response){
        console.log(response);
      //  $(this).siblings('img').attr('src',response[0].avatar)
      $('#userimg').attr('src',response[0].avatar);
      $('#hiddenAvatar').val(response[0].avatar)
       },
       error : function(err){
           console.log(err);
       }
   })
})
//添加用户列表
$.ajax({
    type:'get',
    url:'/users',
    success : function(response){
       var html = template('userTpl',{data : response});
       // console.log(html);
       $('tbody').html(html)
    }
})
//编辑用户
//因为动态创建要用事件委托,显示要修改的内容到表单上
$('#multipleUser').on('click','#edit',function(){
   var id = $(this).attr('data-id');
   $.ajax({
       type:'get',
       url:'/users/' + id,
       success : function (response) {
       
          // console.log(response);
          let html = template('modifyTpl',{resut : response}) 
       
             $('#modifyBox').html(html)
       }
   })
   
})
//点击修改按钮，修改用户的信息
$('#modifyBox').on('submit','#modifyForm',function(){
  var   formData = $(this).serialize();
  var   id = $(this).attr('data-id');
  //console.log(formData);
  
  $.ajax({
      type:'put',
      url:'/users/' + id,
      data:formData,
      success : function(){
          location.reload();
      }
  })
    //阻止默认提交
    return false
})
