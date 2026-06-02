import { Component, OnInit, inject, signal } from '@angular/core';
import { ServiceTest, Course } from '../../../services/service-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scourses',
  imports: [CommonModule],
  templateUrl: './scourses.html',
  styleUrl: './scourses.css',
})
export class Scourses implements OnInit {
	// Inyectamos el servicio
	private serviceTest = inject(ServiceTest);
	protected listCourses = signal<Course[]>([]);
	
	ngOnInit(): void {
		this.serviceTest.getCourses().subscribe({
			next: (datos) => this.listCourses.set(datos),
			error: (err) => console.log('Error al leer el archivo JSON:', err)
		}); 
	}
}
