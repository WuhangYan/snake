import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { body, bodyStyle } from '../../model/snake-body.model';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
  @Input() public direction: string;
  @Input() public foodBody: body;
  @Output() public snakeBodyEmitter = new EventEmitter<body[]>();
  @Output() public keyInputValidEmitter = new EventEmitter<boolean>();

  public body: body[] = [];
  public styles: bodyStyle[] = [];
  public height: number;
  public width: number;
  public timer: number;

  constructor() { }

  ngOnInit() {
    this.height = 20;
    this.width = 20;
    this.body = [
      {
        x: 3,
        y: 1
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 1,
        y: 1
      }
    ];
    this.generateSnake();
    this.timer = window.setInterval(() => { this.move() }, 500);
  }

  public generateSnake() {
    this.styles = [];
    for (let i in this.body) {
      /* generate snake head */
      if (i === '0') {
        this.styles.push(
          {
            'backgroundColor': 'red',
            'top': this.height * this.body[0].y + 'px',
            'left': this.width * this.body[0].x + 'px',
            'z-index': '1'
          },
        )
      }
      else {
        this.styles.push(
          {
            'backgroundColor': 'grey',
            'top': this.height * this.body[i].y + 'px',
            'left': this.width * this.body[i].x + 'px'
          },
        )
      }
    }
  }

  public move() {
    this.keyInputValidEmitter.emit(true);
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    switch (this.direction) {
      case 'right': this.body[0].x++;
        break;
      case 'left': this.body[0].x--;
        break;
      case 'up': this.body[0].y--;
        break;
      case 'down': this.body[0].y++;
        break;
      default:
        break;
    }
    this.generateSnake();
    this.checkLoose();
    if (this.body[0].x === this.foodBody.x && this.body[0].y === this.foodBody.y) {
      this.body.push({
        x: null,
        y: null
      });
      this.snakeBodyEmitter.emit(this.body);
    }

  }

  public checkLoose() {
    if (this.body[0].x === 0 || this.body[0].x === 34 || this.body[0].y === 0 || this.body[0].y === 34) {
      clearInterval(this.timer);
      return;
    }
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
        clearInterval(this.timer);
        return;
      }
    }
  }

}
