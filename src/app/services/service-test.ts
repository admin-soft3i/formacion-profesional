import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Object curse.
export interface Course {
	id: number;
	degree: string;
	name: string;
}

// Object subject.
export interface Subject {
	id: number;
	course_id: number;
	name: string;
}

// Object issue.
export interface Issue {
	id: number;
	course_id: number;
	subject_id: number;
	name: string;
}

// Object content.
export interface attachment {
	id: number;
	name: string;
	file: string;
}
export interface test {
	id: number;
	name: string;
	url: string;
}
export interface Content {
	id: number;
	issue_id: number;
	content: string;
	attachments: attachment[];
	tests: test[];
}

// Object subject test.
export interface selections {
	id: number;
	option: string;
}
export interface questions {
	id: number;
	question: string;
	response: string;
	weighing: number;
	type: string;
	value: string;
	selections: selections[];
}
export interface SubjectTest {
	id: number;
	issue_id: number;
	title: string;
	content: string;
	questions: questions[];
}

@Injectable({
  	providedIn: 'root',
})
export class ServiceTest {
	// Inyección moderna del HttpClient
	private http = inject(HttpClient);
	
	// Ruta relativa hacia el archivo dentro de assets
	private jsonCourses = 'assets/data/courses.json';
	private jsonSubjects = 'assets/data/subjects.json';
	private jsonIssues = 'assets/data/issues.json';
	private jsonContents = 'assets/data/contents.json';
	private jsonTests = 'assets/data/tests.json';
	
	// Método que retorna un Observable con el array de cursos
	getCourses(courseId?: number): Observable<Course[]> {
		return this.http.get<Course[]>(this.jsonCourses).pipe(
			map((courses: Course[]) => {
				if (!courseId) return courses;
				return courses.filter(course => course.id === courseId);
			})
		);
	}
	
	// Método que retorna un Observable con el array de asignaturas
	getSubjects(subjectId?: number): Observable<Subject[]> {
		return this.http.get<Subject[]>(this.jsonSubjects).pipe(
			map((subjects: Subject[]) => {
				if (!subjectId) return subjects;
				return subjects.filter(subject => subject.id === subjectId);
			})
		);
	}	
	
	// Método que retorna un Observable con el array de temas
	getIssues(courseId?: number, subjectId?: number): Observable<Issue[]> {
		return this.http.get<Issue[]>(this.jsonIssues).pipe(
			map((issues: Issue[]) => {
				return issues.filter(issue => { 
					if (!courseId || !subjectId) return issues;
					return issue.course_id === courseId && issue.subject_id === subjectId;
				});
			})
		);
	}
	
	// Método que retorna un Observable con el array de los contenidos de los temas
	getContents(issueId?: number): Observable<Content[]> {
		return this.http.get<Content[]>(this.jsonContents).pipe(
			map((contents: Content[]) => {
				if (!issueId) return contents;
				return contents.filter(content => content.issue_id === issueId);
			})
		);
	}	
	
	// Método que retorna un Observable con el array de los contenidos de los tests
	getSubjectTest(testId?: number): Observable<SubjectTest[]> {
		return this.http.get<SubjectTest[]>(this.jsonTests).pipe(
			map((subjectTests: SubjectTest[]) => {
				if (!testId) return subjectTests;
				return subjectTests.filter(st => st.id === testId);
			})
		);
	}
}
