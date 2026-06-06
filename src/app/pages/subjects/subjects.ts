import { Component, inject, signal, input, DestroyRef, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTest, Course, Subject } from '../../services/service-test';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subjects',
  imports: [CommonModule, RouterLink],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects implements OnInit {
	// Inyectamos el servicio
	private serviceTest = inject(ServiceTest);
	
	// Angular mapea automáticamente ?course_id= X & subject_id= Y de la URL aquí:
	courseId = input<string>();
	
	// Señal para almacenar y manejar el estado de los temas de forma reactiva
	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);
	
	ngOnInit(): void {
		this.serviceTest.getSubjects().subscribe({
			next: (datos) => this.listSubjects.set(datos),
			error: (err) => console.log('Error cargando JSON: ', err)
		});
	}
	
	rsubjects = computed(() => {
		const id = this.courseId();
		if (!id) return undefined;
		return this.listSubjects().filter(s => s.course_id === Number(id));
	});

	/**
	 * Obtiene el nombre del curso
	 * @param courseId
	 * @returns 
	 */
	getCourseName(courseId: number): string {
		const course = this.listCourses().find(c => c.id === courseId);
		return course ? course.degree : 'Curso no encontrado';
	}	
	
}
