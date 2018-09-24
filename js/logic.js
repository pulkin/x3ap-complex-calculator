String.prototype.repeat = function(l){
	return new Array(l+1).join(this);
};


var factorycount = 0; var ancillarycosts = 0; var rowsadded=0; var whichstored = ''; var loadFromQuery = false; var netprof; var rph; var cph;
var cckCost = 0; var facList = new Array(); var theform;
var stored = new Array(); var yieldfield; var j = 0;
var stationcost = 0; var sunlight = 0;
var URL = location.href;
var ttlcost = 0; var sunpct; var sunlist = [[0,305],[100,239],[150,215],[300,166],[400,145],[450,136]]; var sunsector;
var ore = []; var silicon = []; var oresector; var siliconsector; var versionloaded = "tc32";


// added for getElementsByName IE problem
var isOpera, isIE = false;
if(typeof(window.opera) != 'undefined'){isOpera = true;}
if(document.all){isIE = true};
//

function loadVersion(version){
	versionloaded = 0;
	var msg = "Version loaded " + versionloaded;
	var ore = []; var silicon = [];
	if(version=="ap11"){
			loadScript("js/suns-ap.js",null);
			loadScript("js/factories-ap.js",factSelbox);
			loadScript("js/asteroids-ap.js",setRoids);
			loadScript("js/wares-ap.js",alert(msg));
	} else {
			loadScript("js/suns.js",null);
			loadScript("js/factories.js",factSelbox);
			loadScript("js/asteroids.js",setRoids);
			loadScript("js/wares.js",alert(msg));
	}
}

function setRoids(){
	for ( x = 0; x < roididx.length; x++ ){
		var y = roididx[x];
		switch(roid[y][1]){
		case 0 :
			ore.push([y,roid[y][0],roid[y][2]]);
			break;
		case 1 :
			silicon.push([y,roid[y][0],roid[y][2]]);
			break;
		default :
		}
	}
}

function sppyield(){
	var rtntxt = '<select name="yield" size="1" onChange="update();">';
	for(i=0; i < sunlist.length; i++ ){
		rtntxt += '<option value="' + sunlist[i][1] + '"'
		if(sunpct == sunlist[i][0] || ( sunpct == '' && sunlist[i][0] == 100 )){ rtntxt += ' selected'; }
		rtntxt += '>' + sunlist[i][0] + '%</option>\n';
	}
	rtntxt += '</select>';
	return rtntxt
}

function mineyield(whichSub){
	if(sunsector){
		var rtntxt = '<select name="yield" size=1 onChange="update();">';
		if(theform.factory[whichSub].value == 'om'){
			for(j=0; j < ore.length; j++){
				if(ore[j][1] == sunsector ){ rtntxt += '<option value="' + ore[j][2] + '">' + ore[j][2] + '</option>'; }
			}
		} else if (theform.factory[whichSub].value == 'sim'){
			for(j=0; j < silicon.length; j++){
				if(silicon[j][1] == sunsector ){ rtntxt += '<option value="' + silicon[j][2] + '">' + silicon[j][2] + '</option>'; }
			}
		}
		rtntxt += '</select>';
	} else {
		var rtntxt = '<input type="text" size="4" value="25" name="yield" onChange="update();">';
	}
	return rtntxt
}

var disabledyield = '<input type="text" size="4" value="0" name="yield" onChange="update();" disabled>';

function startOver(){
	var i=0;
	for(i=0; i < theform.factory.length; i++){
		theform.factory[i].options[0].selected = true;
		setFactory(i);
		theform.test[i].value = '';
	}
	for(i=0; i < warez.length; i++){
		clearstore(warez[i]);
	}
	theform.ancillarycost.value = 0;
	update();
}

function clearstore(ware){
	this.active = false;
	this.made = 0;
	this.used = 0;
	this.leak = false;
	this.cycle = 0;
	this.buy = warez[ware].buy;
	this.sell = warez[ware].sell;
}

function startStore(){
	for(i=0; i < warez.length; i++){
		stored[warez[i]] = new clearstore(warez[i]);
	}
}

