import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {NgxMaskPipe} from "ngx-mask";
import {IAcronymGroup} from "../../interfaces/acronym-group.interface";

@Component({
  selector: 'app-folder-card',
  standalone: true,
  imports: [
    NgClass,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgxMaskPipe,
    NgbTooltip
  ],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.scss'
})
export class FolderCardComponent {
  @Input() folder!: IAcronymGroup;
}
