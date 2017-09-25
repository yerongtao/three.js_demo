var JZFComponentBase=function(name,cfg) {

	var cfg=cfg||{};

	var id=('jzf_c_'+Math.random()).replace('.','_');

	// 将当前的组建类型加到dom中进行标记
	var cla='jzf_component_'+cfg.type;

	var component=$('<div class="jzf_component '+cla+' jzf_component_name_'+name+'" id="'+id+'">');

	cfg.text&&component.text(cfg.text);
	cfg.width&&component.width(cfg.width/2 + 'rem');
	cfg.height&&component.height(cfg.height/2 + 'rem');
	cfg.css&&component.css(cfg.css);
	cfg.bg&&component.css('backgroundImage','url('+cfg.bg+')');

	if(cfg.center===true){
		component.css({
			marginLeft:(cfg.width/4*-1)+'rem',
			left:'50%'
		})
	}
	if(cfg.zIndex === true){
		component.css({
			zIndex:999
		})
	}

	// 更多自定义的参数
	if(typeof cfg.onclick==='function'){
		component.on('click',cfg.onclick);
	}

	component.on('onLoad',function() {
		setTimeout(function () {
			component.addClass(cla+'_load').removeClass(cla+'_leave');
			cfg.animateIn&&component.animate(cfg.animateIn);
		}, cfg.delay||0);
	});
	component.on('onLeave',function () {
		setTimeout(function () {
			component.addClass(cla+'_leave').removeClass(cla+'_load');
			cfg.animateOut&&component.animate(cfg.animateOut);
		}, cfg.delay||0);
		
	});

	return component;
}