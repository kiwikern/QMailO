import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('300ms ease-out', style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateY(0)'}),
        animate('300ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FabButtonComponent implements OnInit {
  @HostBinding('class.fab') fabClass = true;

  @Input() icon: string;
  @Input() showButton = true;
  @Input() type = 'button';

  constructor() {
  }

  ngOnInit() {
  }

}
