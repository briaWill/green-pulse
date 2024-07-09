import { Routes } from '@angular/router';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';
import { AddFrameworkComponent } from './add-framework/add-framework.component';
import { EditFrameworkComponent } from './edit-framework/edit-framework.component';

export const routes: Routes = [
  { path: '', component: FrameworksListComponent, title: 'Framework List' },
 { path: 'new', component: AddFrameworkComponent },
 { path: 'edit/:id', component: EditFrameworkComponent },
];