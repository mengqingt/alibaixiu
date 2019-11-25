// import { set } from "mongoose";

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
//点击删除删除用户
$('#multipleUser').on('click','#delete',function(){
   let id = $(this).siblings('#edit').attr('data-id');
   //alert(id)
   $.ajax({
    type:'delete',
    url:'/users/' + id,
    success : function (response) {
      //  console.log(response);
    let confirmDelete =  confirm('确定要删除吗')
        if(confirmDelete){
            location.reload();
        }
   
    }
})
})
//批量删除
$('#selectAll').on('change',function(){
//全选
 var status = $(this).prop('checked');
 if(status){
    $('.deleteMany').show();
 }
 else{
    $('.deleteMany').css('display','none')
 }
 //console.log(status);
 $('#multipleUser').find('.checkbox').prop('checked',status);
})
$('#multipleUser').on('change','.checkbox',function(){
    var inputs = $('#multipleUser').find('.checkbox');
    if(inputs.length == inputs.filter(':checked').length ){
        $('#selectAll').prop('checked',true)
    }
    else{
        $('#selectAll').prop('checked',false)
    }
    if(inputs.filter(':checked').length>0){
        $('.deleteMany').show();
    }
    else{
        $('.deleteMany').css('display','none')
    }
})
$('.deleteMany').on('click',function(){
    var  arr=[];
    var arr1 = $('#multipleUser').find('.checkbox').filter(':checked');
     arr1.each(function(index,element){
         arr.push($(element).attr('data-id'))
     });
  //  console.log(arr);
    if(confirm('你确认要删除吗')){
       // alert('ok')
       $.ajax({
        type:'delete',
        url:'/users/' + arr.join('-'),
        success : function(response){
           // console.log(response);
           location.reload();
        }
      })
   }

})