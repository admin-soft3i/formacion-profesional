import { Component, OnInit, inject, signal } from '@angular/core';
import { ServiceTest, Course, Subject, Issue } from '../../../services/service-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sissues',
  imports: [],
  templateUrl: './sissues.html',
  styleUrl: './sissues.css',
})
export class Sissues implements OnInit {
	// Inyectamos el servicio
	private serviceTest = inject(ServiceTest);
	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);
	protected listIssues = signal<Issue[]>([]);
	
	ngOnInit(): void {
		this.serviceTest.getIssues().subscribe({
			next: (datos) => this.listIssues.set(datos),
			error: (err) => console.log('Error al leer el archivo JSON:', err)
		});		
		this.serviceTest.getSubjects().subscribe({
			next: (datos) => this.listSubjects.set(datos),
			error: (err) => console.log('Error al leer el archivo JSON:', err)
		});		
		this.serviceTest.getCourses().subscribe({
			next: (datos) => this.listCourses.set(datos),
			error: (err) => console.log('Error al leer el archivo JSON:', err)
		});
	}
	
	/**
	 * Obtiene el nombre del curso
	 * @param courseId
	 * @returns 
	 */
	getCourseName(courseId: number): string {
		const course = this.listCourses().find(c => c.id === courseId);
		return course ? course.degree : 'Curso no encontrado';
	}	

	/**
	 * Obtiene el nombre de la asignatura
	 * @param subjectId
	 * @returns 
	 */
	getSubjectName(subjectId: number): string {
		const subject = this.listSubjects().find(s => s.id === subjectId);
		return subject ? subject.name : 'Asignatura no encontrada';
	}	
}
