import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-dialog',
  template: `
    <strong><mat-icon [inline]="true">extension</mat-icon> <span>CLUE</span></strong>
    <p *ngIf="textClue">
      {{ textClue }}
    </p>

    <img style="margin: 10px 0;" *ngIf="visualClue" width="200" [src]="visualClue" />

    <div style="text-align: center;">
      <button mat-flat-button color="primary" mat-dialog-close><mat-icon [inline]="true">close</mat-icon> Close Clue</button>
    </div>
  `,
  styles: [`
    strong {
      display: flex;
      align-items: center;
    }

    strong span {
      margin-top: 5px;
      margin-left: 4px;
    }
  `]
})
export class LocationDialogComponent implements OnInit {
  @Input() textClue: string;
  @Input() visualClue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
