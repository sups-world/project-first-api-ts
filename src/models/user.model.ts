// blueprint of class is an interface that has types only..not the operations
import { UserInfo } from '../interface/user.interface';
// extends used for classes, implements used for interfaces
const data: Array<UserInfo> = [];

function uniqueId() {
  return Math.floor(Math.random() * Date.now());
}
export class User {
  //METHODS
  static addUsers(name1: string, email1: string, password1: string) {
    // check if email is unique against private data
    const found = data.findIndex(a => email1 === a.email);
    if (found === -1) {
      //generate unique id
      const id1: number = uniqueId();

      //make a new object with id,name,email,password then push into data Array
      const people: UserInfo = {
        id: id1,
        name: name1,
        email: email1,
        password: password1,
      };
      data.push(people);
      console.log(people, 'has been added');
      return people;
    } else {
      console.log('username already exists');
      return data;
    }

    // return console.log(addData);
  }
  static viewAll() {
    if (data) {
      return data;
    } else {
      return console.log('no data found');
    }
  }
  // static findById();
  // static editById();
  // static deleteByID();
}
