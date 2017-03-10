var idObj = {
	jobId: 1
}

var entrees = [];
var appetizers = [];
var desserts = [];
var sides = [];
var addOns = [];
var soupsAndSalads = [];
var kidsMenuItems = [];
var otherFoods = [];
var wines = [];
var beers = [];
var cocktails = [];
var nonAlcoholicDrinks = [];
var afterDinnerDrinks = [];
var otherDrinks = [];
var allFlashCards = [];
var gotItArray = [];
var studyFurtherArray = [];
var flashcardONEARRAY = [];

var boolFood = false;
var boolDrink = false;
var boolEntrees = false;
var boolAppetizers = false;
var boolDesserts = false;
var boolSides = false;
var boolAddOns = false;
var boolSoupsAndSalads = false;
var boolKidsMenuItems = false;
var boolOtherFoods = false;
var boolWines = false;
var boolBeers = false;
var boolCocktails = false;
var boolNonAlcoholicDrinks = false;
var boolAfterDinnerDrinks = false;
var boolOtherDrinks = false;

var categoryArray = [boolEntrees, boolAppetizers, boolDesserts, boolSides, boolAddOns, boolSoupsAndSalads, boolKidsMenuItems, boolOtherFoods, boolWines, boolBeers, boolCocktails, boolNonAlcoholicDrinks, boolAfterDinnerDrinks, boolOtherDrinks];

$.post("/checkMenuJSON", idObj).then(function(data2) {
	var parsedMenuJson = JSON.parse(data2.menuJSON);
	var reParsedMenuJson = JSON.parse(parsedMenuJson);

	for (var i = 0; i<reParsedMenuJson.entree.length; i++) {
		entrees.push(reParsedMenuJson.entree[i]);
	}

	for (var i = 0; i<reParsedMenuJson.appetizer.length; i++) {
		appetizers.push(reParsedMenuJson.appetizer[i]);
	}

	for (var i = 0; i<reParsedMenuJson.dessert.length; i++) {
		desserts.push(reParsedMenuJson.dessert[i]);
	}

	for (var i = 0; i<reParsedMenuJson.sides.length; i++) {
		sides.push(reParsedMenuJson.sides[i]);
	}

	for (var i = 0; i<reParsedMenuJson.addOn.length; i++) {
		addOns.push(reParsedMenuJson.addOn[i]);
	}

	for (var i = 0; i<reParsedMenuJson.soupOrSalad.length; i++) {
		soupsAndSalads.push(reParsedMenuJson.soupOrSalad[i]);
	}

	for (var i = 0; i<reParsedMenuJson.kidsMenuItem.length; i++) {
		kidsMenuItems.push(reParsedMenuJson.kidsMenuItem[i]);
	}

	for (var i = 0; i<reParsedMenuJson.otherFood.length; i++) {
		otherFoods.push(reParsedMenuJson.otherFood[i]);
	}

	for (var i = 0; i<reParsedMenuJson.wine.length; i++) {
		wines.push(reParsedMenuJson.wine[i]);
	}

	for (var i = 0; i<reParsedMenuJson.beer.length; i++) {
		beers.push(reParsedMenuJson.beer[i]);
	}

	for (var i = 0; i<reParsedMenuJson.cocktail.length; i++) {
		cocktails.push(reParsedMenuJson.cocktail[i]);
	}

	for (var i = 0; i<reParsedMenuJson.nonAlcoholic.length; i++) {
		nonAlcoholicDrinks.push(reParsedMenuJson.nonAlcoholic[i]);
	}

	for (var i = 0; i<reParsedMenuJson.afterDinnerDrink.length; i++) {
		afterDinnerDrinks.push(reParsedMenuJson.afterDinnerDrink[i]);
	}

	for (var i = 0; i<reParsedMenuJson.otherDrink.length; i++) {
		otherDrinks.push(reParsedMenuJson.otherDrink[i]);
	}

	if (entrees.length > 0) {
		boolFood = true;
		boolEntrees = true;
	}

	if (appetizers.length > 0) {
		boolFood = true;
		boolAppetizers = true;
	}	

	if (desserts.length > 0) {
		boolFood = true;
		boolDesserts= true;
	}

	if (sides.length > 0) {
		boolFood = true;
		boolSides = true;
	}

	if (addOns.length > 0) {
		boolFood = true;
		boolAddOns = true;
	}

	if (soupsAndSalads.length > 0) {
		boolFood = true;
		boolSoupsAndSalads = true;
	}

	if (kidsMenuItems.length > 0) {
		boolFood = true;
		boolKidsMenuItems = true;
	}

	if (otherFoods.length > 0) {
		boolFood = true;
		boolOtherFoods = true;
	}

	if (wines.length > 0) {
		boolDrink = true;
		boolWines = true;
	}

	if (beers.length > 0) {
		boolDrink = true;
		boolBeers = true;
	}

	if (cocktails.length > 0) {
		boolDrink = true;
		boolCocktails = true;
	}	

	if (nonAlcoholicDrinks.length > 0) {
		boolDrink = true;
		boolNonAlcoholicDrinks = true;
	}

	if (afterDinnerDrinks.length > 0) {
		boolDrink = true;
		boolAfterDinnerDrinks = true;
	}

	if (otherDrinks.length > 0) {
		boolDrink = true;
		boolOtherDrinks = true;
	}

	var entireMenuButtonString = '<div class="col-md-12"><button onclick="entireMenu()" type="button" class="btn btn-default" id="entireMenuButton">Entire menu</button></div><br>';
	$("#area1").append(entireMenuButtonString);

	if (boolFood) {
		var allFoodButtonString = '<div class="col-md-12"><button onclick="allFood()" type="button" class="btn btn-default" id="allFoodButton">All food</button></div><br>';
		$("#area1").append(allFoodButtonString);
	}

	if (boolDrink) {
		var allDrinksButtonString = '<div class="col-md-12"><button onclick="allDrinks()" type="button" class="btn btn-default" id="Button">All drinks</button></div><br>';
		$("#area1").append(allDrinksButtonString);
	}

	var checkboxesToInclude = []
	for (var i=0; i<categoryArray.length; i++) {
		if (categoryArray[i]) {checkboxesToInclude.push(i)}
	}

	//checbkboxesToInclude[] contains all indexes for categories that need checkboxes.  0=entree, 1=appetizer, etc.
	//Make a checkbox for each index held in checkboxesToInclude[], plus a "Selected categories" button
	//The button calls selectedCategories and passes it an object with boolean values .entrees, .appetizers, etc
	var selectedCategoriesButtonString = '<div class="col-md-12"><button onclick="selectedCategories()" type="button" class="btn btn-default" id="Button">Selected categories</button></div>';
	$("#area1").append(selectedCategoriesButtonString);
});

