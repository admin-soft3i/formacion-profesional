import { Component, OnInit, inject, signal, input, computed } from '@angular/core';
import { ServiceTest, Subject as Subject_, Course } from '../../../services/service-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ssubjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ssubjects.html',
  styleUrl: './ssubjects.css',
})
export class Ssubjects implements OnInit {
	// Inyectamos el servicio
	private serviceTest = inject(ServiceTest);
	
	// 1. Angular mapea automáticamente los Query Params de la URL (?course_id=1&subject_id=1)
    // Nota: Llegan como strings o undefined
    course_id = input<string>();
    subject_id = input<string>();

    // Señales base que guardan la totalidad de los datos de los JSON
    private _allCourses = signal<Course[]>([]);
    private _allSubjects = signal<Subject_[]>([]);
    
    // 2. Filtramos la lista de Cursos de forma reactiva basada en la URL
    protected listCourses = computed(() => {
        const idParam = this.course_id();
        const courses = this._allCourses();

        if (!idParam) return courses; // Si no hay parámetro, muestra todos

        const targetId = Number(idParam);
        return courses.filter(c => c.id === targetId);
    });

    // 3. Filtramos la lista de Asignaturas de forma reactiva basada en la URL
    protected listSubjects = computed(() => {
        const idParam = this.subject_id();
        const subjects = this._allSubjects();

        if (!idParam) return subjects; // Si no hay parámetro, muestra todas

        const targetId = Number(idParam);
        return subjects.filter(s => s.id === targetId);
    });
		
	ngOnInit(): void {
        // La carga inicial lee todo el JSON plano una sola vez
        this.serviceTest.getSubjects().subscribe({
            next: (datos) => this._allSubjects.set(datos),
            error: (err) => console.log('Error al leer las asignaturas:', err)
        });     
        this.serviceTest.getCourses().subscribe({
            next: (datos) => this._allCourses.set(datos),
            error: (err) => console.log('Error al leer los cursos:', err)
        }); 
    }
    
    // Tu método de búsqueda ahora lee desde los datos crudos cargados en el cliente
    getCourseName(courseId: number): string {
        const course = this._allCourses().find(c => c.id === courseId);
        return course ? course.degree : 'Curso no encontrado';
    }	
}