function refreshStore(){
	for(i=0; i < warez.length; i++){
		stored[warez[i]].active = false;
		stored[warez[i]].made = 0;
		stored[warez[i]].used = 0;
	}
}

function setStore(){
	if(theform.endproduct.length>0){
		var chosenendprod = theform.endproduct[chkRadio(theform.endproduct)].value;
	}
	else{
		var chosenendprod = false;
	}
	 var debugtext = "";
	for(i=0; i < theform.storedware.length; i++){
		var whichware = theform.storedware[i].value;
		stored[whichware].buy = theform.storedbuy[i].value;
		stored[whichware].sell = theform.storedsell[i].value;
		if(chosenendprod == whichware){
			stored[whichware].leak = false;
			theform.leak[i].checked = false;
			theform.leak[i].disabled = false;
		}
		else{
			stored[whichware].leak = theform.leak[i].checked;
			theform.leak[i].disabled = false;
		}
	debugtext += " - " + whichware + ", " + stored[whichware].buy + ", " + stored[whichware].sell;
	}
	theform.debug.value = theform.storedware.length + debugtext;
	calculon();
}

function setSectors(){
	theform = document.myform;
	selbox = theform.sunselect;
	sunsector = ''; sunpct = '';
	selbox.length = 1;
	for(j=0; j < sunidx.length; j++){
		var sector = suns[sunidx[j]];
		selbox.options[selbox.length] = new Option(sector[4] + ' (' + sector[2] + '%, ore: ' + sector[5] + ', sil: ' + sector[6] + ')', sunidx[j]);
	}
}

function setSun(){
	sunsector = theform.sunselect.value;
	if(sunsector){ sunpct = suns[sunsector][2]; } else { sunpct = ''; }
}

function setFactory(whichsub){
	if(rowsadded==0){

		var chosenfactory = theform.factory[whichsub].value;
		var selboxRace = theform.race[whichsub];
		var selboxSize = theform.size[whichsub];
		theform.debug.value = whichsub + "; " + chosenfactory;
		theform.qty[whichsub].value = 0;
		selboxRace.options.length = 0;
		selboxSize.options.length = 0;
		if (chosenfactory == ""){
			selboxRace.options[0] = new Option('<---------','');
			selboxSize.options[0] = new Option('<--','');
			document.myform.test[whichsub].value = '';
		} else {
			selboxSize.options[0] = new Option('<--','');
			selboxRace.options[0] = new Option('None','');
			if(factories[chosenfactory].length == 1){
				selboxRace.options[1] = new Option(factories[chosenfactory][0],factories[chosenfactory][0]);
				selboxRace.options[1].selected = true;
				setRace(whichsub);
			} else {
				for(i=0; i < factories[chosenfactory].length; i++){
					selboxRace.options[i+1] = new Option(factories[chosenfactory][i],factories[chosenfactory][i]);
				}
			}
		}

	setYieldField(whichsub,disabledyield);

	if(loadFromQuery==false){update();}
	}
}

for ( x = 0; x < roididx.length; x++ ){
	var y = roididx[x];
	switch(roid[y][1]){
	case 0 :
		ore.push([y,roid[y][0],roid[y][2]]);
		break;
	case 1 :
		silicon.push([y,roid[y][0],roid[y][2]]);
		break;
	default :
	}
}

function setYieldField(whichsub,yieldtype){
	if(isIE){
	  var name = 'yieldspan';
	    var temp = document.getElementsByTagName('span');
	    var docGetElmByName = [];
	    for(var i=0;i < temp.length;i++){
	      if(temp[i].name == name){
	        docGetElmByName.push(temp[i]);
	      }
	    }
	    docGetElmByName[whichsub].innerHTML = yieldtype;
	}
	else{
		document.getElementsByName('yieldspan')[whichsub].innerHTML = yieldtype;
	}
}

