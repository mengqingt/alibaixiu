$('#categoriesAdd').on('submit',function(){
    var formData = $(this).serialize();
  //  return false
  $.ajax({
      type:'post',
      url:'/categories',
      data: formData,
      success : function(response){
       //console.log(response);
       location.reload()
      }
  })
  return false;
})
//列表渲染
$.ajax({
    type:'get',
    url:'/categories',
    success : function(response){
       var html = template('categoriesTel',{data : response});
       // console.log(html);
       $('#tbody').html(html)
    }
})
//点击编辑将编辑的值加载在页面上
$('#tbody').on('click','.edit',function(){
       var id = $(this).attr('data-id')
      // alert(id)
      $.ajax({
          type:'get',
          url:'/categories/' + id,
          success : function(response){
              var html = template('modifyBox',response)
              $('#modifyCateg').html(html)
          }
      })
})
//点击编辑进行编辑
 $('#modifyCateg').on('submit','#categoriesEdit',function(){
     var formData = $(this).serialize();
     let id = $(this).attr('data-id');
    // alert(id)
    $.ajax({
        type:'put',
        url:'/categories/' + id,
        data:formData,
        success : function(rees){
           //console.log(rees);
           
             location.reload()
        }
    })
    return false
 })
 //点击删除按钮进行删除
 $('#tbody').on('click','.delete',function(){
   let id = $(this).parent().find('.edit').attr('data-id');
  // alert(id)
  $.ajax({
      type:'delete',
      url:'/categories/' + id,
      success :function(){
          location.reload()
      }
  })
 })