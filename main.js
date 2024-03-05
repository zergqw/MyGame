 
const whereMines = [] //Запоминание координат мин
//Создание таблицы
const createField = (line, сolumn, count) => {
    const field = []; 
    for (let Line = 0; Line < line; Line++){
        field.push([])
        for (let Column = 0; Column < сolumn; Column++) {
            field[Line].push(0)
        }
    }
    for (i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * line)
        const y = Math.floor(Math.random() * сolumn)
        let check = 0;
        for (const postion of whereMines) {
            if (postion[0] === x && postion[1] === y) {
                check = 1;
            }
        }
        if (check === 0)  {
            whereMines.push([x,y])
            field[x][y] = ['M']
        } else check = 0, i--; 
    }
    return field
}
//Вывод поля
const displayField = (field) => {
    for (const line of field) {
        let a = ""
        for (const num of line){
            a += num + " "
        }
        console.log(a)
    }
  }
displayField(createField(4,4,5))