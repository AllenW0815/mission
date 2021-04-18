//滾動套件
new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
	scrollHorizontally: true,
  onLeave: function(origin, destination, direction){
    // 測試是否正確觸發
    // alert('123')
    let scrollPage = new TimelineMax()
    scrollPage.fromTo('.text',1,{
      autoAlpha:0,
      },{
      autoAlpha:1,
    },'+=0.5').fromTo('.db-btn',1,{
      autoAlpha:0,
      },{
      autoAlpha:1,
    },'-=1')
  },
});


//當文件的DOM元素載入完畢後做...
document.addEventListener("DOMContentLoaded", function() {
    //箭頭觸發事件註冊
    const arrows = document.getElementsByClassName('arrow')
    for(let i = 0;i<arrows.length;i++){
      arrows[i].addEventListener('click',function(e){
        e.preventDefault();
        fullpage_api.moveSectionDown();
      })
    }
    //鏈接動畫
    let loading = new TimelineMax()
    loading.fromTo('.text h2',0.6,{
      autoAlpha:0,
      y:30
      },{
      autoAlpha:1,
      y:0
    }).fromTo('.text p',0.6,{
      autoAlpha:0,
      },{
      autoAlpha:1,
    }).fromTo('.db-btn .black-button',0.6,{
      autoAlpha:0,
      x:-25
      },{
      autoAlpha:1,
      x:0
      //下面加上-=秒數 產生延遲 達到效果同時出現
    },'-=0.6').fromTo('.db-btn .white-button',0.6,{
      autoAlpha:0,
      x:25
      },{
      autoAlpha:1,
      x:0
    },'-=0.6').fromTo('.arrow',0.3,{
      autoAlpha:0,
      y:-15
      },{
      autoAlpha:1,
      y:0
    })
    });