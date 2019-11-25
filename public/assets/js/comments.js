//创建评论
// $.ajax({
//     type:'POST',
//     url:'/comments',
//     data:{
//         author:'5dd796d2d0798748cccc6147',
//         content:'六个字水经验',
//         post:'5ddbb9a72288850c7c1f2a94',
//     }
// })
//获取评论列表
$.ajax({
    type:'get',
    url:'/comments',
    success: function(response){
    //   console.log(response);   
      let html = template('commentsTel',{data: response})
      $('#tbody').html(html);
      let htmls = template('pageTel',{data:response})
      $('#commentsPage').html(htmls)
    }
})
//分页
function changPage(page){
    $.ajax({
      type:'get',
      url:'/comments',
      data:{
        page:page
      },
      success :function(response){
           // console.log(response);
      let html = template('commentsTel',{data : response})
      //console.log(html);
       $('#tbody').html(html)
       let htmls = template('pageTel',{data:response})
       $('#commentsPage').html(htmls)
      }
  })
  }
  //删除评论
  $('#tbody').on('click','.delete',function(){
      let id = $(this).attr('data-id');
     // alert(id)
    if(confirm('你确认要删除吗')) {
        $.ajax({
            type:'delete',
            url:'/comments/' + id,
            success : function(){
                location.reload()
            }
        })
    }
    
  })
  //更改评论状态
  $('#tbody').on('click','.state',function(){
    let status= $(this).attr('data-status');
   // alert(status)
    let id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            state:status == 0 ? 1 : 0,
        },
        success:function(response){
           //  console.log(response);
            location.reload()
        }
    })
  })
 //修改时间格式
 function  createDate(data){
    data = new Date(data);
   return   data.getFullYear() + "-" +(data.getMonth()+1) + "-"+data.getDate()
 }