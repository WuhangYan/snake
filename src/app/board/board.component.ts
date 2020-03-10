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

  constructor(
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.direction = 'right';
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
    this.generateFood();
  }

  public generateFood() {
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
