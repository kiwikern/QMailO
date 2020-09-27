import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QmailFile } from '../qmail-file.model';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFormComponent implements OnInit {

  @Input() title: string;
  @Input() id = '';
  @Input() content = '';
  @Input() showLoadingAnimation = false;
  @Input() isNew = false;
  @Output() save = new EventEmitter<QmailFile>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  saveFile() {
    this.save.emit({id: this.id, content: this.content});
  }

  deleteFile() {
    this.delete.emit(this.id);
  }

}
