import { Component, inject, input, signal, computed, OnInit } from '@angular/core';
import { ServiceTest, SubjectTest, Course, Subject, Issue } from '../../services/service-test';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-tests',
  imports: [CommonModule, RouterLink],
  templateUrl: './subject-tests.html',
  styleUrl: './subject-tests.css',
})
export class SubjectTests implements OnInit {
	private serviceTest = inject(ServiceTest);
	
	testId = input<string>();

	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);
	protected listIssues = signal<Issue[]>([]);
	protected listSubjectTest = signal<SubjectTest[]>([]);
	
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
		this.serviceTest.getSubjectTest().subscribe({
			next: (datos) => this.listSubjectTest.set(datos),
			error: (err) => console.log('Error cargando JSON: ', err)
		});
	}
	
	rsubjectTest = computed(() => {
		const id = this.testId();
		if (!id) return undefined;
		const subjectTests = this.listSubjectTest().find(st => st.id === Number(id));
		return subjectTests;
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

	/**
	 * Obtiene el nombre de la asignatura
	 * @param subjectId
	 * @returns 
	 */
	getSubjectName(subjectId: number): string {
		const subject = this.listSubjects().find(s => s.id === subjectId);
		return subject ? subject.name : 'Asignatura no encontrada';
	}
	
	/**
	 * Obtiene el contenido de la asignatura
	 * @param testId
	 * @returns 
	 */
	getSubjectTest(testId: number | string | undefined): string {
		const content = this.listSubjectTest().find(st => st.id === Number(testId));
		return content ? content.content : 'Asignatura sin contenido';
	}
}
