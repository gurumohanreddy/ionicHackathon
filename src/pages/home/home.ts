import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
  options:Array<number>;
  questionOperator:any;
  correctAnswer:number;
  highestScore:number;
  myIcon:string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage) {
    this.storage.get('HighScore').then((score) => {
      this.highestScore = score;
    });
    this.play = false;
    this.score = 0;
    this.timer = 60;
  }

  startPlay(t:number) {
    this.play = !this.play;
    this.timer = 60*t;
    this.score = 0;
    this.generateQuestion();
    this.startTimer();
  }

  stopPlay() {
    if(this.highestScore < this.score){
      this.storage.set('HighScore',this.score).then((score)=>{
        this.highestScore = score;
      });
      this.showAlert("Congratulations! We have a new HighScore");
    }else{
      this.showAlert();
    }
    this.play = !this.play;
    clearInterval(this.timerId);
  }

  itemSelected(x:any) {
    if(x===this.correctAnswer){
      this.score+=1;
      this.myIcon = "heart"
    }else{
      this.myIcon = "sad"
      this.score = 0;
    }
    setTimeout(()=>{
      this.generateQuestion();
    },300);
    // this.generateQuestion();
  }

  showAlert(t="Game Over") {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: `Your Score : ${this.score}`,
      buttons: ['OK']
    });
    alert.present();
  }

private
  generateQuestion() {
    this.myIcon = ""
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
