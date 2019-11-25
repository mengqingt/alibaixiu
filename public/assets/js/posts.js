//查询文章列表
$.ajax({
    type:'get',
    url:'/posts',
    success :function(response){
       //   console.log(response);
    let html = template('postsTel',{data : response})
    //console.log(html);
     $('#tbody').html(html)
     let htmls = template('pageTel',{data:response})
     $('#postsPage').html(htmls)
    }
})
//修改时间
function  createDate(data){
   data = new Date(data);
  return   data.getFullYear() + "-" +(data.getMonth()+1) + "-"+data.getDate()
}
//分页
function changPage(page){
  $.ajax({
    type:'get',
    url:'/posts',
    data:{
      page:page
    },
    success :function(response){
         // console.log(response);
    let html = template('postsTel',{data : response})
    //console.log(html);
     $('#tbody').html(html)
     let htmls = template('pageTel',{data:response})
     $('#postsPage').html(htmls)
    }
})
}
//筛选
$.ajax({
  type:'get',
  url:'/categories',
  success: function(response){
      //  console.log(response);
     let html = template('categroryTel',{data:response});
     $('#categoryAll').html(html)
  }
})
$('#fliterForm').on('submit',function(){
  var formData = $(this).serialize();
   console.log(formData);
  // let categoryAll = $('#categoryAll').val();
  // console.log(categoryAll);
  $.ajax({
    type:'get',
    url:'/posts',
    data:formData,
   // data:{category:categoryAll},
    success :function(response){
         console.log(response);
    let html = template('postsTel',{data : response})
    //console.log(html);
     $('#tbody').html(html);
     let htmls = template('pageTel',{data:response});
     $('#postsPage').html(htmls);
     }
  })
  return false;
})
//根据id删除文章
$('#tbody').on('click','.delete',function(){
   let id = $(this).attr('data-id');
  if(confirm('你确认删除吗')){
    $.ajax({
      type:'delete',
      url:'/posts/' + id,
      success : function(){
        location.reload()
      }
      })
    }
   })
   