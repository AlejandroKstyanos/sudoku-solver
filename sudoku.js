// Elementos HTML como objetos jQuery
const $btnResolver = $('#btnResolver');  // Objeto jQuery que representa al elemento input button 

// Handling del evento click del button.
$btnResolver.on('click', function(e) {
    e.preventDefault();  // Evita el evento submit.
    const tableroSudoku = obtenerTableroSudoku();
    console.log(tableroSudoku);
    console.log(JSON.stringify(tableroSudoku))
    // TODO: Enviar el tablero mediante llamada AJAX, esperar la respuesta -> mostrar la respuesta.

    const tableroJSON = JSON.stringify(tableroSudoku);

    $.ajax({
        method: "POST",
        url: "./Sudoku.php",
        data: {
            sudoku: tableroJSON// Array of arrays
        }
    }).done(function(response){
        for (i = 0; i < 9; i++){
            const tr = document.createElement('tr');
            for (j = 0; j < 9; j++){
                const td = document.createElement('td');
                td.textContent = response[i][j];
                tr.appendChild(td);
            }
            datosTbody.appendChild(tr);
            }
    })
});

/**
 * Obtiene el tablero del sudoku como una matriz (array de arrays)
 * @returns La matriz del tablero del sudoku.
 */
function obtenerTableroSudoku() {
    const tableroSudoku = [];
    for (let r = 0; r < 9; r++) {
        const row = [];
        for (let c = 0; c < 9; c++) {
            row.push(valorMatrix(r, c));
        }
        tableroSudoku.push(row);
    }
    return tableroSudoku;
}

/**
 * Convierte un string a int, en caso de no poderse convertir, regresa null.
 * @param {string} s Valor en string a convertir a número entero.
 * @returns El string en número int
 */
function numeroONull(s) {
    const v = parseInt(s);
    return isNaN(v) ? null : v;
}

/**
 * Obtiene el valor del input que corresponde al tablero de la matriz del tablero.
 * @param {int} r Index del row de la matriz a obtener el valor
 * @param {int} c Index del column de la matríz a obtener el valor.
 * @returns String del valor del input.
 */
function valorMatrix(r, c) {
    return numeroONull($(`#txtN_${r}_${c}`).val());
}
