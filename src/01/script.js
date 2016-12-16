// Global scripts
!function(w,d,u){'use strict'


	console.log('script loaded')

	var btn = d.querySelector('#btn1')
	btn.addEventListener('click', function(){
		setTimeout(first, 2000)
	})
	function first(){
		d.querySelector('#copy1').classList.add('active')
		setTimeout(second, 600)
	}
	function second(){
		d.querySelector('#copy2').classList.add('active')
	}


}(window,document)