import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

export enum DIRECTION {
  right,
  left
}

@Injectable({
  providedIn: 'root'
})
export class SwipeRouteService {

  swipeNextRoute: Map<string, Map<DIRECTION, string>>;

  constructor(private router: Router) {
    this.swipeNextRoute = this.initSwipeNextRouteMap();
  }

  private initSwipeNextRouteMap() {
    return new Map(
      [
        [
          '/home',
          new Map(
            [
              [DIRECTION.left, '/portfolio'],
              [DIRECTION.right, '/contact'],
            ]
          )
        ],
        [
          '/portfolio',
          new Map(
            [
              [DIRECTION.left, '/blog'],
              [DIRECTION.right, '/home'],
            ]
          )
        ],
        [
          '/blog',
          new Map(
            [
              [DIRECTION.left, '/contact'],
              [DIRECTION.right, '/portfolio'],
            ]
          )
        ],
        [
          '/contact',
          new Map(
            [
              [DIRECTION.left, '/home'],
              [DIRECTION.right, '/blog'],
            ]
          )
        ]
      ]
    );
  }

  getNextSwipeRoute(currRoute: string, direction: DIRECTION): string {
    return this.swipeNextRoute.get(currRoute).get(direction);
  }
}
