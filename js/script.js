/*------------Model----------*/
var catNameArray = new Array();
catNameArray = [
	"Apple",
	"Banana",
	"Cherry",
	"Durian",
	"Egg",
];

var ClickNumArray = new Array();
ClickNumArray = [
	0,
	0,
	0,
	0,
	0,
]; 

var model = {
	currentCat : 0,
};
var adminModel = {
	showStatus : false,
};
/*------------------------------*/

/*------------章魚區-------------------*/
//添加列表

for(var i = 0; i < catNameArray.length; i++)
{
	(function (index) {
		var ul = document.getElementById("cat-menu");
		//添加 li
		var li = document.createElement("li");
		//设置 li 属性
		var a = document.createElement("a");
		var catId = "cat-" + index;
		//a.href = "javascript:void()";
		a.innerHTML=catNameArray[i];
		li.setAttribute("id", catId);
		li.setAttribute("onclick", "changeCat(this)");
		li.appendChild(a);
		ul.appendChild(li);
	}(i));
}

//根據選擇，更改貓
function changeCat(e) {
	tagName = e.id;
	tagNum = tagName.slice(-1);
	//設置名字
	var $catName = $('.cat-name');
	var $catChange = $catName.next('img');
	model.currentCat = tagNum;
	renderCat($catChange , tagNum);
	changeName($catName , tagNum);
	adminView.showNumber(ClickNumArray[model.currentCat]);
}

//點擊貓的計數
function catClick(e) {
	var tag = e;
	var tagNum = tag.slice(4,5);
	var element = $('#'+e);
	var ptag = element.next('p');
	switch (tag)
	{
		case 'cat-0p':
			ClickNumArray[0] += 1;
			break;
		case 'cat-1p':
			ClickNumArray[1] += 1;
			break;
		case 'cat-2p':
			ClickNumArray[2] += 1;
			break;
		case 'cat-3p':
			ClickNumArray[3] += 1;
			break;
		case 'cat-4p':
			ClickNumArray[4] +=1;
			break;	
	}
	counter(ptag,tagNum);
}

function adminClick() {
	if(adminModel.showStatus === false) {	
		adminView.showIt();
		adminView.showNumber(ClickNumArray[model.currentCat]);
		adminModel.showStatus = true;
	}
	else {
		adminView.hideIt();
		adminModel.showStatus = false;
	}
}

function adminSave() {
	var tempName = $("#change-name").val();
	var tempNum = $("#change-number").val();
	var $catName = $('.cat-name');
	var $catChange = $catName.next('img');
	var catId = "cat-" + model.currentCat;
	var a = document.getElementById(catId);
	if(tempName !== "")
	{
		catNameArray[model.currentCat] = tempName;
		changeName($catName , model.currentCat);
		changeList(a.firstChild , tempName);
	}

	if(tempNum !== "")
	{
		ClickNumArray[model.currentCat] = parseInt(tempNum);
		renderCat($catChange, model.currentCat);
	}
	adminreset();
	adminCancel();
}

function adminCancel() {
	adminreset();
	adminClick();
}

function adminreset() {
	$("#change-name").val("");
	$("#change-number").val("");
}
/*------------View-----------*/
function changeList(a , name) {
	a.innerHTML = name;
}

function changeName(id , num) {
	id.text(catNameArray[num]);
}

function renderCat(id , num) {
	id.attr('id','cat-' + num + 'p');
	id.attr('src','img/cat' + num + '.jpg');
	id.next('p').text("Number of Clicks : " + ClickNumArray[num]);
}

function counter(id , num) {
	id.text("Number of Clicks : " + ClickNumArray[num]);
}

var adminView = {
	showIt : function() {
		$("#admin-function").show();
	},

	hideIt : function() {
		$("#admin-function").hide();
	},

	showNumber : function(num) {
		$("#change-number").attr('placeholder' , num);
	}
};

adminView.hideIt();
/*$('#cat-0').click(function() {
	catClick($(this));
});*/



//$(this).attr('id')