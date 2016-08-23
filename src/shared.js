// Global scripts
!function(w,d,u){'use strict'

	var i, els





	// Self hiders toggle active when clicked
	els = d.querySelectorAll('.self')
	for(i = els.length; i--;){
		els[i].addEventListener('click', selfToggle)
	}
	function selfToggle(){
		this.classList.toggle('active')
	}



	// Togglers toggle .active class
	els = d.querySelectorAll('[data-toggle]')
	for(i = els.length; i--;){
		els[i].addEventListener('click', toggle)
	}
	function toggle(){
		var el = d.querySelectorAll(this.dataset.toggle)
		for(var i = el.length; i--;){
			el[i].classList.toggle('active')
		}
	}



	// Activators add .active class
	els = d.querySelectorAll('[data-activate]')
	for(i = els.length; i--;){
		els[i].addEventListener('click', activate)
	}
	function activate(){
		var els = d.querySelectorAll(this.dataset.activate)
		for(var i = els.length; i--;){
			els[i].classList.add('active')
		}
	}



	// Removes .active class
	els = d.querySelectorAll('[data-deactivate]')
	for(i = els.length; i--;){
		els[i].addEventListener('click', deactivate)
	}
	function deactivate(){
		var els = d.querySelectorAll(this.dataset.activate)
		for(var i = els.length; i--;){
			els[i].classList.remove('active')
		}
	}



	// Activate list adds .active class one after the other after subsequent clicks
	els = d.querySelectorAll('[data-activate-list]')
	for(i = els.length; i--;){
		els[i].addEventListener('click', activateList)
	}
	function activateList(){
		var list = this.dataset.activateList.split(',')
		for(var i = list.length; i--;){
			list[i] = list[i].trim()
		}
		if(this.dataset.lastActive){
			var cursor = list.indexOf(this.dataset.lastActive) + 1
		}
		else{
			cursor = 0
		}
		if(cursor <= list.length - 1){
			this.dataset.lastActive = list[cursor]
			var activated = d.querySelectorAll(list[cursor])
			for(i = activated.length; i--;){
				activated[i].classList.add('active')
			}
		}
	}





	// Adds .activate class to self on given delay
	els = d.querySelectorAll('[data-activate-delay]'),
	var start = false,
		delayers = []
	for(i = els.length; i--;){
		delayers.push({
			el: els[i],
			delay: els[i].dataset.activateSelf,
			activated: false
		})
	}
	function step(timestamp){
		if(!start){
			start = timestamp
		}
		var prog = timestamp - start,
			found = false
		for(var i = delayers.length; i--;){
			if(delayers.activated === false){
				found = true
				if(delayers[i].delay <= prog){
					delayers[i].el.classList.add('active')
					delayers[i].activated = true
				}
			}
		}
		if(found === true){
			requestAnimationFrame(step)
		}
	}
	requestAnimationFrame(step)





	// Stop Document Scrolling
	var xStart, yStart = 0;
	d.addEventListener('touchstart',function(e) {
		xStart = e.touches[0].screenX
		yStart = e.touches[0].screenY
	})
	d.addEventListener('touchmove',function(e) {
		var xMovement = Math.abs(e.touches[0].screenX - xStart)
		var yMovement = Math.abs(e.touches[0].screenY - yStart); 
		e.preventDefault()
	})

	// Prevent box
	d.addEventListener("touchstart", function(){}, true)

	// Initiate Fastclick
	FastClick.attach(d.body)


}(window,document)