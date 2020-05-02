import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-win-state',
  template: `
    <h1>Nicely Done!</h1>
    <p>
      Congratulations on completing <br />
      the Astonishing Relay!
    </p><p>
      <strong>You finished in {{ minutes }} min, {{ seconds }} sec</strong>
    </p>
  `,
  styles: [
  ]
})
export class WinStateComponent implements OnInit {
  @Input() minutes: number;
  @Input() seconds: number

  constructor() { }

  ngOnInit(): void {
  }

}