//////////////////
//HELPER FUNCTIONS
//////////////////

function showFlashCardFront() {
	var objBeingUsed = flashcardONEARRAY[(gotItArray.length + studyFurtherArray.length)];
	var frontOfCardString = '<p>' + objBeingUsed.name + '</p><button onclick="flipCardOver()" type="button" class="btn btn-default" id="flipCardOver">Flip card over</button>';
	$("#area1").html(frontOfCardString);
}


//This is being called just fine
function flipCardOver() {
	var objBeingUsed = flashcardONEARRAY[(gotItArray.length + studyFurtherArray.length)];
	var backOfCardString = '<p>'+objBeingUsed.name+'</p><p>$'+objBeingUsed.price+'</p><p>Quick description = "'+objBeingUsed.quickDescr+'"</p><p>Detailed description = "'+objBeingUsed.detailedDescr+'"</p><button onclick="gotIt()" type="button" class="btn btn-default" id="gotIt">Got it</button><br><br><button onclick="studyFurther()" type="button" class="btn btn-default" id="studyFurther">Need to study further</button>';
	$("#area1").html(backOfCardString);
}

//These next two, however, are not.
function gotIt() {
	gotItArray.push(flashcardONEARRAY[(gotItArray.length + studyFurtherArray.length)]);
	if ((gotItArray.length + studyFurtherArray.length) < flashcardONEARRAY.length - 1) {showFlashCardFront();}
	else {statusReport(gotItArray, studyFurtherArray);}
}

function studyFurther() {
	studyFurtherArray.push(flashcardONEARRAY[(gotItArray.length + studyFurtherArray.length)]);
	if ((gotItArray.length + studyFurtherArray.length) < flashcardONEARRAY.length -1) {showFlashCardFront();}
	else {statusReport(gotItArray, studyFurtherArray);}
}

