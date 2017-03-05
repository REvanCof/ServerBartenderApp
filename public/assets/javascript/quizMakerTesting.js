////////////////
//MENU SELECTION
////////////////

var appsWithPrice = 0;
var entsWithPrice = 0;
var numApps = 0;
var numEnts = 0;
var numSides = 0;
var numDesserts = 0;
var uniqueAppDescr = [];
var uniqueAppIngr = [];
var uniqueEntDescr = [];
var uniqueEntIngr = [];
var uniqueDesDescr = [];
var uniqueDesIngr = [];
var uniqueAllVio = [];
var vegApps = 0;
var vegEnts = 0;
var commonSauces = [];
var commonDressings = [];
var secretItems = 0;
var addOns = 0;
var popApps = 0;
var popEnts = 0;
var popDesserts = 0;

//Once user selects menu, increment all of the above variables appropriately...

//For each app, if it has a price, increment appsWithPrice
for (var i = 0; i<menuJSON[1].length; i++) {
	if (parseFloat(menuJSON[1][i].price) > 0) {
		appsWithPrice++;
	}
}

//For each ent, if it has a price, increment entsWithPrice
for (var i = 0; i<menuJSON[0].length; i++) {
	if (parseFloat(menuJSON[0][i].price) > 0) {
		entsWithPrice++;
	}
}

//For each app, increment numApps
for (var i = 0; i<menuJSON[1].length; i++) {
	numApps++;
}

//For each ent, increment numEnts
for (var i = 0; i<menuJSON[0].length; i++) {
	numEnts++;
}


//For each side, increment numSides
for (var i = 0; i<menuJSON[3].length; i++) {
	numSides++;
}


//For each dessert, increment numDesserts
for (var i = 0; i<menuJSON[2].length; i++) {
	numDesserts++;
}


//For each app, for each descriptor that's marked true, if it's not in uniqueAppDescr[], push it
for (var i = 0; i<menuJSON[1].length; i++) {
	for (var j = 0; j<menuJSON[1][i].descriptors.length; j++) {
		if ((menuJSON[0][i].descriptors.aLaCarteOrBiteSize) && (!uniqueEntDescr.includes("aLaCarteOrBiteSize"))) {uniqueEntDescr.push("aLaCarteOrBiteSize")};
		if ((menuJSON[0][i].descriptors.cheesy) && (!uniqueEntDescr.includes("cheesy"))) {uniqueEntDescr.push("cheesy")};
		if ((menuJSON[0][i].descriptors.fresh) && (!uniqueEntDescr.includes("fresh"))) {uniqueEntDescr.push("fresh")};
		if ((menuJSON[0][i].descriptors.fried) && (!uniqueEntDescr.includes("fried"))) {uniqueEntDescr.push("fried")};
		if ((menuJSON[0][i].descriptors.healthy) && (!uniqueEntDescr.includes("healthy"))) {uniqueEntDescr.push("healthy")};
		if ((menuJSON[0][i].descriptors.hearty) && (!uniqueEntDescr.includes("hearty"))) {uniqueEntDescr.push("hearty")};
		if ((menuJSON[0][i].descriptors.indulgent) && (!uniqueEntDescr.includes("indulgent"))) {uniqueEntDescr.push("indulgent")};
		if ((menuJSON[0][i].descriptors.light) && (!uniqueEntDescr.includes("light"))) {uniqueEntDescr.push("light")};
		if ((menuJSON[0][i].descriptors.plain) && (!uniqueEntDescr.includes("plain"))) {uniqueEntDescr.push("plain")};
		if ((menuJSON[0][i].descriptors.popular) && (!uniqueEntDescr.includes("popular"))) {uniqueEntDescr.push("popular")};
		if ((menuJSON[0][i].descriptors.raw) && (!uniqueEntDescr.includes("raw"))) {uniqueEntDescr.push("raw")};
		if ((menuJSON[0][i].descriptors.salty) && (!uniqueEntDescr.includes("salty"))) {uniqueEntDescr.push("salty")};
		if ((menuJSON[0][i].descriptors.servedCold) && (!uniqueEntDescr.includes("servedCold"))) {uniqueEntDescr.push("servedCold")};
		if ((menuJSON[0][i].descriptors.spicy) && (!uniqueEntDescr.includes("spicy"))) {uniqueEntDescr.push("spicy")};
		if ((menuJSON[0][i].descriptors.sweet) && (!uniqueEntDescr.includes("sweet"))) {uniqueEntDescr.push("sweet")};
		if ((menuJSON[0][i].descriptors.toShare) && (!uniqueEntDescr.includes("toShare"))) {uniqueEntDescr.push("toShare")};
		if ((menuJSON[0][i].descriptors.vegetarian) && (!uniqueEntDescr.includes("vegetarian"))) {uniqueEntDescr.push("vegetarian")};
	}
}


