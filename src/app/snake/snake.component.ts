import { Component, OnInit } from '@angular/core';
import { snakeBody, snakeBodyStyles } from '../../model/snake-body.model';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
  public body: snakeBody = [];
  public styles: snakeBodyStyles = [];
  constructor() { }

  ngOnInit() {
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
    this.styles = [
      {
        'backgroundColor': 'red',
        'top': '20px',
        'left': '60px'
      },
      {
        'backgroundColor': 'grey',
        'top': '20px',
        'left': '40px'
      },
      {
        'backgroundColor': 'grey',
        'top': '20px',
        'left': '20px'
      }
    ]
  }

}
