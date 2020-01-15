FactorioItem = function (config) {	// json.stringfyはNaNを勝手にnullにするらしい

	const {name, productionTime, productNum, recipe} = config;

	this.name = name;					// 製品名
	this.productionTime = productionTime;			// 生産時間[number]
	this.productNum = productNum;				// 生産数[number]
	this.recipe = recipe !== null ? new Map(recipe) : null;	// [必要アイテム, 必要数]

	this.totalProductNum = 0;				

};

FactorioItem.prototype.reset = function () {

	this.totalProductNum = 0;

};

FactorioItem.prototype.calcPartNum = function(productNum, partNum) {
	
	const	productRatio = productNum / this.productNum;

	return	productRatio * partNum;

};

FactorioItem.prototype.recipeForEach = function(callback) {

	if (! this.recipe) return;

	this.recipe.forEach(callback);

};

FactorioItem.prototype.accProductNum = function (productNum) { 

	this.totalProductNum += productNum;

};

FactorioItem.factory = function (type, config) {

	const	constr = type;

	let	newItem;

	if (typeof FactorioItem[constr] !== "function") {
		throw {
			name: "Error",
			message: `${constr} does not exist`,
		};
	}

	newItem = new FactorioItem["constr"](config);

	return newItem;
	
};

// --------------------------------------------------FromHand-----------------------------------------

FactorioItem.FromHand = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromHand.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromHand.prototype.constructor = FactorioItem.FromHand;

// --------------------------------------------------FromPump-----------------------------------------

FactorioItem.FromPump = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromPump.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromPump.prototype.constructor = FactorioItem.FromPump;

// --------------------------------------------------FromBoiler-----------------------------------------

FactorioItem.FromBoiler = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromBoiler.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromBoiler.prototype.constructor = FactorioItem.FromBoiler;

// --------------------------------------------------FromPumpjack-----------------------------------------

FactorioItem.FromPumpjack = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromPumpjack.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromPumpjack.prototype.constructor = FactorioItem.FromPumpjack;

// --------------------------------------------------FromRefinery-----------------------------------------

FactorioItem.FromRefinery = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromRefinery.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromRefinery.prototype.constructor = FactorioItem.FromRefinery;

// --------------------------------------------------FromChemicalPlant-----------------------------------------

FactorioItem.FromChemicalPlant = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromChemicalPlant.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromChemicalPlant.prototype.constructor = FactorioItem.FromChemicalPlant;

// --------------------------------------------------FromMining-----------------------------------------

FactorioItem.FromMining = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromMining.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromMining.prototype.constructor = FactorioItem.FromMining;

// --------------------------------------------------FromFurnace-----------------------------------------

FactorioItem.FromFurnace = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromFurnace.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromFurnace.prototype.constructor = FactorioItem.FromFurnace;

// --------------------------------------------------FromAssemblingMachine-----------------------------------------

FactorioItem.FromAssemblingMachine = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromAssemblingMachine.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromAssemblingMachine.prototype.constructor = FactorioItem.FromAssemblingMachine;

