import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-viewer',
  templateUrl: './cv-viewer.component.html',
  imports: [CommonModule],
  styleUrl: './cv-viewer.component.css',
})
export class CvViewerComponent {
  panelOpen = false;

  togglePanel() {
    this.panelOpen = !this.panelOpen;
  }
}