function setSize(whichsub){
	if(rowsadded==0){

	var chosenrace = theform.race[whichsub].value;
	var chosenfactory = theform.factory[whichsub].value;
	var chosensize = theform.size[whichsub].value;
	theform.qty[whichsub].value = 1;
	document.myform.test[whichsub].value = factories[chosenfactory][chosenrace][chosensize][1];
	if(chosenfactory != ''){
		if(chosenfactory == 'spp' | chosenfactory == 'sppf'){
			setYieldField(whichsub,sppyield());
		}
		else if(chosenfactory == 'om' | chosenfactory == 'sim'){
			setYieldField(whichsub,mineyield(whichsub));
		}
		else{
			setYieldField(whichsub,disabledyield);
		}
	}
	else{
		setYieldField(whichsub,disabledyield);
	}
	if(loadFromQuery==false){update();}
	}
}

function setRace(whichsub){
	if(rowsadded==0){

	var chosenfactory = theform.factory[whichsub].value;
	var chosenrace = theform.race[whichsub].value;
	theform.test[whichsub].value = chosenrace;
	var selboxSize = theform.size[whichsub];
	theform.qty[whichsub].value = 0;
	selboxSize.options.length = 0;
	if (chosenrace == ""){
		selboxSize.options[0] = new Option('<--','');
	}
	else{
		selboxSize.options[0] = new Option('None','');
		if(factories[chosenfactory][chosenrace].sizes[0].length == 1){
			selboxSize.options[1] = new Option(factories[chosenfactory][chosenrace].sizes[0][0],factories[chosenfactory][chosenrace].sizes[0][0]);
			selboxSize.options[1].selected = true;
			setSize(whichsub);

		}
		else{
			for(i=0; i < factories[chosenfactory][chosenrace].sizes[0].length; i++){
				selboxSize.options[i+1] = new Option(factories[chosenfactory][chosenrace].sizes[0][i],factories[chosenfactory][chosenrace].sizes[0][i]);
			}
		}
	}
	setYieldField(whichsub,disabledyield);
	if(loadFromQuery==false){update();}
	}
}

function coloredWares(value1,value2){
	if (value1 > value2) {
		return '#99FF99';
	}
    else if (value1 == value2) {
        return 'white';
    }
	else {
		return '#FF9999';
	}
}

