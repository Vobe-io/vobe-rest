import {trigger, transition, style, animate, query, stagger} from '@angular/animations';

export const feedAnimation = trigger('feedAnimation', [
  transition('* => *', [ // each time the binding value changes
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-7em)' }),
      stagger(100, [
        animate('1000ms cubic-bezier(0.19, 1, 0.22, 1)', style({ opacity: 1, transform: 'translateX(0)'}))
      ])
    ], { optional: true })
  ])
]);
