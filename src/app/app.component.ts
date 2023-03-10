import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas', { static: false })
  canvasRef: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  reader: FileReader = new FileReader();
  imgPath: any = new Image();
  photos;
  constructor(private http: HttpClient) {}

  ngOnInit(){
  this.getPhotos()
  }

  getPhotos(){
    this.http.get("https://picsum.photos/v2/list?page=2&limit=4").subscribe((res)=>{
      this.photos = res;
      console.log(res)
    })
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
  }

  UploadFile(file) {
    this.reader.readAsDataURL(file.target.files[0]);
    this.readFiles();
  }

  readFiles() {
    this.reader.onload = () => {
      console.log(this.reader.result);
      this.imgPath['src'] = this.reader.result;
      
        console.log(this.imgPath);
        this.ctx.drawImage(this.imgPath, 0, 0);
    
    };
  }
}