//For each app, for each ingredient that's marked true, if it's not in uniqueAppIngr[], push it
for (var i = 0; i<menuJSON[1].length; i++) {
	for (var j = 0; j<menuJSON[1][i].ingredients.length; j++) {
		if ((menuJSON[1][i].ingredients.beef) && (!uniqueAppIngr.includes("beef"))) {uniqueAppIngr.push("beef")};
		if ((menuJSON[1][i].ingredients.chicken) && (!uniqueAppIngr.includes("chicken"))) {uniqueAppIngr.push("chicken")};
		if ((menuJSON[1][i].ingredients.lamb) && (!uniqueAppIngr.includes("lamb"))) {uniqueAppIngr.push("lamb")};
		if ((menuJSON[1][i].ingredients.otherProtein) && (!uniqueAppIngr.includes("otherProtein"))) {uniqueAppIngr.push("otherProtein")};
		if ((menuJSON[1][i].ingredients.pork) && (!uniqueAppIngr.includes("pork"))) {uniqueAppIngr.push("pork")};
		if ((menuJSON[1][i].ingredients.seafood) && (!uniqueAppIngr.includes("seafood"))) {uniqueAppIngr.push("seafood")};
	}
}

//For each entree, for each descriptor that's marked true, if it's not in uniqueEntDescr[], push it
for (var i = 0; i<menuJSON[0].length; i++) {
	for (var j = 0; j<menuJSON[0][i].descriptors.length; j++) {
		if ((menuJSON[0][i].descriptors.aLaCarteOrBiteSize) && (!uniqueEntDescr.includes("aLaCarteOrBiteSize"))) {uniqueEntDescr.push("aLaCarteOrBiteSize")};
		if ((menuJSON[0][i].descriptors.cheesy) && (!uniqueEntDescr.includes("cheesy"))) {uniqueEntDescr.push("cheesy")};
		if ((menuJSON[0][i].descriptors.fresh) && (!uniqueEntDescr.includes("fresh"))) {uniqueEntDescr.push("fresh")};
		if ((menuJSON[0][i].descriptors.fried) && (!uniqueEntDescr.includes("fried"))) {uniqueEntDescr.push("fried")};
		if ((menuJSON[0][i].descriptors.healthy) && (!uniqueEntDescr.includes("healthy"))) {uniqueEntDescr.push("healthy")};
		if ((menuJSON[0][i].descriptors.hearty) && (!uniqueEntDescr.includes("hearty"))) {uniqueEntDescr.push("hearty")};
		if ((menuJSON[0][i].descriptors.indulgent) && (!uniqueEntDescr.includes("indulgent"))) {uniqueEntDescr.push("indulgent")};
		if ((menuJSON[0][i].descriptors.light) && (!uniqueEntDescr.includes("light"))) {uniqueEntDescr.push("light")};
		if ((menuJSON[0][i].descriptors.plain) && (!uniqueEntDescr.includes("plain"))) {uniqueEntDescr.push("plain")};
		if ((menuJSON[0][i].descriptors.popular) && (!uniqueEntDescr.includes("popular"))) {uniqueEntDescr.push("popular")};
		if ((menuJSON[0][i].descriptors.raw) && (!uniqueEntDescr.includes("raw"))) {uniqueEntDescr.push("raw")};
		if ((menuJSON[0][i].descriptors.salty) && (!uniqueEntDescr.includes("salty"))) {uniqueEntDescr.push("salty")};
		if ((menuJSON[0][i].descriptors.servedCold) && (!uniqueEntDescr.includes("servedCold"))) {uniqueEntDescr.push("servedCold")};
		if ((menuJSON[0][i].descriptors.spicy) && (!uniqueEntDescr.includes("spicy"))) {uniqueEntDescr.push("spicy")};
		if ((menuJSON[0][i].descriptors.sweet) && (!uniqueEntDescr.includes("sweet"))) {uniqueEntDescr.push("sweet")};
		if ((menuJSON[0][i].descriptors.toShare) && (!uniqueEntDescr.includes("toShare"))) {uniqueEntDescr.push("toShare")};
		if ((menuJSON[0][i].descriptors.vegetarian) && (!uniqueEntDescr.includes("vegetarian"))) {uniqueEntDescr.push("vegetarian")};
	}
}

