import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Probablemente necesites esto

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule para usar ngIf o ngClass si los usas
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  isOpen: boolean = false; 

}