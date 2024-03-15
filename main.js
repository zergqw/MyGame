 
const readlineSync = require('readline-sync');
const whereMines = [] //Запоминание координат мин
//Создание таблицы(поля)
const createField = (line, сolumn, count) => {
    const field = []; 
    for (let Line = 0; Line < line; Line++){
        field.push([])
        for (let Column = 0; Column < сolumn; Column++) {
            field[Line].push('⬜')
        }
    }
    for (i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * line)
        const y = Math.floor(Math.random() * сolumn)
        if (checkMine(x,y) === false)  {
            whereMines.push([x+1,y+1])
        } else i--; 
    }
    return field
}
//Проверка координат на мину
const checkMine = (num1,num2) => {
    for (const position of whereMines) {
        if (position[0] === num1 && position[1] === num2) {
            return true
        }
    }
    return false;
}
//Вывод поля
const displayField = () => {
    for (const line of game) {
        let a = ""
        for (const num of line){
            a += num + " "
        }
        console.log(a)
    }
  }
//Проверка клетки
const checkCell = (x, y) => {
    if (checkMine(x,y) === false) {         
        game[x-1][y-1] = checkAdjacentMines(x,y)
        return false
    }
    game[x-1][y-1] = '💣'
    return -10000
}
//Проверка на рядом находяшихся мин
const checkAdjacentMines = (x, y , zero = 0)  => {
    let minCount = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if ((i <= Line && j <= Column) && (i !== x || j !== y) && game?.[i-1]?.[j-1] === '⬜' ) {
                if (checkMine(i,j) === true) {                 
                    minCount++;
                }
                if (zero === 1) {
                    game[i-1][j-1] = checkAdjacentMines(i, j)
                } 
            }
        }
    }
    switch(minCount){
        case 1:
            return '1️⃣ '
        case 2:
            return '2️⃣ '
        case 3:
            return '3️⃣ '
        case 4:
            return '4️⃣ '
        case 5:
            return '5️⃣ '
        case 6:
            return '6️⃣ '
        case 7:
            return '7️⃣ '
        case 8:
            return '8️⃣ '
        case 0:
            if (zero === 1) {
                return '0️⃣ '
            }
            game[x-1][y-1] = '0️⃣ '
            checkAdjacentMines(x,y, 1)
            return '0️⃣ '

    }
}
//Данные от пользователя для поля
const Line = Number(readlineSync.question('Напишите количество линий: '))
const Column = Number(readlineSync.question('Напишите количество столбцов: '))
const Mine = Number(readlineSync.question('Напишите количество мин: '))
const game = createField(Line, Column, Mine)
let exit = 0
//Сам процесс
while(exit != Mine) {
    if (exit < 0) {
        console.log('Ты проиграл!')
        for (const mine of whereMines) {
            checkCell(mine[0], mine[1])
        }
        displayField()
        break
    }
    displayField() 
    let choose = (readlineSync.question('Что хотите?\n 1 - Выбрать клетку с миной\n 2 - Выбрать пустую клетку\n 3 - Убрать флаг\n'))
    let x = Number(readlineSync.question('Выбирите линию: '))
    let y = Number(readlineSync.question('Выберите столбец: '))
    if (x > Line || y > Column || (choose !== '1' && choose !== '2' && choose !== '3') || x === ''|| y === ''){
        console.log('Ошибка!')
    } 
    else {
        switch(choose){
            case '1':
                game[x-1][y-1] = '🚩'
                break
            case '2':
                exit += checkCell(x, y)
                break
            case '3':
                game[x-1][y-1] = '⬜'
                break
        }
    }
    //Проверка поля на флаги и победу
    for (let i = 0; i < Line; i++) {
        let correct = 0 
        for (let j = 0; j < Column; j++) {
            if (checkMine(i+1, j+1) === true && game?.[i]?.[j] === '🚩') {
                correct++
            }
        }
        if (correct === Mine) {
            displayField()
            console.log('Ты выйграл!')
            exit = Mine
        }
    }
}