//For each entree, for each ingredient that's marked true, if it's not in uniqueEntIngr[], push it
for (var i = 0; i<menuJSON[0].length; i++) {
	for (var j = 0; j<menuJSON[0][i].ingredients.length; j++) {
		if ((menuJSON[0][i].ingredients.beef) && (!uniqueEntIngr.includes("beef"))) {uniqueEntIngr.push("beef")};
		if ((menuJSON[0][i].ingredients.chicken) && (!uniqueEntIngr.includes("chicken"))) {uniqueEntIngr.push("chicken")};
		if ((menuJSON[0][i].ingredients.lamb) && (!uniqueEntIngr.includes("lamb"))) {uniqueEntIngr.push("lamb")};
		if ((menuJSON[0][i].ingredients.otherProtein) && (!uniqueEntIngr.includes("otherProtein"))) {uniqueEntIngr.push("otherProtein")};
		if ((menuJSON[0][i].ingredients.pork) && (!uniqueEntIngr.includes("pork"))) {uniqueEntIngr.push("pork")};
		if ((menuJSON[0][i].ingredients.seafood) && (!uniqueEntIngr.includes("seafood"))) {uniqueEntIngr.push("seafood")};
	}
}

//For each dessert, for each descriptor that's marked true, if it's not in uniqueDesDescr[], push it
for (var i = 0; i<menuJSON[2].length; i++) {
	for (var j = 0; j<menuJSON[2][i].descriptors.length; j++) {
		if ((menuJSON[2][i].descriptors.chocolatey) && (!uniqueDesDescr.includes("chocolatey"))) {uniqueDesDescr.push("chocolatey")};
		if ((menuJSON[2][i].descriptors.fruity) && (!uniqueDesDescr.includes("fruity"))) {uniqueDesDescr.push("fruity")};
		if ((menuJSON[2][i].descriptors.healthy) && (!uniqueDesDescr.includes("healthy"))) {uniqueDesDescr.push("healthy")};
		if ((menuJSON[2][i].descriptors.light) && (!uniqueDesDescr.includes("light"))) {uniqueDesDescr.push("light")};
		if ((menuJSON[2][i].descriptors.popular) && (!uniqueDesDescr.includes("healthy"))) {uniqueDesDescr.push("healthy")};
		if ((menuJSON[2][i].descriptors.rich) && (!uniqueDesDescr.includes("rich"))) {uniqueDesDescr.push("rich")};
		if ((menuJSON[2][i].descriptors.tart) && (!uniqueDesDescr.includes("tart"))) {uniqueDesDescr.push("tart")};
		if ((menuJSON[2][i].descriptors.toShare) && (!uniqueDesDescr.includes("toShare"))) {uniqueDesDescr.push("toShare")};
	}
}

//For each dessert, for each ingredient that's marked true, if it's not in uniqueDesIngr[], push it
for (var i = 0; i<menuJSON[2].length; i++) {
	for (var j = 0; j<menuJSON[2][i].ingredients.length; j++) {
		if ((menuJSON[2][i].ingredients.cake) && (!uniqueEntIngr.includes("cake"))) {uniqueEntIngr.push("cake")};
		if ((menuJSON[2][i].ingredients.pie) && (!uniqueEntIngr.includes("pie"))) {uniqueEntIngr.push("pie")};
		if ((menuJSON[2][i].ingredients.iceCream) && (!uniqueEntIngr.includes("iceCream"))) {uniqueEntIngr.push("iceCream")};
	}
}

