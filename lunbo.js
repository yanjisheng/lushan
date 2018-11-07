var currentPic = 1;
function changePic(num){
	document.getElementById('lunbo').style.backgroundImage='url("lushan'+num+'.jpeg")';
	currentPic = num;
	for(i=0;i<=5;i++){
		if(num==i){
			document.getElementById('lunbo_bottom').children[i].style.backgroundColor='#ff9900';
		}else{
			document.getElementById('lunbo_bottom').children[i].style.backgroundColor='#000000';
		}
	}
}
function getCurrentPic(){
	var lunbo = document.getElementById('lunbo');
	alert(lunbo.style.backgroundImage);
	var currentPic = parseInt(lunbo.style.backgroundImage.charAt(lunbo.style.backgroundImage.length-8));
	return currentPic;
}
function movePic(direction){
	//var currentPic = getCurrentPic();
	//alert(currentPic);
	if(direction=='left'){
		if(currentPic==1){
			changePic(4);
		}else{
			changePic(currentPic-1);
		}
	}else if(direction=='right'||direction==1){
		if(currentPic==4){
			changePic(1);
		}else{
			changePic(currentPic+1);
		}
	}
}
