// Global scripts
!function(w,d,u){'use strict'

	var delay = 600

	var over1 = d.querySelector('#over1'),
		over2 = d.querySelector('#over1')


	var row1 = d.querySelector('#overlay1')
	var row2 = d.querySelector('#overlay2')
	var row3 = d.querySelector('#overlay3')

	d.querySelector('#btn3').addEventListener('click', function(){
		row2.classList.add('hide')
		row3.classList.add('hide')
	})
	d.querySelector('#btn4').addEventListener('click', function(){
		row1.classList.add('hide')
		row3.classList.add('hide')
	})
	d.querySelector('#btn5').addEventListener('click', function(){
		row1.classList.add('hide')
		row2.classList.add('hide')
	})

/*
	d.querySelector('#btn1').addEventListener('click', function(){

		d.querySelector('#prog1').classList.add('active')
		setTimeout(function(){
			d.querySelector('#prog2').classList.add('active')
			setTimeout(function(){
				d.querySelector('#prog3').classList.add('active')
				setTimeout(function(){
					d.querySelector('#prog4').classList.add('active')
					setTimeout(function(){
						d.querySelector('#prog5').classList.add('active')
						setTimeout(function(){
							d.querySelector('#prog6').classList.add('active')
						}, delay * 5)
					}, delay * 4)
				}, delay * 3)
			}, delay * 2)
		}, delay)

		// Show row buttons
		d.querySelector('#row1').classList.remove('hide')
		d.querySelector('#row2').classList.remove('hide')
	})

*/



}(window,document)