function keepStudying() {
	studyFurtherArray = [];

	//Remove from flashcardONEARRAY any item that is in gotItArray, then empty gotItArray
	for (var i = 0; i<gotItArray.length; i++) {
		if (flashcardONEARRAY.includes(gotItArray[i])) {
			for (var j = 0; j<flashcardONEARRAY.length; j++) {
				if (flashcardONEARRAY[j] === gotItArray[i]) {
					flashcardONEARRAY.splice(j, 1);
				}
			}
		}
	}
	gotItArray = [];
	$("#area2").html("Studying further...");

	showFlashCardFront();
}

function statusReport(gotItArray, studyFurtherArray) {
	$("#area1").html("STATUS REPORT:<br><br>");

	$("#area1").append("These are the items you knew:<br>");
	for (var i = 0; i<gotItArray.length; i++) {
		$("#area1").append(gotItArray[i].name);
		$("#area1").append("<br>");
	}

	$("#area1").append("<br>These are the items you need to study further:<br>");
	for (var i = 0; i<studyFurtherArray.length; i++) {
		$("#area1").append(studyFurtherArray[i].name);
		$("#area1").append("<br>");
	}

	//See if there are any cards left to study
	if (studyFurtherArray.length < 1) {
		$("#area2").html("All flash cards complete!<br><br>");
	}
	else {
		var keepStudyingButtonString = '<div class="col-md-12"><button onclick="keepStudying()" type="button" class="btn btn-default" id="keepStudyingButton">Study these items further</button></div><br><br>';
		$("#area2").html(keepStudyingButtonString);
	}

	var entireMenuButtonString = '<div class="col-md-12"><button onclick="entireMenu()" type="button" class="btn btn-default" id="entireMenuButton">Entire menu</button></div>';
	$("#area2").append(entireMenuButtonString);

	if (boolFood) {
		var allFoodButtonString = '<div class="col-md-12"><button onclick="allFood()" type="button" class="btn btn-default" id="allFoodButton">All food</button></div>';
		$("#area2").append(allFoodButtonString);
	}

	if (boolDrink) {
		var allDrinksButtonString = '<div class="col-md-12"><button onclick="allDrinks()" type="button" class="btn btn-default" id="Button">All drinks</button></div>';
		$("#area2").append(allDrinksButtonString);
	}

	var checkboxesToInclude = []
	for (var i=0; i<categoryArray.length; i++) {
		if (categoryArray[i]) {checkboxesToInclude.push(i)}
	}

	//checbkboxesToInclude[] contains all indexes for categories that need checkboxes.  0=entree, 1=appetizer, etc.
	//Make a checkbox for each index held in checkboxesToInclude[], plus a "Selected categories" button
	//The button calls selectedCategories and passes it an object with boolean values .entrees, .appetizers, etc
	var selectedCategoriesButtonString = '<div class="col-md-12"><button onclick="selectedCategories()" type="button" class="btn btn-default" id="Button">Selected categories</button></div>';
	$("#area2").append(selectedCategoriesButtonString);
	
}

function entireMenu() {
	$("#area1").html("<div></div>");
	$("#area2").html("<div></div>");
	allFlashCards = [];
	flashcardONEARRAY = [];
	gotItArray = [];
	studyFurtherArray = [];
	if (entrees.length > 0) {allFlashCards.push(entrees);};
	if (appetizers.length > 0) {allFlashCards.push(appetizers);}
	if (desserts.length > 0) {allFlashCards.push(desserts);}
	if (sides.length > 0) {allFlashCards.push(sides);}
	if (addOns.length > 0) {allFlashCards.push(addOns);}
	if (soupsAndSalads.length > 0) {allFlashCards.push(soupsAndSalads);}
	if (kidsMenuItems.length > 0) {allFlashCards.push(kidsMenuItems);}
	if (otherFoods.length > 0) {allFlashCards.push(otherFoods);}
	if (wines.length > 0) {allFlashCards.push(wines);}
	if (beers.length > 0) {allFlashCards.push(beers);}
	if (cocktails.length > 0) {allFlashCards.push(cocktails);}
	if (nonAlcoholicDrinks.length > 0) {allFlashCards.push(nonAlcoholicDrinks);}
	if (afterDinnerDrinks.length > 0) {allFlashCards.push(afterDinnerDrinks);}
	if (otherDrinks.length > 0) {allFlashCards.push(otherDrinks);}
	shuffle(allFlashCards);
	for (var i = 0; i<allFlashCards.length; i++) {
		for (var j = 0; j<allFlashCards[i].length; j++) {
			flashcardONEARRAY.push(allFlashCards[i][j]);
		}
	}
	showFlashCardFront();
}

