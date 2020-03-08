import { Component, OnInit } from '@angular/core';
import { snakeBody, snakeBodyStyles } from '../../model/snake-body.model';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
  public body: snakeBody[] = [];
  public styles: snakeBodyStyles[] = [];
  public direction: string;
  public height: number;
  public width: number;
  public timer: any;

  constructor() { }

  ngOnInit() {
    this.direction = 'right';
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
    this.timer = window.setInterval(() => { this.move() }, 800);
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
            'left': this.width * this.body[0].x + 'px'
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
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    switch (this.direction) {
      case 'right': this.body[0].x++;
        break;
      case 'left': this.body[0].x--;
        break;
      case 'up': this.body[0].y++;
        break;
      case 'down': this.body[0].y--;
        break;
      default:
        break;
    }
    this.checkLoose();

  }

  public checkLoose() {
    if (this.body[0].x === 0 || this.body[0].x === 35 || this.body[0].y === 0 || this.body[0].y === 35) {
      clearInterval(this.timer);
    }
    else {
      this.generateSnake();
    }
  }

}
