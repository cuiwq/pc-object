$(function(){
	var url = new URLSearchParams(window.location.search)
	var result = url.get('proName')
	getSearchListData(result);
	
	console.log(result)
	mui.init({
    // 注意: 按照文档上书写的DOM结构无特殊要求，只需要指定一个下拉刷新容器标识即可
    // 但是实际上不行,按照实践要求 必须在区域滚动的基础上才可以
    pullRefresh : {
      container:"#lt-search",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        height:'50px',//可选,默认50px.下拉刷新控件的高度,
        range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback:function(){
          // console.log(1);
          
    
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
})

// 1.3 点击进入商品详情页
$('.search-result-list').on('tap','button',function(){
	var id = $(this).data('id');
	location.href = "./detail.html?id="+id;
})

// 获取搜索结果
var getSearchListData = function(proName,pageName,price,num){
	// var url = new URLSearchParams(location.search);
	// var proName = url.get('proName');
	console.log(1)
	$.ajax({
		type:'get',
        url:'/product/queryProduct',
        data:{
        	proName:proName || '',
        	page:pageName || 1,
        	pageSize:6,
        	price:price || null,
        	num: num || 2
        },
        success:function(data){
        	console.log(data);
        	var searchList = template('searchListTemplate',data);
        	$(".search-result-list").html(searchList);
        }
	})
}