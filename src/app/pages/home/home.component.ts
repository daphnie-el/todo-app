import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChildren('checkbox') checkbox;


  @ViewChild('modal', { static: true }) modal: ElementRef;

  @ViewChild('newTodoBtn', {static: true}) newTodoBtn: ElementRef;

  @ViewChild('backdrop', { static: true }) backdrop: ElementRef;

  @ViewChild('add', { static: true }) add: ElementRef;

  checkboxes: ElementRef[] = [];

  todos: any[] = [
    {
      id: 1,
      text: 'Did something',
      status: 'completed'
    },
    {
      id: 2,
      text: 'Do other something',
      status: 'pending'
    },
    {
      id: 3,
      text: 'Do something else',
      status: 'pending'
    },
    {
      id: 4,
      text: 'Did a thing',
      status: 'completed'
    },
  ];

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.checkboxes.push(...this.checkbox._results);

    this.registerEventListeners();
  }

  buttonClicked(event) {
    console.log(event);
  }

  changeStatus(id: number, status: boolean): void {
    switch (status) {
      case true:
        for (const todo of this.todos) {
          if (todo.id === id) {
            todo.status = 'completed';
            break;
          }
        }
        break;

      case false:
        for (const todo of this.todos) {
          if (todo.id === id) {
            todo.status = 'pending';
            break;
          }
        }
        break;

      default:
        console.log('No match');
        break;
    }
  }

  registerEventListeners(): void {
    this.checkboxes.forEach(checkbox => {
      checkbox.nativeElement.addEventListener('change', (event) => {
        const id: number = Number(event.target.id);
        const status: boolean = event.target.checked;
        this.changeStatus(id, status);
      });
    });

    this.newTodoBtn.nativeElement.addEventListener('click', () => {
      if (this.modal.nativeElement.classList.contains('fade-out')) {
        this.modal.nativeElement.classList.remove('fade-out');
      }
      this.modal.nativeElement.classList.add('fade-in');
    });

    this.backdrop.nativeElement.addEventListener('click', () => {
      this.modal.nativeElement.classList.replace('fade-in', 'fade-out');
    });
  }

}
