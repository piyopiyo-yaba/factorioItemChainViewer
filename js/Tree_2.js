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

// -----------------------------------------preOrder--------------------------------------------------------------------

Tree.prototype.preOrder = function (nodeIndex = 0, depth = 0, isLastSon) {

	const 	nodeEdges = this.nodesEdges[nodeIndex],
		nodeEdgesLength = nodeEdges.length,
		isLeaf = nodeEdgesLength === 0;
		
	
	let	nodeEdgesIndex,
		edgeNodeIndex;

	this.operateInPreOrder(nodeIndex, depth, isLastSon, isLeaf);

	for (nodeEdgesIndex = 0; nodeEdgesIndex < nodeEdgesLength; nodeEdgesIndex += 1) {

		edgeNodeIndex = nodeEdges[nodeEdgesIndex];
		this.preOrder(edgeNodeIndex, depth + 1, nodeEdgesIndex === nodeEdgesLength - 1);		

	}		

};

// -----------------------------------------operateInPreOrder--------------------------------------------------------------------

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

			if (! isRuledLines[depth]) isRuledLines[depth] = true;

		},

		makeIndent = function (depth, isLastSon) {

			let	i,
				indent = "";

			for (i = 1; i <= depth; i += 1) {
				if (i === depth) indent += isLastSon ? "\t└" : "\t├";
				else indent += isRuledLines[i] ? "\t│\t" : " \t\t";
			}

			return indent;

		},

		operate = function (nodeIndex, depth, isLastSon, isLeaf, that) {	// bind(new Tree())

			resetRuledLineThisDepth(depth, isLastSon); 	//　違う枝に移ったか？　
		
			const	{nodesName, nodesValue} = that,
				fragmentText =  `【${nodesName[nodeIndex]}】 : ${nodesValue[nodeIndex]}個`,
				indent = makeIndent(depth, isLastSon);
			
			if (isLastSon) eraceRuledLineThisDepth(depth);
			text += indent + fragmentText + "\r\n";
	
		},
			
		setResult = function (el) {
			el.textContent = text;
		},

		resetText = function (el) {
			text = "";
			el.textContent = text;
		};

	return {
		operate: operate,	
		setResult: setResult,
		resetText: resetText,
	};

})();

Tree.prototype.operateInPreOrder.opTypes.makeHTMLFragment = (function () {
	let	rootFragment = document.createElement("div");		// この下に作った要素をくっつけていく	
	
	rootFragment.setAttribute("id", "root");

	const	
	
	DEPTH_LIMIT = 10,

	isRuledLines =  Array(DEPTH_LIMIT).fill(true),
	
	eraceRuledLineThisDepth = function (depth) {

		isRuledLines[depth] = false;

	},

	resetRuledLineThisDepth = function (depth, isLastSon) {		// 先順走査に依存しているのか？ほかの走査方法でもはたらくのか？

		if (! isRuledLines[depth]) isRuledLines[depth] = true;

	},

	makeIndent = function (depth, isLastSon) {

			let	i,
				indent = "";

			for (i = 1; i <= depth; i += 1) {
				if (i === depth) indent += isLastSon ? "\t└" : "\t├";
				else indent += isRuledLines[i] ? "\t│\t" : " \t\t";
			}

			return indent;

	},

	searchMyParent = function (parentDepth) {

		let	depth,
			parentElement = rootFragment;

		for (depth = 0; depth <= parentDepth; depth += 1) {
			parentElement = parentElement.lastChild;			
		}	
		
		return	parentElement;

	},
	
	createText = function (nodeIndex, tree) {

		const	{nodesName, nodesValue} = tree,
			text =  `【${nodesName[nodeIndex]}】 : ${nodesValue[nodeIndex]}個`;
					
		return	text;
	
	},

	onClickHandler = function (e) {
		
		e.stopPropagation();

		const divs = event.currentTarget.querySelectorAll("div");

		Object.values(divs).forEach( (el) => {
			const className = el.getAttribute("class");

			if (className === "noDisplay") el.setAttribute("class", "display");
			else el.setAttribute("class", "noDisplay");
		});

	}
	operate = function (nodeIndex, depth, isLastSon, isLeaf, that) {	// bind(new Tree())

		resetRuledLineThisDepth(depth, isLastSon);

		const	parentDepth = depth - 1,
			myParent = searchMyParent(parentDepth),
			div = document.createElement("div"),
			span = document.createElement("span"),
			indent = makeIndent(depth, isLastSon);		
			text = createText(nodeIndex, that);

		span.innerText = indent + text;
		div.appendChild(span);
		div.setAttribute("class", "display");
		div.onclick = onClickHandler;
		myParent.appendChild(div);

		if (isLastSon) eraceRuledLineThisDepth(depth);

	},

	setResult = function (el) {
		el.appendChild(rootFragment);
	},

	resetText = function (el) {
		if (document.getElementById("root") ) {
			el.removeChild(rootFragment);
			rootFragment = document.createElement("div");
			rootFragment.setAttribute("id", "root");
		}
	};

	return {
		operate: operate,	
		setResult: setResult,
		resetText: resetText,
	};


})();
