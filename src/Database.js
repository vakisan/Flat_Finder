import { db,auth } from "./Init";
import firebase from "firebase";
import { Advertiser, Seeker } from "./User";

export class UserDatabase {
  async addUser(user, newUser) {
    db.collection("Users")
      .doc(newUser.uid)
      .set({
        Username: user.username,
        Email: user.email,
        LastName: user.lastName,
        FirstName: user.firstName,
        PhoneNumber: user.phoneNumber,
        UserType: user.constructor.name,
        UserID: newUser.uid,
      })
      .then(() => {
        console.log("added entry");
      })
      .catch((error) => {
        console.log("failed to add entry");
        console.log(error);
      });
  }

  async getUserInfo(uid) {
    return db.collection("Users").doc(uid).get();
  }
}

export class ChatDatabase {
  async createChat(listing, message) {
    const currentUser = new UserDatabase().getUserInfo(auth.currentUser.uid)
    .then((res)=>{
      console.log(res.data())
      if (res.data().UserType === "Seeker") {
        this.sendMessage(listing, message, res.data());
      }
    })
  }

  async replyMessage(listing, message) {
    let messageList = [];
    this.getMessages(listing)
      .then((messages) => {
        messages.forEach((msg) => {
          messageList.push(msg.data());
        });
        return messageList;
      })
      .then((res) => {
        console.log(res.length);
        //const currentUser = window._globalUserData_.UserInfo
        //this.sendMessage(listing,message,currentUser)
      });
  }

  async sendMessage(listing, message, currentUser) {
    this.createMessage(listing, message, currentUser).then((resolved) => {
      this.updateSelf(resolved)
        .then(() => {
          console.log("Message Saved");
          this.updateRecipient(resolved)
            .then(() => {
              console.log("Recipient Message Delivered");
            })
            .catch((error) => {
              this.handleFailedMessage(resolved).then(() => {
                console.log("Clean up Done");
              });
              console.log("Message failed to send. Please try again.");
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    });
  }

  async createMessage(listing, message, currentUser) {
    let list = [];
    return this.getMessages(listing)
      .then((success) => {
        success.forEach((res) => {
          list.push(res.data());
        });
        return list.length + 1;
      })
      .then((res) => {
        return {
          MessageID: "Message" + res,
          From: currentUser.Username,
          FromUID: currentUser.UserID,
          To: listing.postedByUsername,
          ToUID: listing.postedByUID,
          Message: message,
          Time: firebase.firestore.Timestamp.fromDate(new Date()),
        };
      });
  }

  handleFailedMessage(message) {
    return db
      .collection(
        `Users/${message.FromUID}/ChatRooms/${message.ToUID}/Messages`
      )
      .doc(message.MessageID)
      .delete();
  }

  async updateSelf(message) {
    return db
      .collection(
        `Users/${message.FromUID}/ChatRooms/${message.ToUID}/Messages`
      )
      .doc(message.MessageID)
      .set(message);
  }

  async updateRecipient(message) {
    console.log("Sending Message");
    return db
      .collection(
        `Users/${message.ToUID}/ChatRooms/${message.FromUID}/Messages`
      )
      .doc(message.MessageID)
      .set(message);
  }

  async getMessages(listing) {
    //console.log(listing)
    const currentUser = auth.currentUser;
    return db
      .collection(
        `Users/${currentUser.uid}/ChatRooms/${listing.postedByUID}/Messages`
      )
      .get();
  }
}

export class ListingDatabase {
  constructor() {
    this.locationList = null;
  }

  async _getStatisticsCount(documentName) {
    return db.collection("Statistics").doc(documentName).get();
  }

  async _updateStatisticsCount(documentName, count) {
    console.log(count);
    db.collection("Statistics")
      .doc(documentName)
      .set({
        count: count + 1,
      });
  }

  async advertiseListing(listing) {
    await this._getStatisticsCount("ListingCount")
      .then((count) => {
        const listingCount = count.data().count;
        console.log(listingCount);
        db.collection("Listings")
          .doc(`Listing${listingCount}`)
          .set(listing)
          .then(() => {
            console.log("added listing entry");
            this._updateStatisticsCount("ListingCount", listingCount);
            console.log("updated listingCount");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async fetchListings() {
    return db.collection("Listings").get();
  }
}

class ClientLocationDatabase {
  async getAllClientLocations() {
    const ClientLocations = await db
      .collection("ClientLocation")
      .get()
      .then((list) => {
        console.log(list.docs.map((doc) => doc.data()));
        return list.docs.map((doc) => doc.data());
      });
    return ClientLocations;
  }

  async addClientLocation(Country, Region, Town) {
    var location = {
      Town: Town,
      Country: Country,
      Region: Region,
    };

    db.collection("ClientLocation")
      .doc(Town)
      .set(location)
      .then(() => {
        console.log("added new client location");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// let databaseInstance = new Database()

//  async function initDatabase(dbt){
//     dbt.locationList = await dbt.getAllClientLocations()
//     return dbt.locationList
// }

// initDatabase(database).then(helo => {
//     let x = helo.docs.map(doc => doc.data())
//     console.log(x)
// })
