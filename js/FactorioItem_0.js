FactorioItem = function (config) {	// json.stringfyはNaNを勝手にnullにするらしい

	const {name, processName, productionTime, productNum, recipe, facility} = config;

	this.name = name;					// 製品名
	this.processName = processName;				// プロセス名
	this.productionTime = productionTime;			// 生産時間[number]
	this.productNum = productNum;				// 生産数[number]
	this.recipe = recipe !== null ? new Map(recipe) : null;	// [必要アイテム, 必要数]
	this.facility = facility;				// 生産設備

	this.totalProductNum = 0;				

};

FactorioItem.prototype.reset = function () {

	this.totalProductNum = 0;
	this.totalFacilitiesNum = 0;

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

	newItem = new FactorioItem[constr](config);

	return newItem;
	
};

// --------------------------------------------------全12種-------------------------------------------
// --------------------------------------------------FromHand (1)-----------------------------------------

FactorioItem.FromHand = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromHand.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromHand.prototype.constructor = FactorioItem.FromHand;
FactorioItem.FromHand.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromPump (1)-----------------------------------------

FactorioItem.FromPump = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromPump.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromPump.prototype.constructor = FactorioItem.FromPump;
FactorioItem.FromPump.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromBoiler (1)-----------------------------------------

FactorioItem.FromBoiler = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromBoiler.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromBoiler.prototype.constructor = FactorioItem.FromBoiler;
FactorioItem.FromBoiler.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromPumpjack (1)-----------------------------------------

FactorioItem.FromPumpjack = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromPumpjack.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromPumpjack.prototype.constructor = FactorioItem.FromPumpjack;
FactorioItem.FromPumpjack.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromRefinery (n)-----------------------------------------

FactorioItem.FromRefinery = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromRefinery.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromRefinery.prototype.constructor = FactorioItem.FromRefinery;
FactorioItem.FromRefinery.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromChemicalPlant (n)-----------------------------------------

FactorioItem.FromChemicalPlant = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromChemicalPlant.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromChemicalPlant.prototype.constructor = FactorioItem.FromChemicalPlant;
FactorioItem.FromChemicalPlant.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromMining (n)-----------------------------------------

FactorioItem.FromMining = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromMining.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromMining.prototype.constructor = FactorioItem.FromMining;
FactorioItem.FromMining.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromFurnace (n)-----------------------------------------

FactorioItem.FromFurnace = function (config) {

	FactorioItem.call(this, config);

};

FactorioItem.FromFurnace.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromFurnace.prototype.constructor = FactorioItem.FromFurnace;
FactorioItem.FromFurnace.prototype.totalFacilitiesNum = 0;

// --------------------------------------------------FromAssemblingMachine (n)-----------------------------------------

FactorioItem.FromAssemblingMachine = function (config) {

	FactorioItem.call(this, config);

};



FactorioItem.FromAssemblingMachine.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromAssemblingMachine.prototype.constructor = FactorioItem.FromAssemblingMachine;
FactorioItem.FromAssemblingMachine.totalFacilitiesNum = 0;

// --------------------------------------------------FromAssemblingMachineTakingFluid (n)-----------------------------------------

FactorioItem.FromAssemblingMachineTakingFluid = function (config) {

	FactorioItem.call(this, config);

};



FactorioItem.FromAssemblingMachineTakingFluid.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromAssemblingMachineTakingFluid.prototype.constructor = FactorioItem.FromAssemblingMachine;
FactorioItem.FromAssemblingMachineTakingFluid.totalFacilitiesNum = 0;

// --------------------------------------------------FromCentrifuge (n)-----------------------------------------

FactorioItem.FromCentrifuge = function (config) {

	FactorioItem.call(this, config);

};



FactorioItem.FromCentrifuge.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromCentrifuge.prototype.constructor = FactorioItem.FromAssemblingMachine;
FactorioItem.FromCentrifuge.totalFacilitiesNum = 0;

// --------------------------------------------------FromRocketSilo (1)-----------------------------------------

FactorioItem.FromRocketSilo = function (config) {

	FactorioItem.call(this, config);

};



FactorioItem.FromRocketSilo.prototype = Object.create(FactorioItem.prototype);
FactorioItem.FromRocketSilo.prototype.constructor = FactorioItem.FromRocketSilo;
FactorioItem.FromRocketSilo.totalFacilitiesNum = 0;