//For each app, if the "vegetarian" descriptor is marked true, increment vegApps
for (var i = 0; i<menuJSON[1].length; i++) {
	if (menuJSON[1][i].descriptors.vegetarian) {
		vegApps++;
	}
}

//For each entree, if the "vegetarian" descriptor is marked true, increment vegEnts
for (var i = 0; i<menuJSON[0].length; i++) {
	if (menuJSON[0][i].descriptors.vegetarian) {
		vegEnts++;
	}
}

//For each addOn, increment addOns
for (var i = 0; i<menuJSON[4].length; i++) {
	addOns++;
}

//For each app, if "popular" is marked true, increment popApps
for (var i = 0; i<menuJSON[1].length; i++) {
	if (menuJSON[1][i].descriptors.popular) {
		popApps++;
	}
}

//For each entree, if "popular" is marked true, increment popEnts
for (var i = 0; i<menuJSON[0].length; i++) {
	if (menuJSON[0][i].descriptors.popular) {
		popEnts++;
	}
}

//For each dessert, if "popular" is marked true, increment popDesserts
for (var i = 0; i<menuJSON[2].length; i++) {
	if (menuJSON[2][i].descriptors.popular) {
		popDesserts++;
	}
}

//For each sauce that's marked true, if it's not in commonSauces[], push it
for (var i = 0; i<criJSON.length; i++) {
	if ((criJSON.a1) && (!commonSauces.includes("a1"))) {commonSauces.push("a1")};
	if ((criJSON.bbqSauce) && (!commonSauces.includes("bbqSauce"))) {commonSauces.push("bbqSauce")};
	if ((criJSON.cocktailSauce) && (!commonSauces.includes("cocktailSauce"))) {commonSauces.push("cocktailSauce")};
	if ((criJSON.heinz57) && (!commonSauces.includes("heinz57"))) {commonSauces.push("heinz57")};
	if ((criJSON.hotSauce) && (!commonSauces.includes("hotSauce"))) {commonSauces.push("hotSauce")};
	if ((criJSON.ketchup) && (!commonSauces.includes("ketchup"))) {commonSauces.push("ketchup")};
	if ((criJSON.marinara) && (!commonSauces.includes("marinara"))) {commonSauces.push("marinara")};
	if ((criJSON.mayonnaise) && (!commonSauces.includes("mayonnaise"))) {commonSauces.push("mayonnaise")};
	if ((criJSON.mustardSpicy) && (!commonSauces.includes("mustardSpicy"))) {commonSauces.push("mustardSpicy")};
	if ((criJSON.mustardYellow) && (!commonSauces.includes("mustardYellow"))) {commonSauces.push("mustardYellow")};
	if ((criJSON.salsa) && (!commonSauces.includes("salsa"))) {commonSauces.push("salsa")};
	if ((criJSON.soySauce) && (!commonSauces.includes("soySauce"))) {commonSauces.push("soySauce")};
}

//For each dressing that's marked true, if it's not in commonDressings[], push it
for (var i = 0; i<criJSON.length; i++) {
	if ((criJSON.balsVin) && (!commonDressings.includes("balsVin"))) {commonDressings.push("balsVin")};
	if ((criJSON.blueCheese) && (!commonDressings.includes("blueCheese"))) {commonDressings.push("blueCheese")};
	if ((criJSON.caesar) && (!commonDressings.includes("caesar"))) {commonDressings.push("caesar")};
	if ((criJSON.french) && (!commonDressings.includes("french"))) {commonDressings.push("french")};
	if ((criJSON.greek) && (!commonDressings.includes("greek"))) {commonDressings.push("greek")};
	if ((criJSON.honeyMustard) && (!commonDressings.includes("honeyMustard"))) {commonDressings.push("honeyMustard")};
	if ((criJSON.italian) && (!commonDressings.includes("italian"))) {commonDressings.push("italian")};
	if ((criJSON.oilAndVin) && (!commonDressings.includes("oilAndVin"))) {commonDressings.push("oilAndVin")};
	if ((criJSON.otherVin) && (!commonDressings.includes("otherVin"))) {commonDressings.push("otherVin")};
	if ((criJSON.ranch) && (!commonDressings.includes("ranch"))) {commonDressings.push("ranch")};
	if ((criJSON.thousandIsland) && (!commonDressings.includes("thousandIsland"))) {commonDressings.push("thousandIsland")};
}