function update(){
	if(rowsadded==0){
	refreshStore();

	stationcost = 0; factorycount = 0; cckCost = 0;
	result = "<table align='right'><tr><th>Ware</th><th>Produced</th><th>Used</th><th>Balance</th><th>Buy</th><th>Sell</th><th>Leak</th></tr>";
	for(i=0; i < theform.factory.length; i++){
		var chosenrace = document.myform.race[i].value; var chosenfactory = theform.factory[i].value; var chosensize = theform.size[i].value;
		if(chosenrace != '' && chosenfactory != '' && chosensize !=''){
			yieldfield = parseInt(document.getElementsByName('yield')[i].value);
			var product = factories[chosenfactory][chosenrace].produce[0][0];
			var cycle = factories[chosenfactory][chosenrace].cycletime;
			var multiplier = factories[chosenfactory][chosenrace][chosensize][0];
			var stationqty = parseInt(theform.qty[i].value);
			stationcost += factories[chosenfactory][chosenrace][chosensize][1] * stationqty;
			if(chosenfactory == 'spp'){
				stored[product].made += Math.round(553/yieldfield * 3600 * stationqty*100*multiplier)/100;
				stored.xtl.used += Math.round(240/yieldfield * stationqty*6000*multiplier)/100;
				stored.xtl.active = true;
				sunlight = yieldfield;
				stored.ec.cycle = cycle;
				stored[product].active = true;
				factorycount += stationqty;
			}
			else if(chosenfactory == 'sppf'){
				stored[product].made += Math.round(553/yieldfield * 3600 * stationqty*100*multiplier)/100;
				sunlight = yieldfield;
				stored.ec.cycle = cycle;
				stored[product].active = true;
				factorycount += stationqty;
			}
			else if(chosenfactory == 'om'){
				var basetime = Math.floor(600/(yieldfield+1)+1);
				var multiple = Math.round(59.9/basetime)+1;
				var cycletime = basetime * multiple;
				var outputpercycle = multiple*multiplier;
				var oremade = Math.round(multiplier*3600/basetime*100)/100;
				stored[product].made += oremade * stationqty;
				stored.ec.used += Math.round(oremade*6*stationqty*100)/100;
				stored.ec.active = true;
				stored.ore.cycle = cycle*yieldfield/25;
				stored[product].active = true;
				factorycount += stationqty;
			}
			else if(chosenfactory == 'sim'){
				var basetime = Math.floor(2400/(yieldfield+1))+1;
				var siliconmade = Math.round(multiplier*3600/basetime*100)/100;
				stored[product].made += siliconmade * stationqty;
				stored.ec.used += Math.round(siliconmade*24*100*stationqty)/100;
				stored.ec.active = true;
				stored.sil.cycle = cycle*yieldfield/25;
				stored[product].active = true;
				factorycount += stationqty;
			}
			else if(chosenfactory == 'cck'){
				cckCost += 259696 * stationqty;
			}
			else{
				stored[product].made += Math.round(factories[chosenfactory][chosenrace].produce[0][1]*multiplier/cycle * 3600 * stationqty*100)/100;
				for(j=0; j < factories[chosenfactory][chosenrace].resources[0].length; j++){
					var consumed = factories[chosenfactory][chosenrace].resources[0][j][0];
					stored[consumed].used += Math.round(factories[chosenfactory][chosenrace].resources[0][j][1]*multiplier/cycle * 3600 * stationqty*100)/100;
					stored[consumed].active = true;
				}
				stored[product].cycle = cycle;
				stored[product].active = true;
				factorycount += stationqty;
			}
		}
	}
	for(k = 0; k < warez.length; k++){
		if(stored[warez[k]].active){
            m = stored[warez[k]].made
            u = stored[warez[k]].used
			result += "<tr bgcolor='" + coloredWares(m, u) + "'><td onmouseover='showPrices(event,\""+warez[k]+"\");' onmouseout='hidePrices();'><input type='hidden' name='storedware' value='" + warez[k] + "'>" + warez[warez[k]].name + "</td>";
			result += "<td>" + Math.round(stored[warez[k]].made*100)/100 + "</td>";
			result += "<td>" + Math.round(stored[warez[k]].used*100)/100 + "</td>";
            result += "<td>" + Math.round((stored[warez[k]].made - stored[warez[k]].used)*100)/100 + "</td>";
			result += "<td><input type='text' size='8' name='storedbuy' onchange='checkbuy(this,\"" + warez[k] + "\");' value='" + stored[warez[k]].buy + "'></td>";
			result += "<td><input type='text' size='8' name='storedsell' onchange='checksell(this,\"" + warez[k] + "\");' value='" + stored[warez[k]].sell + "'></td>";
			result += "<td><input type='checkbox' name='leak' onchange='setStore();'";
			if(stored[warez[k]].leak){result += " checked";}
			result += "></td>";
		}
	}
	document.getElementById('prodsell').innerHTML = result;
	calculon();
	}
}

