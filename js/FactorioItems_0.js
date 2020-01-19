FactorioItems = function (configs) {
	
	this.initItems(configs);

};

FactorioItems.prototype.initItems = function (configs) {	// アイテムインスタンスをプロパティに登録する

	configs.forEach( (config) => {


		let 	itemType;
		const {name, processName, recipe, facility} = config;

// --------------------------------------------------FromAssemblingMachine (n)--------------------------------

		if ( facility === "assembling-machine-1") itemType = "FromAssemblingMachine";

// --------------------------------------------------FromAssemblingMachineTakingFluid (n)---------------------

		else if ( facility === "assembling-machine-2") itemType = "FromAssemblingMachineTakingFluid";

// --------------------------------------------------FromRefinery (n)-----------------------------------------

		else if ( facility === "oil-refinery") itemType = "FromRefinery";

// --------------------------------------------------FromChemicalPlant (n)------------------------------------

		else if ( facility === "chemical-plant") itemType = "FromChemicalPlant";

// --------------------------------------------------FromFurnace (n)------------------------------------------

		else if ( facility === "stone-furnace") itemType = "FromFurnace";

// --------------------------------------------------FromMining (n)-------------------------------------------

		else if ( name.endsWith("ore") || name === "coal" || name === "stone") itemType = "FromMining";

// --------------------------------------------------FromCentrifuge (n)---------------------------------------

		else if ( facility === "centrifuge") itemType = "FromCentrifuge";

// --------------------------------------------------FromHand (1)---------------------------------------------

		else if ( name === "fish" || name === "raw-wood") itemType = "FromHand";

// --------------------------------------------------FromPump (1)---------------------------------------------

		else if ( name === "water") itemType = "FromPump";

// --------------------------------------------------FromBoiler (1)-------------------------------------------

		else if ( name === "steam") itemType = "FromBoiler";

// --------------------------------------------------FromPumpjack (1)-----------------------------------------

		else if ( name === "crude-oil") itemType = "FromPumpjack";

// --------------------------------------------------FromRocketSilo (1)---------------------------------------

		else if ( facility === "rocket-silo") itemType = "FromRocketSilo";

// --------------------------------------------------crude-oil-barrelは無視-----------------------------------

		else if ( name === "crude-oil-barrel") return;

// --------------------------------------------------call factory---------------------------------------


		if (typeof itemType === "undefined") {
			throw {
				name: "Error",
				message: `${name} does not exist`,
			};
		}


		if (typeof this[name] !== "undefined") {

			this[name].registerProcess(config);

		} else {

			this[name] = new FactorioItem.factory(itemType, config);

		}

	});

};

// -------------------------------------------------prototype--------------------------------------------------

FactorioItems.prototype.createTree = function (userInput) {			// 明日はここから直そうね。productName_(productProcess)は....

	const	{inputProductNum, inputProductName} = userInput,		// ユーザーが選んだアイテム名と、その数
		partsName = [],				 
		partsNum = [],														
		partsEdge  = [];

	let	item = this[inputProductName],
		index = 0,
		productName,
		productNum,
		process,
		recipe;

	if(typeof item === "undefined") return console.log(inputProductName);

	partsName.push(inputProductName);		
	partsNum.push(inputProductNum);
	
	while(typeof partsName[index] !== "undefined") {			// アイテムのレシピを基に木構造を作っていく

		productName = partsName[index];
		productNum = partsNum[index];

		item = this[productName];

		if (typeof item.hasProcess !== "function") console.log(partsName[index])
		if (item.hasProcess() ) {

			process = document.getElementById(item.name);
			process = process.value

		} else process = null;

		process = item.processMap.get(process);	

		recipe = process.recipeMap;	

		item.accProductNum(productNum);

		partsEdge[index] = [];

		if (recipe === null) {
			index++;
			continue;
		}		

		recipe.forEach( (partNum, partName, recipe) => {		// Map.forEach

			let 	i = 0,
				currentPartIndex;

			partNum = productNum / process.productNum * partNum;

			partsNum.push(partNum);
			partsName.push(partName);

			currentPartIndex = partsName.length - 1;
			
			partsEdge[index].push(currentPartIndex);		//　アイテムノードの序数と材料ノードの序数を関連付けている。
			
		});

		index++;

	}

	return {
		nodesName: partsName,
		nodesValue: partsNum,
		nodesEdges: partsEdge,
	};	

}; 
