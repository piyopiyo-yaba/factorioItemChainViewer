FactorioItems = function (configs) {
	
	this.initItems(configs);

};

FactorioItems.prototype.initItems = function (configs) {

	configs.forEach( (config) => {

		const {name, recipe} = config;

		if (! name) return;
		if (typeof this[name] !== "undefined") {
			return;
		}

		this[name] = new FactorioItem(config);

	});

};

FactorioItems.prototype.createTree = function (userInput) {

	const	{inputProductNum, inputProductName} = userInput,
		partsName = [],
		partsNum = [],
		partsEdge  = [];

	let	item = this[inputProductName],
		index = 0,
		productName,
		productNum;

	if(typeof item === "undefined") return console.log(inputProductName);

	partsName.push(inputProductName);		
	partsNum.push(inputProductNum);
	
	while(typeof partsName[index] !== "undefined") {

		productName = partsName[index];
		productNum = partsNum[index];

		item = this[productName];
		item.accProductNum(productNum);

		partsEdge[index] = [];

		item.recipeForEach( (partNum, partName, recipe) => {		// Map.forEach

			let currentPartIndex;

			partNum = item.calcPartNum(productNum, partNum);

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