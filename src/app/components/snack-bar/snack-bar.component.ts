import { Component, OnInit, Inject } from "@angular/core";
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {
  constructor(
    public sbRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
  ngOnInit() { }
}
