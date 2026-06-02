import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {}
