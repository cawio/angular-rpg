import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  acceptedFileExtensions = '.json'

  constructor() { }

  public onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // TODO - parse the file and load the game
        // ! testing for now
        const data = JSON.parse(reader.result as string) as AngularRpgSaveFile;
        console.log('name: ' + data.name);
        console.log('age: ' + data.age);
      };
      reader.readAsText(file, 'UTF-8');
    }
  }
}

interface AngularRpgSaveFile {
  name: string;
  age: number;
}
