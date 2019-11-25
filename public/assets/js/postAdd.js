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
        location.href = 'posts.html'
        }
    })
    return false;

})

//获取修改文章的id
  let id = getURLPthename('id');
//   console.log(id);
//将修改的文章加载在页面上
  $.ajax({
      type:'get',
      url:'/posts/' + id,
      success : function(resut){
        $.ajax({
            type:'get',
            url:'/categories',
            success : function(response){
            response.resut = resut;
          //  console.log(response);
            let html = template('modifyActicle',response)
                   //   console.log(html);
             $('#box').html(html)    
            }
        })
      }
  })
  //提交修改的文章
  $('#box').on('submit','#editForm',function(){
     let id = $(this).attr('data-id');
     let formData = $(this).serialize();
    // console.log(formData);
     
     $.ajax({
         type:'put',
         url:'/posts/' + id,
         data:formData,
         success : function(){
            location.href = 'posts.html'
         }
     })
      return false
  })
//创建一个获取地址栏的参数
 function getURLPthename(x){
  let  patheName = location.search.substr(1);
    patheNames = patheName.split('&');
    for(var i=0;i<patheNames.length; i++){
     if(patheNames[i].split('=')[0] == x){
      return patheNames[i].split('=')[1]
     }
        
    }
    return null
   //console.log(patheNames);
 }
 //修改时间格式
 function  createDate(data){
    data = new Date(data);
   return   data.getFullYear() + "-" +(data.getMonth()+1) + "-"+data.getDate()
 }