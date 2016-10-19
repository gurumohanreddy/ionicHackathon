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
  question:any;
  questionNumber1:number;
  questionNumber2:number;
  questionOperator:any;
  items:Array<any>;

  constructor(public navCtrl: NavController) {
    this.play = false;
    this.gameOperators = ['+','/','*','-'];
    this.score = 0;
    this.timer = 60;
    this.items= ['a','b','c','d']
  }

  startPlay() {
    this.play = !this.play;
    this.timer = 60;
    this.generateQuestion();
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

  itemSelected(x:any) {
    console.log(x);
  }

private
  generateQuestion() {
    this.questionNumber1 = Math.floor(Math.random()*10);
    this.questionNumber2 = Math.floor(Math.random()*10);
    this.questionOperator = this.gameOperators[Math.floor(Math.random()* this.gameOperators.length)];
  }
}
