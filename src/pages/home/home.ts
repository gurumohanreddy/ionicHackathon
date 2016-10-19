import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  play:boolean;
  gameOperators: Array<String>;
  score:number;
  timer:number;
  timerId:number;

  constructor(public navCtrl: NavController) {
    this.play = false;
    this.gameOperators = ['+','/','*','-'];
    this.score = 0;
    this.timer = 60;
  }

  startPlay() {
    this.play = !this.play;
    this.timer = 60;
    this.startTimer();
  }

  stopPlay() {
    this.play = !this.play;
    clearInterval(this.timerId);
  }

  startTimer() {
    this.timerId = setInterval(()=>{
      if(this.timer>0){
        this.timer-=1;
      }else{
        clearInterval(this.timerId);
        this.stopPlay();
      }
    },1000);
  }
}
