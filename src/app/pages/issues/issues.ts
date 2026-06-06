import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ServiceTest, Course, Subject, Issue, Content } from '../../services/service-test';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-issues',
  imports: [RouterLink],
  templateUrl: './issues.html',
  styleUrl: './issues.css',
})
export class Issues implements OnInit {
	private serviceTest = inject(ServiceTest);
	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);
	protected listIssues = signal<Issue[]>([]);
	protected listContents = signal<Content[]>([]);
	
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
		this.serviceTest.getContents().subscribe({
			next: (datos) => this.listContents.set(datos),
			error: (err) => console.log('Error cargando JSON: ', err)
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
	
	/**
	 * Obtiene el contenido de la asignatura
	 * @param issuetId
	 * @returns 
	 */
	getContent(contentId: number | string | undefined) {
		if (!contentId) return [];
		return this.listContents().find(c => c.id === Number(contentId));
	}

	/**
	 * Obtiene el contenido de la asignatura
	 * @param issuetId
	 * @returns 
	 */
	rcontent(issueId: number | string | undefined) { 
		return computed(() => {
			if (!issueId) return undefined;
			return this.listContents().find(c => c.issue_id === Number(issueId));
		});
	}

}
