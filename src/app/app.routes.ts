import { Routes } from '@angular/router';
import { Setting } from './pages/setting/setting';

import { Scourses } from './pages/setting/scourses/scourses';
import { Sissues } from './pages/setting/sissues/sissues';
import { Stests } from './pages/setting/stests/stests';
import { Ssubjects } from './pages/setting/ssubjects/ssubjects';

import { Dashboard } from './pages/dashboard/dashboard';
import { Subjects } from './pages/subjects/subjects';
import { Contents } from './pages/contents/contents';
import { SubjectTests } from './pages/subject-tests/subject-tests';

export const routes: Routes = [
	{ path: '', component: Dashboard },
	{ 
		path: 'setting', 
		component: Setting, 
		children: [
			{ path: '', component: Scourses }, 
			{ path: 'scourses', component: Scourses }, 
			{ path: 'ssubjects', component: Ssubjects }, 
			{ path: 'sissues', component: Sissues }, 
			{ path: 'stest', component: Stests }
		]
	}, 
	{ path: 'subjects', component: Subjects }, 
	{ path: 'contents/:issueId/:issueName', component: Contents },
	{ path: 'subject-test/:testId', component: SubjectTests }
];