function calculon(change){
	 var temptext = ''; var eptext = ''; var checked = false;
	var buysubttl = 0; var sellsubttl = 0;
	theform.stationcost.value = setUSNumberFormat(stationcost);
	if(!isNumeric(theform.ancillarycost.value)){
		ancillarycosts = 0;
		theform.ancillarycost.value = '0';
	}
	else{
		ancillarycosts = parseInt(theform.ancillarycost.value,10);
	}
	if(theform.endproduct.length>0){
		var chosenendprod = theform.endproduct[chkRadio(theform.endproduct)].value;
	}
	else{
		var chosenendprod = false;
	}
	for(k = 0; k < warez.length; k++){
		if(stored[warez[k]].active){
			if(stored[warez[k]].leak){
				sellsubttl += stored[warez[k]].made * stored[warez[k]].sell;
				buysubttl += stored[warez[k]].used * stored[warez[k]].buy;
			}
			else if(!(chosenendprod==warez[k])){
				if((stored[warez[k]].made - stored[warez[k]].used) > 0){
					sellsubttl += (stored[warez[k]].made - stored[warez[k]].used) * stored[warez[k]].sell;
				}
				else {
					buysubttl += (stored[warez[k]].used - stored[warez[k]].made) * stored[warez[k]].buy;
				}
			}
			temptext += k + stored[warez[k]].leak +', ';
			if(warez[warez[k]].endprod){
				eptext += "  " + warez[warez[k]].name + "<input type='radio' name='endproduct' onchange='updEndProd(true)' value='" + warez[k] + "'";
				if(theform.endproduct.length>0){if(chosenendprod == warez[k]){
					eptext += " checked";
					checked = true;
				}}
				eptext += ">";
			}
		}
	}
	rph = Math.round(sellsubttl*100)/100;
	cph = Math.round(buysubttl*100)/100;
	theform.grossprofit.value = setUSNumberFormat(rph);
	theform.grossloss.value = setUSNumberFormat(cph);
	netprof = Math.round((sellsubttl - buysubttl)*100)/100
	theform.netprofit.value = setUSNumberFormat(netprof);
	theform.stationcost.value = setUSNumberFormat(stationcost);
	ttlcost = eval(stationcost+ancillarycosts+0);
	theform.totalcost.value = setUSNumberFormat(ttlcost);
	theform.stationcount.value = factorycount;
	if(netprof > 0){ theform.breakeven.value = hms(ttlcost/netprof*60); } else { theform.breakeven.value = 'never'; }
	if(sunlight == 0){ sunlight = 152; }
	temptext = "<b>End Product:</b>  None<input type='radio' value='false' name='endproduct' align='middle' onChange='updEndProd(true);'";
	if(!checked){
		temptext += " checked";
	}
	temptext += ">";
	document.getElementById('endprod').innerHTML = temptext + eptext;
	updEndProd(change);
}

function updEndProd(changed){
	var endvalue = 0; var checked = chkRadio(theform.endproduct);
	if(checked != 0){
		var chosenendprod = theform.endproduct[checked].value;
		var endprodbuyprice = parseInt(stored[chosenendprod].buy);
		var endproductmade = parseInt(stored[chosenendprod].made);
		endvalue = ttlcost /  eval(endprodbuyprice * endproductmade + netprof) * endproductmade;
		if(!endvalue | endvalue <= 0){
			document.getElementById('endresult').innerHTML = "The cost of this factory loop and required resources will always be more than buying available " + warez[theform.endproduct[checked].value].name + "s.";
		} else {
		document.getElementById('endresult').innerHTML = "The cost of this factory loop and required resources is equal to buying " + (Math.round(endvalue*100))/100 + " " + warez[theform.endproduct[checked].value].name + "s.";
		}
	} else {
		document.getElementById('endresult').innerHTML = "";
	}
	updateURL()
	if(changed){ calculon(false) }
}

function hms(time){
	var hours = 60; var days = hours * 24; var result = ''; var l = 0;
	if(time <= 0 | !time){return('');}
	else{
		if(time/days > 1){
			l = Math.round(time/days*100);
			l = (l- (l % 100))/100;
			result = l + 'd, ';
			time = time - l * days;
		}
		if(time/hours > 1) {
			l = Math.round(time/hours*100);
			l = (l - (l % 100))/100;
			result += l + 'h, ';
			time = time - l * hours;
		}
		if(time > 1){
			l = Math.round(time*100);
			l = (l - (l % 100))/100;
			result += l + 'm, ';
			time = time - l;
		}
		if(time*60 > 1){
			l = Math.round(time*6000);
			l = (l - (l % 100))/100;
			result += l + 's';
		}
	}
	return(result);
}

function chkRadio(whichradio){
	if(whichradio.length > 0){
		for(var i = 0; i < whichradio.length; i++){
			if(whichradio[i].checked){ return i}
		}
	} else {
		return 0
	}
}

