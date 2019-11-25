//查询文章列表
$.ajax({
    type:'get',
    url:'/posts',
    success :function(response){
          console.log(response);
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
function changPage(page){
  $.ajax({
    type:'get',
    url:'/posts',
    data:{
      page:page
    },
    success :function(response){
          console.log(response);
    let html = template('postsTel',{data : response})
    //console.log(html);
     $('#tbody').html(html)
     let htmls = template('pageTel',{data:response})
     $('#postsPage').html(htmls)
    }
})
}