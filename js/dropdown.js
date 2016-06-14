$(document).ready(function(){
	$('ul.one').hide();
	$('ul li div#icon').hide();
	
	$('.nav li').hover(
	function(){
		var openMenu= $(this).children('ul.one');
		var icon=$(this).children('#icon');
		$(openMenu).show();
		$(icon).show();
		$(icon).css({
			'top':'-35px'
		});
	},
	function(){
		var openMenu= $(this).children('ul.one');
		var icon=$(this).children('#icon');
		$(openMenu).hide();
		$(icon).hide();
	});
	
	$('.one li').hover(
	function(){
		var subMenu=$(this).children('.one#sub-menu');
		$(subMenu).css({
			'left':'100%',
			'top':'-25%'
		})
	});
});