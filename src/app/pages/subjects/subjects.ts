import { Component, inject, signal, input, DestroyRef, OnInit } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ServiceTest, Issue, Course, Subject } from '../../services/service-test';
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
	private destroyRef = inject(DestroyRef);
	
	// Angular mapea automáticamente ?course_id= X & subject_id= Y de la URL aquí:
	course_id = input<string>();
	subject_id = input<string>();
	
	// Señal para almacenar y manejar el estado de los temas de forma reactiva
	protected listaIssues = signal<Issue[]>([]);
	protected listCourses = signal<Course[]>([]);
	protected listSubjects = signal<Subject[]>([]);
	
	constructor() {
        // 1. Convertimos los inputs a Observables para reaccionar a la URL
        const course$ = toObservable(this.course_id);
        const subject$ = toObservable(this.subject_id);

        // 2. Escuchamos cuando AMBOS tengan valores válidos
        // Usamos switchMap para cancelar peticiones viejas si el usuario cambia de ruta rápido
        combineLatest([course$, subject$]).pipe(
            switchMap(([cId, sId]) => {
                const numCourse = Number(cId);
                const numSubject = Number(sId);

                if (numCourse && numSubject) {
                    return this.serviceTest.getIssues(numCourse, numSubject);
                }
                
                // Si no hay parámetros válidos, devolvemos un array vacío como observable
                return [[]]; 
            }),
            takeUntilDestroyed(this.destroyRef) // 👈 Evita fugas de memoria, limpia el subscribe al destruir el componente
        ).subscribe({
            next: (datos) => this.listaIssues.set(datos),
            error: (err) => console.error('Error al filtrar issues:', err)
        });
    }
	
	ngOnInit(): void {
		this.serviceTest.getCourses().subscribe({
			next: (datos) => this.listCourses.set(datos),
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

}