function checkbuy(field,whichware){
	var msg = '';
	document.myform.debug.value = field.value + "; " + whichware + "; " + warez[whichware].min + "; " + warez[whichware].buy + "; " + warez[whichware].sell;
	if(warez[whichware].min > field.value){
		msg = "The minimum price for this ware is " + warez[whichware].min + ".";
		alert(msg);
		field.value = warez[whichware].min;
	}
	else if(warez[whichware].max < field.value){
		msg = "The maximum buy price for this ware is " + warez[whichware].max + ".";
		alert(msg);
		field.value = stored[whichware].sell;
	}
	else if(stored[whichware].sell < field.value){
		msg = "The maximum buy price for this ware must be less than or equal to the sell price of " + stored[whichware].sell + ".";
		alert(msg);
		field.value = stored[whichware].sell;
	}
	setStore();
}

function checksell(field,whichware){
	var msg = '';
	document.myform.debug.value = field.value + "; " + whichware + "; " + warez[whichware].max + "; " + warez[whichware].buy + "; " + warez[whichware].sell;
	if(warez[whichware].max < field.value){
		msg = "The maximum price for this ware is " + warez[whichware].max + ".";
		alert(msg);
		field.value = warez[whichware].max;
	}
	else if(warez[whichware].min > field.value){
		msg = "The minimum sell price for this ware is " + warez[whichware].min + ".";
		alert(msg);
		field.value = stored[whichware].buy;
	}
	else if(stored[whichware].buy > field.value){
		msg = "The minimum sell price for this ware must be more than or equal to the buy price of " + stored[whichware].buy + ".";
		alert(msg);
		field.value = stored[whichware].buy;
	}
	setStore();
}

startStore();

function startup(){
	factSelbox();
	ReadQuery();
	setFooter();
}

function factSelbox(){
	factories.sort(setSort);
	setSectors();
	var type;
	for (i = 0; i < factories.length; i++ ){
		if(type != factories[factories[i]].type){
			type = factories[factories[i]].type;
			charPad = '='.repeat(Math.floor( (25 - type.length )/ 2 ));
			facList.push([ charPad + ' ' + type + ' ' + charPad, '']);
		}
		facList.push([ factories[factories[i]].name, factories[i] ]);
	}

	theform = document.myform;
	for (i = 0; i < theform.factory.length; i++ ){
		var selbox = theform.factory[i];
		for ( j = 0; j < facList.length; j++ ){
			selbox.options[j+1] = new Option(facList[j][0], facList[j][1]);
		}
		theform.qty[i].value = 0;
		theform.test[i].value = '';
	}
}

function showPrices(e,whichware){
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	var thediv = document.getElementById('wareprices');
	thediv.style.top = posy+2+"px";
	thediv.style.left = posx+2+"px";
	thediv.innerHTML = "Min: "+warez[whichware].min+";  Avg: "+warez[whichware].avg+";  Max: "+warez[whichware].max;
	thediv.style.display = 'block';
}

function hidePrices(){
	var thediv = document.getElementById('wareprices');
	thediv.style.display = 'none';
}

function addRow(){

	var tbl = document.getElementById('formtbl');
	var tblBody = tbl.firstChild;
	var lastRow = tbl.rows.length;
	var whichRow = lastRow -1;
	var row		= tbl.insertRow(-1);
	var id		= row.insertCell(0);
	var factory	= row.insertCell(1);
	var race	= row.insertCell(2);
	var size	= row.insertCell(3);
	var qty		= row.insertCell(4);
	var yield	= row.insertCell(5);
	var cost	= row.insertCell(6);
	id.innerHTML	= lastRow + "."
	factory.innerHTML = "<select size='1' name='factory' onChange='setFactory("+whichRow+")'><option value=''>Select a factory</option></select>";
	race.innerHTML	= "<select size='1' name='race' onChange='setRace("+whichRow+")'><option value=''><---------</option></select>";
	size.innerHTML	= "<select size='1' name='size' onChange='setSize("+whichRow+")'><option value=''><--</option></select>";
	qty.innerHTML	= "<input type='text' name='qty' size='4' value='0' onChange='update()'/>";
	yield.innerHTML = "<span name='yieldspan'><input type='text' size='4' value='0' name='yield' onChange='update();' disabled/></span>";
	cost.innerHTML	= "<input type='text' name='test' size='10' disabled/>";

	var selFactory = theform.factory[whichRow];
	selFactory.options[0] = new Option('Select a factory...','');
		for ( j = 0; j < facList.length; j++ ){
			selFactory.options[j+1] = new Option(facList[j][0], facList[j][1]);
		}

}

