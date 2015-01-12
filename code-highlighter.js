javascript:(function() {
	function addEvent(el, ev, fn){
		if(window.addEventListener){
			el.addEventListener(ev, fn, false);
		} else if(window.attachEvent) {
			el.attachEvent('on' + ev, fn);
		} else {
			el['on' + ev] = fn;
		}
	};
	var params = {};
	params.website = location.href.match(/\b[\d\w-]*(?=\.)/)[0];
	params.useBrTag = document.getElementsByTagName('pre')[0].getElementsByTagName('br').length && !document.getElementsByTagName('pre')[0].getElementsByTagName('code').length  ? true : false;
	params.whiteList = ['stackoverflow','github'];
	
	function correctPreHtml() {
		var blocks = document.getElementsByTagName('pre'), 
				ln = blocks.length, code;
				
		if (ln) {
			for (var i = 0; i < ln; i++) {
				if (!blocks[i].getElementsByTagName('code').length) {
					code = document.createElement('code');
					code.innerHTML = blocks[i].innerHTML;
					blocks[i].innerHTML = '';
					blocks[i].appendChild(code);
				}
			}
		}
	}
	function setAdditionalStyles() {
		var style = document.createElement('style');
			style.innerHTML = '.hljs { display: inline-block !important; padding: 3% !important;  min-width: 94%; white-space: pre !important;} pre, pre.graf--pre { overflow-x: auto !important; padding: 0 !important;}';
			document.getElementsByTagName('head')[0].appendChild(style);
	}
	function setThemeList() {
		var arr, str = '', themes = [{t:'ascetic'},{t:'atelier-dune.dark'},{t:'atelier-dune.light'},{t:'atelier-forest.dark'},{t:'atelier-forest.light'},
			{t:'atelier-heath.dark'},{t:'atelier-heath.light'},{t:'atelier-lakeside.dark'},{t:'atelier-lakeside.light'},{t:'atelier-seaside.dark'},
			{t:'atelier-seaside.light'},{t:'brown_paper'},{t:'codepen-embed'},{t:'color-brewer'},{t:'dark'},{t:'default'},{t:'docco'},{t:'far'},
			{t:'foundation'},{t:'github'},{t:'googlecode'},{t:'hybrid'},{t:'idea'},{t:'ir_black'},{t:'kimbie.dark'},{t:'kimbie.light'},{t:'magula'},
			{t:'mono-blue'},{t:'monokai'},{t:'monokai_sublime'},{t:'obsidian'},{t:'paraiso.dark'},{t:'paraiso.light'},{t:'pojoaque'},{t:'railscasts'},
			{t:'rainbow'},{t:'school_book'},{t:'solarized_dark'},{t:'solarized_light'},{t:'sunburst'},{t:'tomorrow-night-blue'},{t:'tomorrow-night-bright'},
			{t:'tomorrow-night-eighties'},{t:'tomorrow-night'},{t:'tomorrow'},{t:'vs'},{t:'xcode'},{t:'zenburn'}], len = themes.length;
		
		for (var i = 0; i < len; i++) {
			arr = themes[i].t.split(/_|-|\./);
			for (var j = 0; j < arr.length; j++) {
				str += arr[j].slice(0,1).toUpperCase() + arr[j].slice(1) + ' ';
			}
			themes[i].n = str;
			str = '';
		}
		return themes;
	}
	function buildSelect(themes) {
			var select = document.createElement('select'), option, 
					len = themes.length, prefix = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/';
			
			if (!document.getElementById('highlighter-select')) {
				for (var i = 0; i < len; i++) {
						option = document.createElement('option');
						option.text = themes[i].n;
						option.value = themes[i].t;
						select.appendChild(option);
				}
				select.id = 'highlighter-select';
				select.style.cssText = 'position: fixed; top: 80px; left: 10px; z-index: 9999; width: 150px;';
				addEvent(select,'change',function(e) {
					var target = e.target || e.srcElement;
					document.getElementById('highlighter-css').href = prefix + target.value + '.min.css';
				});
				document.body.appendChild(select);
			}
	}
	function init() {
		var script = document.createElement('script'),
				css = document.createElement('link'), themeList;
				
		script.type = 'text/javascript';
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js';
		script.id = 'highlighter-lib';
		css.rel = 'stylesheet';
		css.id = 'highlighter-css';
		css.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/github.min.css';
		
		correctPreHtml();
		setAdditionalStyles();
		 
		if (!document.getElementById('highlighter-lib'))	document.body.appendChild(script);
		if (!document.getElementById('highlighter-css')) 	document.getElementsByTagName('head')[0].appendChild(css);
		
		var i = setInterval(function() {
			if (hljs) {
				if (params.useBrTag === true) {
					hljs.configure({useBR: true});
				}
				hljs.initHighlighting();
				clearInterval(i);
			};
		}, 200);
		
		themeList = setThemeList();
		buildSelect(themeList);
	}
	init();
}());