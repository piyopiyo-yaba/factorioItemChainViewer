/*　【先順走査】
*　前順・先行順・前置順・行きがけ順 (英: pre-order)
*　根ノードを調査する
*　もしあれば、左の部分木を前順走査する。
*　もしあれば、右の部分木を前順走査する。
* 	{
*		nodesName: partsName,
*		nodesValue: partsNum,
*		nodesEdges: partsEdge,
*	};	
*
*/

Tree = function (tree) {

	const	{nodesName, nodesValue, nodesEdges} = tree;
	
	this.nodesName = nodesName;
	this.nodesValue = nodesValue;
	this.nodesEdges	= nodesEdges;

	this.opType = "";

};

Tree.prototype.preOrder = function (nodeIndex = 0, depth = 0, isLastSon) {

	const 	nodeEdges = this.nodesEdges[nodeIndex],
		nodeEdgesLength = nodeEdges.length,
		isLeaf = nodeEdgesLength === 0;
		
	
	let	nodeEdgesIndex,
		EdgeNodeIndex;

	this.operateInPreOrder(nodeIndex, depth, isLastSon, isLeaf);

	for (nodeEdgesIndex = 0; nodeEdgesIndex < nodeEdgesLength; nodeEdgesIndex += 1) {

		EdgeNodeIndex = nodeEdges[nodeEdgesIndex];
		this.preOrder(EdgeNodeIndex, depth + 1, nodeEdgesIndex === nodeEdgesLength - 1);		

	}		

};

Tree.prototype.operateInPreOrder = function (nodeIndex, depth, isLastSon, isLeaf) { 

	const operator = this.operateInPreOrder.opTypes[this.opType];

	if (typeof operator === "undefined") {
		throw {
			name: "Error",
			message: `${this.opType} does not exist`,
		};
	}

	operator.operate(nodeIndex, depth, isLastSon, isLeaf, this);	// bindでハマったわ。bindの動き詳しく調べなあかな。

};

Tree.prototype.operateInPreOrder.opTypes = {};

Tree.prototype.operateInPreOrder.opTypes.makeLine = (function () {

	let	text = "";
	const	DEPTH_LIMIT = 10,
		isRuledLines =  Array(DEPTH_LIMIT).fill(true),
		eraceRuledLineThisDepth = function (depth) {

			isRuledLines[depth] = false;

		},

		resetRuledLineThisDepth = function (depth, isLastSon) {		// 先順走査に依存しているのか？ほかの走査方法でもはたらくのか？

			if (! isLastSon && ! isRuledLines[depth]) isRuledLines[depth] = true;

		},

		operate = function (nodeIndex, depth, isLastSon, isLeaf, that) {	// bind(new Tree())

			resetRuledLineThisDepth(depth, isLastSon); 	//　違う枝に移ったか？　
		
			const	{nodesName, nodesValue} = that,
				fragmentText =  `【${nodesName[nodeIndex]}】 : ${nodesValue[nodeIndex]}個`;
				
			let	i,
				indent = "";

			for (i = 1; i <= depth; i += 1) {
				if (i === depth) {
					indent += isLastSon ? "\t└" : "\t├";
				} else {
					if (isRuledLines[i]) {
						indent += "\t│\t";
					} else {
						indent += " \t\t";
					}			

				}
			}

			if (isLastSon) eraceRuledLineThisDepth(depth);
			text += indent + fragmentText + "\r\n";
	
		},
			
		getText = function () {
			return text;
		},

		resetText = function () {
			text = "";
		};

	return {
		operate: operate,	
		getText: getText,
		resetText: resetText,
	};

})();
