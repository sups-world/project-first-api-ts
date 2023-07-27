// blueprint of class is an interface that has types only..not the operations
import { UserInfo } from '../interface/user.interface';
// extends used for classes, implements used for interfaces
const users: Array<UserInfo> = [];

function uniqueId() {
  return Math.floor(Math.random() * Date.now());
}
export class User {
  //METHODS
  // adding users
  // static addUsers(name1: string, email1: string, password1: string) {
  //   //generate unique id
  //   const id1: number = uniqueId();

  //   //make a new object with id,name,email,password then push into data Array
  //   const people: UserInfo = {
  //     id: id1,
  //     name: name1,
  //     email: email1,
  //     password: password1,
  //   };
  //   data.push(people);
  //   console.log(people, 'has been added');
  //   return people;

  //   // return console.log(addData);
  // }

  // viewAllusers
  // static viewAll(cb?: (user: UserInfo) => boolean): Array<UserInfo> {
  //   if (cb) {
  //     const filteredUsers = data.filter(cb);
  //     return filteredUsers;
  //   }
  //   return data;
  // }

  //add user
  static add(data: Omit<UserInfo, 'id'>): UserInfo {
    let id = 1;
    if (users.length) {
      id = users[users.length - 1].id + 1;
    }

    //create user object to be saved
    const user = { id, ...data };
    //add user to array ie save user
    users.push(user);
    //return new user
    return user;
  }

  //view all users
  static findAll(cb?: (user: UserInfo) => boolean): Array<UserInfo> {
    if (cb) {
      //filter using callback
      const filteredUsers = users.filter(cb);
      return filteredUsers;
    }
    return users;
  }

  //view by id
  static findById(id: number): UserInfo | null {
    const found = users.find(user => user.id === id);
    if (!found) return null;
    return found;
  }

  //findFirst
  static findFirst(cb: (user: UserInfo) => boolean): UserInfo | null {
    const found = users.find(cb);

    if (!found) return null;
    return found;
  }

  //edit name
  static edit(
    id: number,
    data: Partial<Omit<UserInfo, 'id'>>,
  ): UserInfo | null {
    // static edit(id: number, rname: string): UserInfo | null {
    const foundIndex = users.findIndex(user => user.id === id);
    if (foundIndex === -1) return null;

    // //create new user object

    // const user = { id, ...data };

    // //replace existing user by new user object
    // users[foundIndex] = user;

    const oldUser = users[foundIndex];
    if (data.name) {
      oldUser.name = data.name;
    }
    if (data.email) {
      oldUser.email = data.email;
    }
    if (data.password) {
      oldUser.password = data.password;
    }
    //when we chang ein oldUser, users[foundIndex] also changes..oldUser stores the reference of users
    //return updated user
    return oldUser;
  }

  //delete user
  static delete(id: number): UserInfo | null {
    //find index of user to be deleted
    const foundIndex = users.findIndex(user => user.id === id);
    if (foundIndex === -1) return null;

    //copy user object to be deleted for returning
    const user = users[foundIndex];

    //remove userfrom the list i.e delete user
    users.splice(foundIndex, 1);

    //return deleted user
    return user;
  }
}
