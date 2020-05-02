import { DataService } from './../services/data.service';
import { Friend } from './../models/friend';
import { Component } from '@angular/core';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model: Friend = new Friend();
  myFriends: Friend[] = []; // This is an array that something can be put into
                            // Currently empty

  constructor(private shared: ShareService, private data: DataService) {
    this.data.getAllFriends().subscribe(list =>{
      console.log("All my Friends", list);
      this.myFriends = [];

      // Filter Friends obj that belongs to me
      // for(var i=0; i < list.length; i++){
      //   if(list[i].belongsTo == this.shared.userName){
      //     this.myFriends.push(list[i]);
      //   }
      // }

      //Filter Function
      this.myFriends = list.filter(f => f.belongsTo == this.shared.userName);
    });
  }

  saveFriend(){
    this.model.belongsTo = this.shared.userName;
    console.log("Saving Friend", this.model);
    this.data.saveFriend(this.model);

    this.model = new Friend();
  }

}
