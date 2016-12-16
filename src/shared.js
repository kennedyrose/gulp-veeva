// Global scripts
!function(w,d,u){'use strict'

	var i


	// Self hiders toggle hide when clicked
	var selfHiders = d.querySelectorAll('.selfHide')
	for(i = selfHiders.length; i--;){
		selfHiders[i].addEventListener('click', clickHide)
	}
	function clickHide(){
		this.classList.toggle('hide')
	}


	// Togglers toggle .hide class
	var togglers = d.querySelectorAll('[data-toggle]')
	for(i = togglers.length; i--;){
		togglers[i].addEventListener('click', toggle)
	}
	function toggle(){
		var el = d.querySelector(this.dataset.toggle)
		el.classList.toggle('hide')
	}



	// Activators add .active class
	var activators = d.querySelectorAll('[data-activate]')
	console.log(activators)
	for(i = activators.length; i--;){
		activators[i].addEventListener('click', activate)
	}
	function activate(){
		var el = d.querySelector(this.dataset.activate)
		el.classList.add('active')
	}


	// Instants toggle .active class immediately after page loads
	var instants = d.querySelectorAll('.instant')
	if(instants.length){
		setTimeout(fireInstants, 100)
	}
	function fireInstants(){
		console.log(0)
		for(var i = instants.length; i--;){
			instants[i].classList.add('active')
		}
	}





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