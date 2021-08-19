import { Injectable } from '@nestjs/common';
const reader = require('xlsx');

@Injectable()
export class UserUtils {

  constructor(){}

  parseBufferToJSON(myFile: Express.Multer.File) {
    // read uploaded excel file
    const file = reader.read(myFile.buffer);
    let users = []

    // get all sheets in the excel file
    const sheets = file.SheetNames

    // Loop through all of the sheets of the excel file
    for (let i = 0; i < sheets.length; i++) {

      // get data for the current sheet
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);

      // add data of the current sheet to the users array
      temp.forEach((res) => { users.push(res) });
    }

    // return the users array data
    return users;
  }
}
