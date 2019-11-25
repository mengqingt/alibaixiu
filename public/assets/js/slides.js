

//添加轮播图片
// $.ajax({
//     type:'post',
//     url:'/slides',
//     data:{
//         image:'\\uploads\\upload_2f6f709e9596a187b8babce3aa2c1c3d.jpg',
//         title:'测试图片',
//            link:'javascript:;'
//     }
// })
//获取轮播列表
$.ajax({
    type:'get',
    url:'/slides',
    success: function(response){
     //  console.log(response);
      let html = template('slidesTel',{
          data:response
      })
     $("#tbody").html(html);
    }
})
//上传文件
$('#image').on('change',function(){
    let file = this.files[0];
    var formData = new FormData();
    formData.append('image',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
               //  console.log(response);
             $('#hideenFile').val(response[0].image)  
        }
    })
})
//点击按钮添加轮播图片
$('#addSlides').on('submit',function(){
      let formData = $(this).serialize();
      console.log(formData);
      $.ajax({
            type:'post',
            url:'/slides',
            data:formData,
            success : function(){
                location.reload()
            }
        })
      return false;
})
//删除
$('#tbody').on('click','.delete',function(){
    let id =$(this).attr('data-id');
    
    if(confirm('确定要删除吗')){
        $.ajax({
            type:'delete',
            url:'/slides/' + id,
            success: function(){
                location.reload()
            }
        })
    }
   
})