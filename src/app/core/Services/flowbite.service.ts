import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  [x: string]: any;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  initFlowbite(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(() => {
      });
    }
  }
}
