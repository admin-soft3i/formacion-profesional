import { Component, OnInit, inject, signal, input, computed } from '@angular/core';
import { ServiceTest, Content as Content_ } from '../../services/service-test';
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
	
	protected listContents = signal<Content_[]>([]);
	
	ngOnInit(): void {
		this.serviceTest.getContents().subscribe({
			next: (datos) => this.listContents.set(datos),
			error: (err) => console.log('Error cargando JSON: ', err)
		});
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
