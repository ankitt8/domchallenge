function PixelBoard(el, rows, cols) {
    this.el = document.querySelector(el);
    this.rows = rows;
    this.cols = cols;
    this.activeColor = "#000";
    this.generatePixelBoard();
    this.addColorPickerRow();
    this.bindEvents();

}

PixelBoard.prototype.generatePixelBoard = function () {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < this.rows; ++i) {
        const row = document.createElement('div');
        row.classList.add('row')
        for (let j = 0; j < this.cols; ++j) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.dataset['cell'] = `${i}` + ":" + `${j}`;
            row.appendChild(col);
        }
        fragment.appendChild(row);

    }
   
    this.el.appendChild(fragment);
}
PixelBoard.prototype.addColorPickerRow = function() {
    const row = document.createElement('div');
    row.classList.add('row')
   
    for (let j = 0; j < this.cols; ++j) {
        const color =  getRandomColor();
        const col = document.createElement('div');
        col.classList.add('col');
        col.dataset['color'] = color;
        col.style.backgroundColor = color;
        row.appendChild(col);
    }
    this.el.appendChild(row);
}
PixelBoard.prototype.bindEvents = function () {
    this.el.addEventListener('click', e => {
        const color =  e.target.dataset['color'];
        const cell =  e.target.dataset['cell'];
        cell && (e.target.style.backgroundColor = this.activeColor);
        color && (this.activeColor = color)
    })
}
new PixelBoard("#pixelBoard", 10, 10)

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}