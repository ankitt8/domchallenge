function chessBoard(el, rows = 8, cols = 8) {

    this.el = document.querySelector(el);
    this.rows = rows;
    this.cols = cols;
    this.color = "red";
    this.activeCell = '';

    this.generateBoard();
    this.bindEvents();
}

chessBoard.prototype.generateBoard = function () {
    const fragment = document.createDocumentFragment();
    for (var i = 0; i < this.rows; ++i) {
        const row = document.createElement('div');
        row.classList.add('row');
      
        for (var j = 0; j < this.cols; ++j) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.dataset['cell'] = i + ":" + j;
            (i + j) % 2 == 0 ? col.classList.add('white') : col.classList.add('black');
            row.appendChild(col);
        }
        fragment.appendChild(row);
    }
    this.el.appendChild(fragment);
}

chessBoard.prototype.bindEvents = function () {
    this.el.addEventListener('click', e => {
        // fill that div 
        const cell = e.target.dataset['cell'];
        this.activeCell && (this.fillDiagonals(this.activeCell, null))

        this.activeCell = cell;
        cell && this.fillDiagonals(cell, this.color);
        e.stopPropagation();
    })
    document.addEventListener('click', () => {
        this.activeCell && this.fillDiagonals(this.activeCell, null);
    })
}

chessBoard.prototype.fillDiagonals = function (cell, color) {

    let [row, col] = cell.split(":");
    let left = col;
    let right = col;
    
    this.fill(cell, color);
    var i = row - 1;
   
    while(i >= 0) {
        --left;
        ++right;
        (left >= 0) && (this.fill(i + ":" + left, color)) ;
        (right < this.cols) && (this.fill(i + ":" + right, color));
        i -= 1;
    }

    row = cell.split(":")[0];
    i = (row-0) + 1;
    left = col;
    right = col;
    while(i < this.rows) {
        left -= 1;
        ++right;
        (left >= 0) && (this.fill(i + ":" + left, color)) ;
        (right < this.cols) && (this.fill(i + ":" + right, color));
        i += 1;
    }
}

chessBoard.prototype.fill = function (cell, color) {
    document.querySelector(`[data-cell = "${cell}"]`).style.background = color;
}