function allFood() {
	$("#area1").html("<div></div>");
	$("#area2").html("<div></div>");
	allFlashCards = [];
	flashcardONEARRAY = [];
	gotItArray = [];
	studyFurtherArray = [];
	if (entrees.length > 0) {allFlashCards.push(entrees);};
	if (appetizers.length > 0) {allFlashCards.push(appetizers);}
	if (desserts.length > 0) {allFlashCards.push(desserts);}
	if (sides.length > 0) {allFlashCards.push(sides);}
	if (addOns.length > 0) {allFlashCards.push(addOns);}
	if (soupsAndSalads.length > 0) {allFlashCards.push(soupsAndSalads);}
	if (kidsMenuItems.length > 0) {allFlashCards.push(kidsMenuItems);}
	if (otherFoods.length > 0) {allFlashCards.push(otherFoods);}
	shuffle(allFlashCards);
	for (var i = 0; i<allFlashCards.length; i++) {
		for (var j = 0; j<allFlashCards[i].length; j++) {
			flashcardONEARRAY.push(allFlashCards[i][j]);
		}
	}
	showFlashCardFront();
}

function allDrinks() {
	$("#area1").html("<div></div>");
	$("#area2").html("<div></div>");
	allFlashCards = [];
	flashcardONEARRAY = [];
	gotItArray = [];
	studyFurtherArray = [];
	if (wines.length > 0) {allFlashCards.push(wines);}
	if (beers.length > 0) {allFlashCards.push(beers);}
	if (cocktails.length > 0) {allFlashCards.push(cocktails);}
	if (nonAlcoholicDrinks.length > 0) {allFlashCards.push(nonAlcoholicDrinks);}
	if (afterDinnerDrinks.length > 0) {allFlashCards.push(afterDinnerDrinks);}
	if (otherDrinks.length > 0) {allFlashCards.push(otherDrinks);}
	shuffle(allFlashCards);
	for (var i = 0; i<allFlashCards.length; i++) {
		for (var j = 0; j<allFlashCards[i].length; j++) {
			flashcardONEARRAY.push(allFlashCards[i][j]);
		}
	}
	showFlashCardFront();
}

function selectedCategories(obj) {
	$("#area1").html("<div></div>");
	$("#area2").html("<div></div>");
	allFlashCards = [];
	flashcardONEARRAY = [];
	gotItArray = [];
	studyFurtherArray = [];
	if (entrees.length > 0 && obj.entrees) {allFlashCards.push(entrees);};
	if (appetizers.length > 0 && obj.appetizers) {allFlashCards.push(appetizers);}
	if (desserts.length > 0 && obj.desserts) {allFlashCards.push(desserts);}
	if (sides.length > 0 && obj.sides) {allFlashCards.push(sides);}
	if (addOns.length > 0 && obj.addOns) {allFlashCards.push(addOns);}
	if (soupsAndSalads.length > 0 && obj.soupsAndSalads) {allFlashCards.push(soupsAndSalads);}
	if (kidsMenuItems.length > 0 && obj.kidsMenuItems) {allFlashCards.push(kidsMenuItems);}
	if (otherFoods.length > 0 && obj.otherFoods) {allFlashCards.push(otherFoods);}
	if (wines.length > 0 && obj.wines) {allFlashCards.push(wines);}
	if (beers.length > 0 && obj.beers) {allFlashCards.push(beers);}
	if (cocktails.length > 0 && obj.cocktails) {allFlashCards.push(cocktails);}
	if (nonAlcoholicDrinks.length > 0 && obj.nonAlcoholicDrinks) {allFlashCards.push(nonAlcoholicDrinks);}
	if (afterDinnerDrinks.length > 0 && obj.afterDinnerDrinks) {allFlashCards.push(afterDinnerDrinks);}
	if (otherDrinks.length > 0 && obj.otherDrinks) {allFlashCards.push(otherDrinks);}
	shuffle(allFlashCards);
	for (var i = 0; i<allFlashCards.length; i++) {
		for (var j = 0; j<allFlashCards[i].length; j++) {
			flashcardONEARRAY.push(allFlashCards[i][j]);
		}
	}
	showFlashCardFront();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}