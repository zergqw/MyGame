 
const createField = (line, сolumn) => {
    const field = [[]]; 
    for (i = 0; i < сolumn; i++) {
        field[0].push(0)
    }
    for (i = 0; i < line-1; i++){
        field.push(field[0])
    }
    return field
}
const displayField1 = (field) => {
    for (var i = 0; i < field.length; i++) {
      var line = "";
      for (var j = 0; j < field[i].length; j++) {
        if (field[i][j] === -1) {
          line += "* ";
        } else {
          line += field[i][j] + " ";
        }
      }
      console.log(line);
    }
  }

const displayField = (field) => {
    let a = ""
    for (const line of field) {
        for (const num of line){
            a += num + " "
        }
    }
    console.log(a)
  }

displayField(createField(10,10))