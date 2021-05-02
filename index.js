var screenWidth = window.innerWidth
var screenHeight = window.innerHeight

var periodicTable = new ChemDoodle.PeriodicTableCanvas('pt', screenWidth/25);

const list1 = [1, 3, 11, 19, 37, 55, 87];
const list2 = [4, 12, 20, 38, 56, 88];
const list3 = [21, 39, 57, 89];
const list4 = [22, 40, 72, 104];
const list4 = [23, 41, 73, 105];
const list4 = [24, 42, 74, 106];
const list5 = [25, 43, 75, 107];
const list6 = [26, 44, 76, 108];

/*var group_1 = periodicTable.cells.filter(function(atom){
	return list_1.includes(atom.element.atomicNumber);
});*/

console.log(periodicTable);
console.log(periodicTable.cells);
console.log(periodicTable.cells[0].element);
console.log(periodicTable.cells[0].element.name);

	/* Cursor coordinates*/
function getPosition(e){
	let x = y = 0;
	if (!e) {
		let e = window.event;
	}
	if (e.pageX || e.pageY){
		x = e.pageX;
		y = e.pageY;
	} else if (e.clientX || e.clientY){
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {x: x, y: y};
}

	/* Floating Tooltips */	
periodicTable.click = function(evt){
	if(this.hovered!=null){
		let coord = getPosition(window.event);
		let e = this.getHoveredElement();
		console.log(e);
		var tooltip = document.getElementById("popup");
		var popup = document.getElementById("myPopup");
		popup.innerHTML = "";
		popup.innerHTML += `Element: ${e.name}<br />\
							Symbol: ${e.symbol}<br />\
							Atomic Number: ${e.atomicNumber}<br />\
							Covalent Radius: ${e.covalentRadius}<br />\
							vdW Radius: ${e.vdWRadius}`;
		popup.classList.toggle("show");
		tooltip.style.left = `${coord.x}px`;
		tooltip.style.top = `${coord.y}px`;

		/* Debug */
		/* let coord_list = [];
		coord_list.push(coord.x + '\n');
		coord_list.push(coord.y + '\n');
		coord_list.push(tooltip.style.left + '\n');
		coord_list.push(tooltip.style.top + '\n');
		console.log(tooltip.style.left) */
	}
}

periodicTable.drawCell = function(ctx, specs, cell){
	// if hovered, then show a red background
	if(this.hovered==cell){
	ctx.fillStyle='#c10000';
	ctx.fillRect(cell.x, cell.y, cell.dimension, cell.dimension);
	}
	if(list_1.includes(cell.element.atomicNumber)){
		ctx.fillStyle='yellow';
		ctx.fillRect(cell.x, cell.y, cell.dimension, cell.dimension);
	}
	// draw the main cells
	ctx.strokeStyle='black';
	ctx.strokeRect(cell.x, cell.y, cell.dimension, cell.dimension);

	// symbol
	ctx.font = 'bold 24px FreeMono';
	ctx.fillStyle='black';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	ctx.fillText(cell.element.symbol, cell.x+cell.dimension/20, cell.y+cell.dimension/4);
	// name
	ctx.font = 'bold 9px FreeMono';
	ctx.fillText(cell.element.name, cell.x+cell.dimension/20, cell.y+cell.dimension/1.8);
	ctx.font = 'bold 12px FreeMono';
	// atomic mass
	ctx.fillText(`${cell.element.mass} a.e.m.`, cell.x+cell.dimension/20, cell.y+cell.dimension/1.3);
	// atomic number
	ctx.font = 'bold 14px FreeMono';
	ctx.textAlign = 'right';
	ctx.fillText(cell.element.atomicNumber, cell.x+cell.dimension/1.1, cell.y+cell.dimension/5);
}
periodicTable.repaint();