//For every item, for each allergen that's marked true, if it's not in uniqueAllVio[], push it
//For every item, if secret is true, increment secretItems
for (var i = 0; i<menuJSON.length; i++) {
	for (var j = 0; j<menuJSON[i].length) {
		//For every item, for each allergen that's marked true, if it's not in uniqueAllVio[], push it
		if ((menuJSON[i][j].allergyViolations.eggs) && (!uniqueAllVio.includes("eggs"))) {uniqueAllVio.push("eggs")};
		if ((menuJSON[i][j].allergyViolations.fish) && (!uniqueAllVio.includes("fish"))) {uniqueAllVio.push("fish")};
		if ((menuJSON[i][j].allergyViolations.gluten) && (!uniqueAllVio.includes("gluten"))) {uniqueAllVio.push("gluten")};
		if ((menuJSON[i][j].allergyViolations.milk) && (!uniqueAllVio.includes("milk"))) {uniqueAllVio.push("milk")};
		if ((menuJSON[i][j].allergyViolations.peanuts) && (!uniqueAllVio.includes("peanuts"))) {uniqueAllVio.push("peanuts")};
		if ((menuJSON[i][j].allergyViolations.shellfish) && (!uniqueAllVio.includes("shellfish"))) {uniqueAllVio.push("shellfish")};
		if ((menuJSON[i][j].allergyViolations.soy) && (!uniqueAllVio.includes("soy"))) {uniqueAllVio.push("soy")};
		if ((menuJSON[i][j].allergyViolations.treeNuts) && (!uniqueAllVio.includes("treeNuts"))) {uniqueAllVio.push("treeNuts")};
		if ((menuJSON[i][j].allergyViolations.wheat) && (!uniqueAllVio.includes("wheat"))) {uniqueAllVio.push("wheat")};
		//For every item, if secret is true, increment secretItems
		if (menuJSON[i][j].secret) {secretItems++}
	}
}

console.log(appsWithPrice);
console.log(entsWithPrice);
console.log(numApps);
console.log(numEnts);
console.log(numSides);
console.log(numDesserts);
console.log(uniqueAppDescr);
console.log(uniqueAppIngr);
console.log(uniqueEntDescr);
console.log(uniqueEntIngr);
console.log(uniqueDesDescr);
console.log(uniqueDesIngr);
console.log(uniqueAllVio);
console.log(vegApps);
console.log(vegEnts);
console.log(commonSauces);
console.log(commonDressings);
console.log(secretItems);
console.log(addOns);
console.log(popApps);
console.log(popEnts);
console.log(popDesserts);

///////////////
//MENU ANALYSIS
///////////////

var numQ1App = 0;
var numQ1Ent = 0;
var numQ2App = 0;
var numQ2Ent = 0;
var numQ3App = 0;
var numQ3Ent = 0;
var numQ3Des = 0;
var numQ4App = 0;
var numQ4Ent = 0;
var numQ4Des = 0;
var numQ5 = 0;
var numQ6 = 0;
var numQ7App = 0;
var numQ7Ent = 0;
var numQ8 = 0;
var numQ9 = 0;
var numQ10Sauce = 0;
var numQ10Dressing = 0;

//If there are at least three apps with a price, add two to Q1App and two to Q2App
if (appsWithPrice > 3) {
	numQ1App++;
	numQ1App++;
	numQ2App++;
	numQ2App++;
}

//If there are at least three ents with a price, add two to Q1Ent and two to Q2Ent
if (entsWithPrice > 3) {
	numQ1Ent++;
	numQ1Ent++;
	numQ2Ent++;
	numQ2Ent++;
}

