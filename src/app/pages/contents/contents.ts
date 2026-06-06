import { Component, OnInit, inject, signal, input, computed } from '@angular/core';
import { ServiceTest, Content as Content_, Course, Subject } from '../../services/service-test';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contents',
  imports: [CommonModule, RouterLink],
  templateUrl: './contents.html',
  styleUrl: './contents.css',
})
export class Contents implements OnInit {
	private serviceTest = inject(ServiceTest);
	
	issueId = input<string>();
	issueName = input<string>();
	
	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);	
	protected listContents = signal<Content_[]>([]);
	
	ngOnInit(): void {
		this.serviceTest.getCourses().subscribe({
			next: (datos) => this.listCourses.set(datos),
			error: (err) => console.log('Error al leer el archivo JSON:', err)
		});
		this.serviceTest.getSubjects().subscribe({
			next: (datos) => this.listSubjects.set(datos),
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
	
	rcontent = computed(() => {
		const id = this.issueId();
		if (!id) return undefined;
		const contents = this.listContents().find(c => c.issue_id === Number(id));
		return contents;
	});
	
	/**
	 * Obtiene el contenido de la asignatura
	 * @param issuetId
	 * @returns 
	 */
	getContent(issueId: number | string | undefined): string {
		const content = this.listContents().find(c => c.issue_id === Number(issueId));
		return content ? content.content : 'Asignatura sin contenido';
	}
}
