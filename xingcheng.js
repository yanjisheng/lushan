var routeArray = new Array();

function Route(routeIndex, tourDate, tourPeople){
	this.routeIndex = routeIndex;
	this.tourDate = tourDate;
	this.tourPeople = tourPeople;
	this.visible = true;
}

function addRoute(){
	var routeIndex = document.getElementById('route').selectedIndex;
	var tourDate = document.getElementById('date').value;
	var tourPeople = parseInt(document.getElementById('people').value);
	var route;
	switch(routeIndex){
	case 0: route = '线路1：庐山三日游'; total = 2400 * tourPeople; break;
	case 1: route = '线路2：庐山西海一日游'; total = 800 * tourPeople; break;
	case 2: route = '线路3：东林寺、温泉两日游'; total = 1600 * tourPeople; break;
	}
	if(isNaN(tourPeople)||tourPeople<=0){
		alert('输入人数错误！');
		return;
	}	
	var tourDate2 = Date.parse(tourDate);
	//早上8点前可以预订当天行程，不能添加过去的行程和2030年12月31日之后的行程
	if(isNaN(tourDate2)||(tourDate2<((new Date())-8*60*60*1000))||(tourDate2>(new Date('2030-12-31')))){
		alert('输入日期错误！');
		return;
	}
	var newTour = document.createElement('div');
	newTour.setAttribute('id','tour'+routeArray.length);
	newTour.innerHTML = '<span class="route">'+route+'</span><span class="date">出发日期：'+tourDate+'</span><span class="people">人数：'+tourPeople+'人</span><span class="total">小计：'+total+'元</span><input type="button" value="删除行程" onclick="removeRoute('+routeArray.length+')"/>';
	var myRoute = document.getElementById('myRoute');
	myRoute.insertBefore(newTour,document.getElementById('submitButton'));
	routeArray.push(new Route(routeIndex, tourDate2, tourPeople));
	countTotal();
}

function removeRoute(num){
	routeArray[num].visible = false;
	document.getElementById('tour'+num).style.display='none';
	countTotal();
}

function countTotal(){
	var total = 0;
	for(i=0;i<routeArray.length;i++){
		if(routeArray[i].visible){
			switch(routeArray[i].routeIndex){
			case 0: total += 2400 * routeArray[i].tourPeople; break;
			case 1: total += 800 * routeArray[i].tourPeople; break;
			case 2: total += 1600 * routeArray[i].tourPeople; break;
			}
		}
	}
	document.getElementById('totalPrice').innerHTML = '总计：' +total+ '元';
}

function submitRoute(){
/*	var submitContent='';
	for(i=0;i<routeArray.length;i++){
		submitContent+=i+'\t'+routeArray[i].routeIndex+'\t'+routeArray[i].tourDate+'\t'+routeArray[i].tourPeople+'\t'+routeArray[i].visible+'\n';
	}
	alert(submitContent);*/
	var conflictTourTime = false;
	var goon = true;
	for(i=0;i<routeArray.length;i++){
		for(j=0;j<i;j++){
			if(routeArray[i].visible&&routeArray[j].visible){
				if(routeArray[i].tourDate==routeArray[j].tourDate){
					goon = confirm('您的行程存在时间冲突，是否继续？');
				}
			}
		}
	}
	if(!goon){
		return;
	}
	var count = 0;
	var total = 0;
	for(i=0;i<routeArray.length;i++){
		if(routeArray[i].visible){
			count++;
			switch(routeArray[i].routeIndex){
			case 0: total += 2400 * routeArray[i].tourPeople; break;
			case 1: total += 800 * routeArray[i].tourPeople; break;
			case 2: total += 1600 * routeArray[i].tourPeople; break;
			}
		}		
	}
	if(count==0){
		alert('请先选择行程！');
		return;
	}
	var customerName = document.getElementById('customerName').value;
	var telephone = document.getElementById('telephone').value;
	if((customerName=='')||(telephone=='')||!document.getElementById('agreement').checked){
		alert('请填写联系人姓名和联系电话并同意用户协议！');
		return;
	}
	var result = confirm(customerName+'先生/女士，\n您一共预订了'+count+'段行程，总计'+total+'元。\n确定支付并提交行程？');
	if(result){
		alert('支付成功！\n即将跳转到首页……');
		window.location = 'index.html';
	}
}

function hide(){
	document.getElementById('brouserWarning').style.display='none';
}
