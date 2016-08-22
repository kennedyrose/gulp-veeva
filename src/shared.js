// Global scripts
!function(w,d,u){'use strict'

	var i





	// Self hiders toggle hide when clicked
	var selfTogglers = d.querySelectorAll('.self')
	for(i = selfTogglers.length; i--;){
		selfTogglers[i].addEventListener('click', selfToggle)
	}
	function selfToggle(){
		this.classList.toggle('active')
	}


	// Togglers toggle .active class
	var togglers = d.querySelectorAll('[data-toggle]')
	for(i = togglers.length; i--;){
		togglers[i].addEventListener('click', toggle)
	}
	function toggle(){
		var el = d.querySelectorAll(this.dataset.toggle)
		for(var i = el.length; i--;){
			el[i].classList.toggle('active')
		}
	}



	// Activators add .active class
	var activators = d.querySelectorAll('[data-activate]')
	for(i = activators.length; i--;){
		activators[i].addEventListener('click', activate)
	}
	function activate(){
		var el = d.querySelector(this.dataset.activate)
		el.classList.add('active')
	}



	var els = d.querySelectorAll('[data-activate-delay]'),
		start = false,
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
		var prog = timestmap - start,
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