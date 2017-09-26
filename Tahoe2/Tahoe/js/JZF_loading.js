var jzf_loading=function (images,firstPage) {
	var id=this.id;
	if(this._images===undefined){//第一次进入
		this._images=(images||[]).length;// 需要加载的图片数
		this._loaded=0;//刚开始时加载了0个资源

		window[id]=this;
		for(s in images){
			var item=images[s];
			var img=new Image;
			img.src=item;
			img.onload=function () {
				window[id].loader();
			};
		}
		$('#rate').text('0%');
		return this;
	}else{
		this._loaded++;
		$('#rate').text((this._loaded/this._images*100)>>0+'%');
		if(this._loaded<this._images){
			return this;
		}
	}

	$('.jzf_page_face').find('.jzf_component').trigger('onLoad')
	this.el.fullpage({
			
			onLeave:function(index,nextIndex,direction) {
				$(this).find('.jzf_component').trigger('onLeave');
                if (index == 1) {
                    $(".myB").fadeIn(400);
                    $(".myB").show();
                } else {
                    // $(".myB").fadeOut(500);
                    $(".myB").hide()
                }

			},
			afterLoad:function(anchorLink,index) {
				if (index == 2) {
					$(".myB").fadeIn(400);
					$(".myB").show();
				} else {
					// $(".myB").fadeOut(500);
					$(".myB").hide()
				}

                $(".myB").fadeIn(1000);

                if (index == 1 || index == 2) {
                    $(".myA").hide()
                } else {
                    $(".myA").show();
                }

                if (index == 2) {
                    $(".myB").show();
                } else {
                    $(".myB").hide()
                }

                if (index == 7 || index == 8 || index == 9) {
                    $(".myC").show();
                } else {
                    $(".myC").hide()
                }


				$(this).find('.jzf_component').trigger('onLoad');
				
			}
		});
	this.el.show();
	if(firstPage){
		$.fn.fullpage.moveTo(firstPage);
	}
}