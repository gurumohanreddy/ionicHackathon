import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  play:boolean;
  score:number;
  timer:number;
  timerId:number;
  question:any;
  questionNumber1:number;
  questionNumber2:number;
  options:Array<any>;
  questionOperator:any;
  correctAnswer:any;

  constructor(public navCtrl: NavController) {
    this.play = false;
    this.score = 0;
    this.timer = 60;
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

  itemSelected(x:any) {
    if(x===this.correctAnswer){
      this.score+=1;
      console.log('correct');
    }
    this.generateQuestion();
  }

private
  generateQuestion() {
    this.options= [];
    this.questionNumber1 = Math.floor(Math.random()*10);
    this.questionNumber2 = Math.floor(Math.random()*10);
    this.questionOperator = this.randomOperator();
    this.correctAnswer = this.questionOperator.operate(this.questionNumber1,this.questionNumber2);
    let temp = [this.correctAnswer+1,this.correctAnswer-1, this.correctAnswer+2, this.correctAnswer];
    this.options = this.shuffleArray(temp);
  }

  randomOperator() {
    let operators = [
      {
        text:'+',
        operate: function(a:number,b:number){ return a+b;}
      },
      {
        text:'*',
        operate: function(a:number,b:number){ return a*b;}
      },
      {
        text:'-',
        operate: function(a:number,b:number){ return a-b;}
      }
    ];
    return operators[Math.floor(Math.random()*operators.length)];
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

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
}
