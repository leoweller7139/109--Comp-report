import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { firestore } from "firebase";
import { Friend } from '../models/friend';


@Injectable({
  providedIn: 'root'
})
export class DataService {
///// Copy and paste this if needed in other projects and just change <Message> to correct array
  messages: Observable<Message[]>; // Subscribe to the Observable Message Array, and will notify you when something changes
  messageCollection : AngularFirestoreCollection<Message>; // pipeline to firebase collection (tab)
// ----------------------------------------------------------------------
  //This is a copy of the text around it
  friends: Observable<Friend[]>;
  friendsCollection: AngularFirestoreCollection<Friend>;

// ----------------------------------------------------------------------
  constructor(private fb: AngularFirestore) { 
    this.messageCollection = fb.collection<Message>("posts"); // open the pipeline
    //------------------------------------
    this.friendsCollection = fb.collection<Friend>("friends");
  }
///////////////////////////////////////////////////////////////////
//Messages--------------------------------------------------------
  public saveMessage(message: Message){

    var item = Object.assign({}, message);
    this.messageCollection.add(item);

    //console.log("Complex", message);
    //console.log("Simple", item);
  }

  retrieveMessagesFromDB(){
    this.messages = this.messageCollection.valueChanges();

  }

  public getAllMessages(){
    this.retrieveMessagesFromDB(); // fill the array
    return this.messages; // return the array
  }

  //Friends-----------------------------------------------------------------
  public saveFriend(friend: Friend){
    var item = Object.assign({}, friend);
    this.friendsCollection.add(item);
  }

  public retrieveFriendsFromDB(){
    this.friends = this.friendsCollection.valueChanges();
  }

  public getAllFriends(){
    this.retrieveFriendsFromDB();
    return this.friends;
  }

}