//-------------------------------------------------------------------
// isNull(value)
//   Returns true if value is null
//-------------------------------------------------------------------
function isNull(val){return(val==null);}


//-------------------------------------------------------------------
// isBlank(value)
//   Returns true if value only contains spaces
//-------------------------------------------------------------------
function isBlank(val){
	if(val==null){return true;}
	for(var i=0;i<val.length;i++) {
		if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){return false;}
		}
	return true;
	}


//-------------------------------------------------------------------
// isInteger(value)
//   Returns true if value contains all digits
//-------------------------------------------------------------------
function isInteger(val){
	if (isBlank(val)){return false;}
	for(var i=0;i<val.length;i++){
		if(!isDigit(val.charAt(i))){return false;}
		}
	return true;
	}


//-------------------------------------------------------------------
// isNumeric(value)
//   Returns true if value contains a positive float value
//-------------------------------------------------------------------
function isNumeric(val){return(parseFloat(val,10)==(val*1));}


//-------------------------------------------------------------------
// isDigit(value)
//   Returns true if value is a 1-character digit
//-------------------------------------------------------------------
function isDigit(num) {
	if (num.length>1){return false;}
	var string="1234567890";
	if (string.indexOf(num)!=-1){return true;}
	return false;
	}


//-------------------------------------------------------------------
// updateURL()
//   Generate a unique URL for the currently configured complex & display at bottom of page.
//-------------------------------------------------------------------
function updateURL() {
	var waresList 	= [];
	var factoryList = [];

	var form = document.myform;
	var URL = window.location.href+"?";
	URL = URL.substr(0, URL.indexOf("?"));

	if ( !form.storedware ){ return; }
	for(i=0; i < form.factory.length; i++){
		var race = form.race[i].value;
		var type = form.factory[i].value;
		var size = form.size[i].value;
		var items = [];

		if(race != '' && type != '' && size !=''){
			var yield = parseInt(document.getElementsByName('yield')[i].value);
			var qty = parseInt(form.qty[i].value);
			items.push(type);
			items.push(race);
			items.push(size);
			items.push(qty);

			if ( type == 'om' | type == 'sim' | type == 'spp' | type == 'sppf' ){
				items.push(yield);
			}
			factoryList.push( items.join(",") );
		}
	}

	if( factoryList.length == 0 ) { return; }
	URL += "?factories=" + factoryList.join(";");

	for(i=0; i < form.storedware.length; i++){
		var ware = form.storedware[i].value;
		var buy  = form.storedbuy[i].value;
		var sell = form.storedsell[i].value;
		var leak = form.leak[i].checked;
		if( buy != warez[ware].buy || sell != warez[ware].sell || leak == true ) {
			waresList.push( ware +","+ buy +","+ sell +","+ leak );
		}
	}
	if( waresList.length != 0 ) {
		URL += "&wares=" + waresList.join(";");
	}
	if( form.ancillarycost.value != 0 ) {
		URL += "&ships=" + form.ancillarycost.value;
	}
	if( form.endproduct.length > 1 && form.endproduct[chkRadio(form.endproduct)].value != "false" ) {
		URL += "&endproduct=" + form.endproduct[chkRadio(form.endproduct)].value;
	}

	if(form.sunselect.value){ URL += "&sector=" + form.sunselect.value; }

	document.myform.url.value = URL;
}


