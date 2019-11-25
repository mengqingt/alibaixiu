//将分类渲染载页面上
$.ajax({
    type:'get',
    url:'/categories',
    success : function(response){
           //   console.log(response);
       let html = template('categoryTel',{data:response})  
       $('#category').html(html)   
    }
})
//选择文件，上传图片
$('#feature').on('change',function(){
  //  console.log(this.files[0]);
    var formData = new FormData();
    formData.append('cover',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,
        processData:false,
        contentType:false,
        success : function(response){
           // console.log(response); 
         //  $(this).siblings('#featureImg').attr('src',response[0].cover).show()
           $('#thumbnail').val(response[0].cover)
        }
    })
})
//创建文章
$('#addForm').on('submit',function(){
    let formData = $(this).serialize()
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success : function(){
           // console.log(res);
        location.href = 'posts.html'
        }
    })
    return false;

})