//If there is at least one unique ____ descriptor/ingredient and at least three ____s, add one to Q3/Q4____ for each descriptor/ingredient
if (uniqueAppDescr > 0 && numApps > 3) {
	for (var i = 0; i<uniqueAppDescr.length; i++) {
		numQ3App++;
	}
}
if (uniqueAppIngr > 0 && numApps > 3) {
	for (var i = 0; i<uniqueAppIngr.length; i++) {
		numQ4App++;
	}
}
if (uniqueEntDescr > 0 && numEnts > 3) {
	for (var i = 0; i<uniqueEntDescr.length; i++) {
		numQ3Ent++;
	}
}
if (uniqueEntIngr > 0 && numEnts > 3) {
	for (var i = 0; i<uniqueEntIngr.length; i++) {
		numQ4Ent++;
	}
}
if (uniqueDesDescr > 0 && numDesserts > 3) {
	for (var i = 0; i<uniqueDesDescr.length; i++) {
		numQ3Des++;
	}
}
if (uniqueDesIngr > 0 && numDesserts > 3) {
	for (var i = 0; i<uniqueDesIngr.length; i++) {
		numQ4Des++;
	}
}

//If there is at least one unique allergy violation, add one to Q5
if (uniqueAllVio > 0) {
	for (var i = 0; i<uniqueAllVio; i++) {
		numQ5++;
	}
}

//If there is at least one popular app/ent/side/dessert, add one/two/three/four to Q6
if (popApps>0 && numApps>3) {numQ6++}
if (popEnts>0 && numEnts>3) {numQ6++}
if (popDesserts>0 && numDesserts>3) {numQ6++}

//If there is at least one vegetarian app/ent, add one to Q7App/Ent
if (vegApps>0 && numApps>3){numQ7App++}
if (vegEnts>0 && numEnts>3){numQ7Ent++}

//If there is at least one secret item, add one to Q8
if (secretItems>0) {numQ8++}

//If there is at least one add-on, add one to Q9
if (addOns>0) {numQ9++}

//If there is at least one common sauce/dressing, add one to Q10Sauce/Dressing
if (commonSauces.length>0) {numQ10Sauce++}
if (commonDressings.length>0) {numQ10Dressing++}

////////////////////////
//QUIZ QUESTION CREATION
////////////////////////

//QuizQuestion Constructor
function QuizQuestion(question, fourAnswersArray, correctAnswersIndexesArray, qnum) {
  this.question = question;
  this.fourAnswersArray = fourAnswersArray;
  this.correctAnswersArray = correctAnswersArray;
  this.qnum = qnum;
}

//Sample QuizQuestion object is created and sent to the console
var sampleQuestion = "What is 2 + 2?";
var sampleFourAnswersArray = [22, 4, 2.2, 9000];
var sampleCorrectAnswersIndexesArray = [1];
var sampleQNum = 1;
var sampleQ = new QuizQuestion(sampleQuestion, sampleFourAnswersArray, sampleCorrectAnswersIndexesArray, sampleQNum);
// console.log(sampleQ);

//Variables for setting up quiz questions
var cheapOrExpensive = "";
var itemType "";
var canSpend = 0.01;
var descriptor = "";
var ingredient = "";
var allergicTo = "";
var sauceOrDressing = "";

var Q1Template = "What's your " + cheapOrExpensive + " " + itemType + "?";
var Q2Template = "I've only got " + canSpend + " for my " + itemType + ".  What can I get?";
var Q3Template = "I'm in the mood for a(n) " + descriptor + " " + itemType + ".  What should I get?";
var Q4Template = "I'm in the mood for a(n) " + itemType + " with " + ingredient + ".  What should I get?";
var Q5Template = "I'm allergic to " + allergicTo + ".  Which of these are okay to eat?";
var Q6Template = "What are some popular " + itemType + "s?  Select all that apply.";
var Q7Template = "Do you have any vegetarian " + itemType + "s?  Select all that apply.";
var Q8Template = "Do you have any secret items?  Select all that apply.";
var Q9Template = "Do you have any entree add-ons?  If so, how many?";
var Q10Template = "Do you have any of these common " + sauceOrDressing + "s?  Select all that apply.";

//Make all Q1App
for (var i = 0; i<numQ1App; i++) {

}

//Make all Q1Ent
for (var i = 0; i<numQ1Ent; i++) {
	
}

//Make all Q2App
for (var i = 0; i<numQ2App; i++) {
	
}

//Make all Q2Ent
for (var i = 0; i<numQ2Ent; i++) {
	
}

//Make all Q3App
for (var i = 0; i<numQ3App; i++) {
	
}

//Make all Q3Ent
for (var i = 0; i<numQ3Ent; i++) {
	
}

