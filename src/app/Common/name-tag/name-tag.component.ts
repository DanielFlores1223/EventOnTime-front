import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-name-tag',
  templateUrl: './name-tag.component.html',
  styleUrls: ['./name-tag.component.scss']
})
export class NameTagComponent implements OnInit {

  @Input() tag = 'U';

  constructor() { }

  ngOnInit(): void {
  }

}
