import { trigger, transition, query, style, animate, group, animateChild} from '@angular/animations';

export const slideInAnimations =
  trigger('routeAnimations', [
    transition('ContactPage => *, BlogPage => PortfolioPage, BlogPage => HomePage, PortfolioPage => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild())
    ]),
    //'HomePage => *, PortfolioPage => BlogPage, PortfolioPage => ContactPage, BlogPage => ContactPage'
    transition('HomePage => *, PortfolioPage => BlogPage, PortfolioPage => ContactPage, BlogPage => ContactPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '-100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild())
    ])
  ]);