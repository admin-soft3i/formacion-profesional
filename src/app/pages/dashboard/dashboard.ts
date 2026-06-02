import { Component, inject, signal } from '@angular/core';
import { Course, ServiceTest, Subject } from '../../services/service-test';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
	// Inyectamos el servicio
	private serviceTest = inject(ServiceTest);
	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);

	ngOnInit(): void {
		this.serviceTest.getCourses().subscribe({
			next: (datos) => {
				this.listCourses.set(datos);
			},
			error: (err) => {
				console.log('Error al leer el archivo JSON:', err);
			}
		}); 
		
		this.serviceTest.getSubjects().subscribe({
			next: (datos) => {
				this.listSubjects.set(datos);
			},
			error: (err) => {
				console.log('Error al leer el archivo JSON:', err);
			}
		});
	}
}