//Make all Q3Des
for (var i = 0; i<numQ3Des; i++) {
	
}

//Make all Q4App
for (var i = 0; i<numQ4App; i++) {
	
}

//Make all Q4Ent
for (var i = 0; i<numQ4Ent; i++) {
	
}

//Make all Q4Des
for (var i = 0; i<numQ4Des; i++) {
	
}

//Make all Q5
for (var i = 0; i<numQ5; i++) {
	
}

//Make all Q6
for (var i = 0; i<numQ6; i++) {
	
}

//Make all Q7App
for (var i = 0; i<numQ7App; i++) {
	
}

//Make all Q7Ent
for (var i = 0; i<numQ7Ent; i++) {
	
}

//Make all Q8
for (var i = 0; i<numQ8; i++) {
	
}

//Make all Q9
for (var i = 0; i<numQ9; i++) {
	
}

//Make all Q10Sauce
for (var i = 0; i<numQ10Sauce; i++) {
	
}

//Make all Q10Dressing
for (var i = 0; i<numQ10Dressing; i++) {
	
}

//Finding the number of unique types of questions available (up to 10)...
var uniqueQType = 0;
if ((numQ1App + numQ1Ent) > 0) {uniqueQType++}
if ((numQ2App + numQ2Ent) > 0) {uniqueQType++}
if ((numQ3App + numQ3Ent + numQ3Des) > 0) {uniqueQType++}
if ((numQ4App + numQ4Ent + numQ4Des) > 0) {uniqueQType++}
if (numQ5 > 0) {uniqueQType++}
if (numQ6 > 0) {uniqueQType++}
if ((numQ7App + numQ7Ent) > 0) {uniqueQType++}
if (numQ8 > 0) {uniqueQType++}
if (numQ9 > 0) {uniqueQType++}
if ((numQ10Dressing + numQ10Sauce) > 0) {uniqueQType++}

var tenQuiz = false;
var twentyQuiz = false;
var thirtyQuiz = false;

//Determining what quizzes can be made with the given menu...
var firstSixQs = numQ1App + numQ1Ent + numQ2App + numQ2Ent + numQ3App + numQ3Ent + numQ3Des + numQ4App + numQ4Ent + numQ4Des + numQ5 + numQ6;

//If 10 unique question types...
if (uniqueQType === 10) {
	tenQuiz = true;
	if (firstSixQs > 13) {
		twentyQuiz = true;
		if (firstSixQs > 23) {
			thirtyQuiz = true;
		}
	}
}

//If 9 unique question types...
if (uniqueQType === 9 && firstSixQs > 4) {
	tenQuiz = true;
	if (firstSixQs > 14) {
		twentyQuiz = true;
		if (firstSixQs > 24) {
			thirtyQuiz = true;
		}
	}
}

//If 8 unique question types...
if (uniqueQType === 8 && firstSixQs > 5) {
	tenQuiz = true;
	if (firstSixQs > 15) {
		twentyQuiz = true;
		if (firstSixQs > 25) {
			thirtyQuiz = true;
		}
	}
}

//If 7 unique question types...
if (uniqueQType === 7 && firstSixQs > 6) {
	tenQuiz = true;
	if (firstSixQs > 16) {
		twentyQuiz = true;
		if (firstSixQs > 26) {
			thirtyQuiz = true;
		}
	}
}

//If 6 unique question types...
if (uniqueQType === 6 && firstSixQs > 7) {
	tenQuiz = true;
	if (firstSixQs > 17) {
		twentyQuiz = true;
		if (firstSixQs > 27) {
			thirtyQuiz = true;
		}
	}
}

//////////////////////////
//USER SELECTS QUIZ LENGTH
//////////////////////////

if (thirtyQuiz) {
	//Message user, let them select from 10, 20, 30 qs (or cancel)
}

else if (twentyQuiz) {
	//Message user, let them select from 10, 20 qs (or cancel)
}

else if (tenQuiz) {
	//Message user, let them select 10 qs (or cancel)
}

else {
	//Tell user there isn't enough data in this menu to give a quiz.
}

//////////////////////
//CREATE SELECTED QUIZ
//////////////////////

///////////
//GIVE QUIZ
///////////

//////////////
//QUIZ RESULTS
//////////////