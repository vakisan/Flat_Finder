import { auth } from "./Init";
import { UserDatabase, ChatDatabase, ListingDatabase } from "./Database";
import Registration from "./Registration";
import Authentication from "./Authentication";

export class User {
  constructor(email, password, username, phoneNumber, firstName, lastName) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.userType = this.constructor.name;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  Register() {
    return new Registration(this);
  }

  Login() {
    new Authentication().Login(this);
  }

  Logout() {
    new Authentication().Logout();
    window._globalUserData_=null
    return (window.location.href = "./src/front/Login");
  }

  changePassword() {}

  async viewChat(listing) {
    let messageList = [];
    await new ChatDatabase()
      .getMessages(listing)
      .then((messages) => {
        messages.forEach((message) => {
          messageList.push(message.data());
        });
        console.log("Messages Retrieved");
        return messageList;
      })
      .then((res) => {
        window._globalUserData_.SelectedChatRoomData = res;
        console.log(res);
      });
  }
}

export class Seeker extends User {
  validateEmail() {
    const regex = /^[a-z0-9]+@fdmgroup.com+$/i;
    if (this instanceof Seeker) {
      if (this.email.match(regex)) {
        return true;
      }
      return false;
    }
  }

  createNewChat(listing, message) {
    new ChatDatabase().createChat(listing, message);
  }
}

export class Advertiser extends User {
  validateEmail() {
    const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i;
    if (this instanceof Advertiser) {
      if (this.email.match(regex)) {
        return true;
      }
      return false;
    }
  }

  //advertiser needs to input a location
  advertiseListing(listing) {
    new ListingDatabase().advertiseListing(listing);
  }
}

export class PrivateAdvertiser extends Advertiser {}

export class EstateAgent extends Advertiser {}

export class FDMEmployeeAdvertiser extends Advertiser {
  validateEmail() {
    const regex = /^[a-z0-9]+@fmdgroup.com$/i;
    if (this instanceof Advertiser) {
      if (this.email.match(regex)) {
        console.log("Please register with your personal email");
        return false;
      }
      return true;
    }
  }

  /*
    @Override
    */
  advertiseListing(listing) {
    listing.postedByExistingFDMer = true;
    new UserDatabase().advertiseListing(listing);
  }
}

export class Admin extends User {
  validateEmail() {
    const regex = /^admin@fdmgroup.com+$/i;
    if (this instanceof Admin) {
      if (this.email.match(regex)) {
        return true;
      }
      return false;
    }
  }

  addNewClientLocation(loc) {
    new UserDatabase().addClientLocation(loc.country, loc.region, loc.town);
  }
}

// Testing Register, Login and finally Logout
// console.log("Start");
// let user = new PrivateAdvertiser(
//   "rajashrestha45@gmail.com",
//   "hello12345",
//   "SK12345",
//   "073333333333",
//   "Saksham",
//   "Rajash"
// );
// //let user1 = new PrivateAdvertiser("luffy@onepiece.com","MeatPirateKing","Monkey.D.Luffy","07111111111","Luffy","Monkey.D")
// user.Login();


// //user1.Register()
// setTimeout(()=>{
//    //user.Register()
// },2000)
// setTimeout(()=>{
//     user.Login()

// },4000)
// setTimeout(()=>{
//     //user.advertiseListing(listing1)
// },5000)
// setTimeout(()=>{

// },8000)
// // setTimeout(()=>{
// //     console.log(window._globalUserData_.SelectedChatRoomData)
// // },10000)

// // Testing Adding of new Client Locations
// // let admin = new Admin("admin@fmdgroup.com","swlp2020")
// // admin.Register()
// // setTimeout(()=>{
// //     admin.Login()
// // },5000)
// // setTimeout(()=>{
// //     let location = {
// //         town: "Morden",
// //         region: "London",
// //         country: "United Kingdom",
// //     }
// //     admin.addNewClientLocation(location)
// // },2000)

//Testing Advertising New Listing
// let listing1 = {
//         listingId: null,
//         postedBy: null,
//         address: null,
//         description: null,
//         postedByExistingFDMer: null,
//         location: null,
//         pictures: null,
//         videos: null,
//         petFriendly: null,
//         price: null,
//         availability: null,
//         reservedStatus: null,
//         approvedListing: null,
// }
