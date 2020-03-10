import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { body, bodyStyle } from '../../model/snake-body.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public direction: string;
  public foodBody: body;
  public foodStyle: bodyStyle;
  public snakeBody: body[];

  constructor(
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.direction = 'right';
    this.snakeBody = [
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
    this.eventManager.addGlobalEventListener('window', 'keydown', (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          if (this.direction !== 'right') {
            this.direction = 'left';
          }
          break;
        case 'ArrowRight':
          if (this.direction !== 'left') {
            this.direction = 'right';
          }
          break;
        case 'ArrowUp':
          if (this.direction !== 'down') {
            this.direction = 'up';
          }
          break;
        case 'ArrowDown':
          if (this.direction !== 'up') {
            this.direction = 'down';
          }
          break;
      }
    });
    this.generateFood(this.snakeBody);
  }

  public generateFood(snakeBody: body[]) {
    while (true) {
      let dup_axis: boolean = false;
      let x: number = Math.ceil(Math.random() * 32) + 1;
      let y: number = Math.ceil(Math.random() * 32) + 1;
      for (let body of this.snakeBody) {
        if (body.x === x && body.y === y) {
          dup_axis = true;
          break;
        }
      }
      if (!dup_axis) break;
    }
    this.foodBody = {
      x: Math.ceil(Math.random() * 32) + 1,
      y: Math.ceil(Math.random() * 32) + 1
    }
    this.foodStyle = {
      'backgroundColor': 'grey',
      'top': 20 * this.foodBody.y + 'px',
      'left': 20 * this.foodBody.x + 'px'
    }
  }

}