//-------------------------------------------------------------------
// ReadQuery()
//   Read query string passed when page was loaded, populate station fields.
//-------------------------------------------------------------------
function ReadQuery() {
	var args = [];
	var form = document.myform;
	var query = window.location.search.substr(1, window.location.search.length);
	if(query.length < 1) {return}
	loadFromQuery = true;

	var temp = query.split("&");
	for (var i=0 ; i<temp.length; i++)
	{
		arg = temp[i].split("=");
		args[arg[0]] = arg[1];
	}

	if(args.version){
		theform.versionsel.value = args.version;
		loadVersion(version);
	}

	if( !args.factories){return}
	var facts = args.factories.split(";");
	for (var i=0 ; i<facts.length; i++)
	{
		//alert(i)
		var items = facts[i].split(",");
		if( i>15 ){	addRow(); }
		form.factory[i].value = items[0];
		setFactory(i);
		form.race[i].value = items[1];
		setRace(i);
		form.size[i].value = items[2];
		setSize(i);
		form.qty[i].value = items[3];

		if(items[0] == 'spp' | items[0] == 'sppf'){
			setYieldField(i,sppyield());
			document.getElementsByName('yield')[i].value = items[4];
		}
		else if(items[0] == 'om' | items[0] == 'sim'){
			setYieldField(i,mineyield(i));
			document.getElementsByName('yield')[i].value = items[4];
		}
	}
	loadFromQuery = false;
	update();

	if( args.wares ){
		var wares = args.wares.split(";");
		for (var i=0 ; i<wares.length; i++) {
			var items = wares[i].split(",");
			for (var j=0 ; j<form.storedware.length; j++) {
				if (form.storedware[j].value == items[0]) {
					form.storedbuy[j].value	 = items[1];
					form.storedsell[j].value = items[2];
					form.leak[j].checked	 = (items[3] == 'true');
				}
			}
		}
		setStore();
	}

	if( args.ships ) {
		form.ancillarycost.value = args.ships;
	}
	if( args.endproduct ) {
		for (var i=0 ; i<form.endproduct.length; i++) {
			if (form.endproduct[i].value == args.endproduct) {
				args.endproduct.checked == true;
			} else {
				args.endproduct.checked == false;
			}
		}
	}

	if(args.sector){
		theform.sunselect.value = args.sector;
		setSun();
	}

	calculon();
}

function highlight(field) {
	field.focus();
	field.select();
}


//-------------------------------------------------------------------
// getTinyURL()
//   Create a TinyURL with JSONP
//-------------------------------------------------------------------
function GetTinyURL(success) {
    // Create unique name for callback function:
    var ud = 'json'+(Math.random()*100).toString().replace(/\./g,''),
    	// Define API URL:
        API = 'https://json-tinyurl.appspot.com/?url=';

    // Define a new global function:
    // (which will run the passed 'success' function:
    window[ud]= function(o){ success&&success(o.tinyurl); };

    // Append new SCRIPT element to BODY with SRC of API:
    document.getElementsByTagName('body')[0].appendChild((function(){

        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = API + encodeURIComponent(document.myform.url.value) + '&callback=' + ud;
        return s;

    })());
}

//-------------------------------------------------------------------
// setUSNumberFormat()
//   Comma Separated Thousands
//-------------------------------------------------------------------
function setUSNumberFormat(theNumber){
	var sign = "";
	theNumber = theNumber * 1;
	theNumber = theNumber.toString();
	var theNumArray = theNumber.split('.');
	if(theNumber.substring(0,1) == "-"){ sign = "-"; }
	var theNumString = String(Math.abs(theNumArray[0]));
	if(theNumString.length <= 3){ return theNumber } else { var resultUS = setUSNumberFormat(theNumString.substring(0,theNumString.length-3)) + ',' + theNumString.substring(theNumString.length-3); }
	if(theNumArray[1]){
		if(theNumArray[1].length == 1){ theNumArray[1] += '0'; }
		return resultUS += '.' + theNumArray[1]
	} else { return sign + resultUS }
}

//-------------------------------------------------------------------
// setSort(a,b)
//   Sorts factory list by Type, then Name
//-------------------------------------------------------------------
function setSort(a,b){
	var x1 = factories[a].type;
	var y1 = factories[b].type;
	var x2 = factories[a].name;
	var y2 = factories[b].name;
	return ((x1 < y1 ) ? -1 : ((x1 > y1) ? 1 : (( x2 < y2 ) ? -1 : (( x2 > y2 ) ? 1 : 0 ))))

}

//-------------------------------------------------------------------
// loadScript(url, callback)
//   Dynamically 'loads' an external js file
//-------------------------------------------------------------------
function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

window.onresize = function() {
	setFooter();
}
