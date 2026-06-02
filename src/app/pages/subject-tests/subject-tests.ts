import { Component, inject, input, signal, computed, OnInit } from '@angular/core';
import { ServiceTest, SubjectTest } from '../../services/service-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-tests',
  imports: [CommonModule],
  templateUrl: './subject-tests.html',
  styleUrl: './subject-tests.css',
})
export class SubjectTests implements OnInit {
	private serviceTest = inject(ServiceTest);
	
	testId = input<string>();

	protected listSubjectTest = signal<SubjectTest[]>([]);
	
	ngOnInit(): void {
		this.serviceTest.getSubjectTests().subscribe({
			next: (datos) => this.listSubjectTest.set(datos),
			error: (err) => console.log('Error cargando JSON: ', err)
		});
	}
	
	rsubjectTest = computed(() => {
		const id = this.testId;
		if (!id) return undefined;
		const response = this.listSubjectTest().find(st => st.id === Number(id));
		return response;
	});
}
