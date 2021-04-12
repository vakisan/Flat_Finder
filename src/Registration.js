import { UserDatabase } from "./Database";
import { auth } from "./Init";
import User from './User'

export default class Registration {
  constructor(unregisteredUser) {
    let registeredUser;
    console.log(unregisteredUser.validateEmail())
    if (unregisteredUser.validateEmail()) {
      console.log(unregisteredUser)
      auth
        .createUserWithEmailAndPassword(
          unregisteredUser.email,
          unregisteredUser.password
        )
        .then((userCredential) => {
          registeredUser = userCredential.user;
          console.log(registeredUser)
          new UserDatabase().addUser(unregisteredUser, registeredUser);
        })
        .then(() => {
          registeredUser
            .sendEmailVerification()
            .then(() => {
              // Email sent.
              alert(
                `An email has been sent to : ${registeredUser.email} to verify your account.`
              );
            })
            .catch(function (error) {
              // An error happened.
              alert("Email failed to be sent. Please contact support.");
            });

          return true;
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
}
