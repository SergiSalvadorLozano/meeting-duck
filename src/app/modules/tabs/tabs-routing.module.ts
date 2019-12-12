import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [{
  path: 'tabs',
  component: TabsPage,
  children: [{
    path: 'rooms-tab',
    children: [{
      path: '',
      loadChildren: () => import('../rooms-tab/rooms-tab.module').then(m => m.RoomsTabPageModule)
    }]
  }, {
    path: 'owner-tab',
    children: [{
      path: '',
      loadChildren: () => import('../owner-tab/owner-tab.module').then(m => m.OwnerTabPageModule)
    }]
  }, {
    path: 'peers-tab',
    children: [{
      path: '',
      loadChildren: () => import('../peers-tab/peers-tab.module').then(m => m.PeersTabPageModule)
    }]
  }, {
    path: 'help-tab',
    children: [{
      path: '',
      loadChildren: () => import('../help-tab/help-tab.module').then(m => m.HelpTabPageModule)
    }]
  }, {
    path: '',
    redirectTo: '/tabs/rooms-tab',
    pathMatch: 'full'
  }]
}, {
  path: '',
  redirectTo: '/tabs/rooms-tab',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
