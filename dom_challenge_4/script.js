localStorage.setItem('highestScore', 0);
function colorBoard(el, rows = 4, cols = 4) {
    this.el = document.querySelector(el);
    this.rows = rows;
    this.cols = cols;
    this.score = 0;
    this.oddColorRowIndex = getRandomInt(this.rows);
    this.oddColorColIndex = getRandomInt(this.cols);
    this.generateBoard();
    this.bindEventListeners();
    this.displayScore();
}
colorBoard.prototype.reset = function () {
    this.el.querySelectorAll('*').forEach(n => { n.remove()});
}
colorBoard.prototype.displayScore = function () {
    document.querySelector("#score").innerHTML = `Score:${this.score}`;
    document.querySelector("#highestScore").innerHTML = `Highest Score:${localStorage.getItem('highestScore')}`;
   
}
colorBoard.prototype.bindEventListeners = function () {
    this.el.addEventListener('click', (e) => {
        // console.log(e.target.dataset['cell'])
        const [rowSelected, colSelected] = e.target.dataset['cell'].split(':');
        // console.log(rowSelected, colSelected);
        if (rowSelected && (rowSelected == this.oddColorRowIndex) && (colSelected == this.oddColorColIndex)) {
           
            this.score += 1;
            let maxScore = Math.max(localStorage.getItem('highestScore'), this.score);
            localStorage.setItem('highestScore', maxScore);
            this.rows += 1;
            this.cols += 1;
            this.displayScore();
            this.reset();
            this.generateBoard();

        } else {

            this.el.classList.add('shake');
            nodeToScaleUp = document.querySelector(`[data-cell="${this.oddColorRowIndex}:${this.oddColorColIndex}"]`);
            // console.log(nodeToScaleUp);
            nodeToScaleUp.classList.add('scaleup');
            setTimeout(() => {
                nodeToScaleUp.classList.remove('scaleup');
                this.el.classList.remove('shake');
                this.score = 0;
                this.displayScore();
                this.rows = 4;
                this.cols = 4;

                this.reset();
                this.generateBoard();
            }, 800)

        }
    })
}
colorBoard.prototype.generateBoard = function () {
    // console.log(getRandomColors());
    const { color, oddColor } = getRandomColors();
    // console.log(color , oddColor);
    this.oddColorRowIndex = getRandomInt(this.rows);
    this.oddColorColIndex = getRandomInt(this.cols);
    // console.log(oddColorColIndex, oddColorRowIndex)
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < this.rows; ++i) {
        const row = document.createElement('div');
        row.classList.add('row')
        for (let j = 0; j < this.cols; ++j) {
            const col = document.createElement('div');
            col.classList.add('col');
            if (i == this.oddColorRowIndex && j == this.oddColorColIndex) col.style.backgroundColor = oddColor;
            else col.style.backgroundColor = color;
            col.dataset['cell'] = `${i}` + ":" + `${j}`;
            row.appendChild(col);
        }
        fragment.appendChild(row);

    }

    this.el.appendChild(fragment);
}
const getRandomColors = function () {
    var ratio = 0.618033988749895;

    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
new colorBoard("#colorSpotterBoard");