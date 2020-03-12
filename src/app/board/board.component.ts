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
  public keyInputValid: boolean = true;
  public speedUp: boolean = false;

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
          if (this.direction !== 'right' && this.keyInputValid) {
            this.direction = 'left';
          }
          if (this.direction === 'left' && !this.keyInputValid) {
            this.speedUp = true;
          }
          break;
        case 'ArrowRight':
          if (this.direction !== 'left' && this.keyInputValid) {
            this.direction = 'right';
          }
          if (this.direction === 'right' && !this.keyInputValid) {
            this.speedUp = true;
          }
          break;
        case 'ArrowUp':
          if (this.direction !== 'down' && this.keyInputValid) {
            this.direction = 'up';
          }
          if (this.direction === 'up' && !this.keyInputValid) {
            this.speedUp = true;
          }
          break;
        case 'ArrowDown':
          if (this.direction !== 'up' && this.keyInputValid) {
            this.direction = 'down';
          }
          if (this.direction === 'down' && !this.keyInputValid) {
            this.speedUp = true;
          }
          break;
      }
      this.keyInputValid = false;
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

  /* make one arrow key input valid for each snake move */
  public checkValidInput(value) {
    this.keyInputValid = true;
  }

  /* once speed up finished after double click, do a reset*/
  public resetSpeedup(value) {
    this.speedUp = value;
  }

}
