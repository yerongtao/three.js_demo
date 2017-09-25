// 内容管理对象
var jdata=[];
var JZF=function() {
	this.id=('jzf_'+Math.random()).replace('.','_');
	this.el=$('<div class="jzf" id="'+this.id+'">').hide();
	this.page=[];
	$('body').append(this.el);

	
	//增加一个新页
	/**
	 * @param {string} name 组件的名称，会加入到classname中
	 * @return ｛JZF｝JZF对象 ， 可以重复使用h5对象支持的方法
	 */
	this.addPage=function (name) {
		jdata.push({isPage:true,name:name});
        var page=$('<div class="jzf_page section">');
		if (name!=undefined){
                page.addClass('jzf_page_'+name);
		}
		this.el.append(page);
		this.page.push(page); 
		if(typeof this.whenAddPage==='function'){
			this.whenAddPage();
		}
		return this;
	}

	// 新增一个组件
	 this.addComponent=function(name,cfg) {
		jdata.push({isPage:false,name:name,cfg:cfg});
		var cfg=cfg||{};

		cfg=$.extend({
			type:'base'
		},cfg);

		var component;
		var page=this.page.slice(-1)[0];
		switch (cfg.type) {
			case 'base':
				component=new JZFComponentBase(name,cfg);
				break;
			case 'link' :
				component=new JZFComponentLink(name, cfg);
				break;
			case 'left' :
				component=new JZFComponentLeft(name, cfg);
				break;
		}
		page.append(component); 
		return this;
	}

	// 对象初始化
	this.loader=function(firstPage){
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction) {
				$(this).find('.jzf_component').trigger('onLeave');

			},
			afterLoad:function(anchorLink,index) {
				$(this).find('.jzf_component').trigger('onLoad');
				console.log($(this));
			},
			
		}); 
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	}
	this.loader = typeof jzf_loading=='function' ? jzf_loading : this.loader;
	return this;
}