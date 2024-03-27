// expired-tasks-alert.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expired-tasks-alert',
  templateUrl: './expired-tasks-alert.component.html',
  styleUrls: ['./expired-tasks-alert.component.css']
})
export class ExpiredTasksAlertComponent {
  @Input() expiredTasks: { description: string; daysSinceExpiry: number; }[] = [];
}
