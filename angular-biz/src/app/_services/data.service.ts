/* @abdul : 07-07-2019 */
import {Injectable, Inject } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Story} from '../_models/story';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { first } from 'rxjs/operators';

//@Injectable()
@Injectable({ providedIn: 'root' })
export class DataService {
  //private readonly API_URL = 'https://api.github.com/repos/angular/angular/storys';
    private readonly API_URL = 'http://localhost:3000';
  dataChange: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  @Inject(APP_CONFIG) private config: AppConfig;

  constructor (private httpClient: HttpClient) {}

  get data(): Story[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getStories(): void {
    this.httpClient.get<Story[]>(this.API_URL+'/stories?top=5&skip=0').subscribe(data => {
         this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }



  getAllStoryies(): void {
    this.httpClient.get<Story[]>(this.API_URL+'/allstories?top=5&skip=0').subscribe(data => {
         this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }
  
  
  addStory(story: any) {
       return this.httpClient.post(this.API_URL + '/stories', story);
    }

  // DEMO ONLY, you can find working methods below
  /*addStory(story: Story) {
    console.log('in Service add story:',story,this.config.apiUrl)
    this.dialogData = story;
    return this.httpClient.post(`${this.config.apiUrl}/stories`, this.dialogData);
  }*/

 /*addStory(story: Story): void {
    this.httpClient.post<Story[]>(this.API_URL+'/stories',this.dialogData).subscribe(data => {
         console.log(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }*/


  // Http Headers
  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  addStory(story: Story): Observable<Story[]> {
    return this.http.post<Story[]>(this.API_URL+'/stories', this.dialogData, story, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }*/



  updateStory(story: Story) {
    console.log('post data:', story)
    this.dialogData = story;
    return this.httpClient.put(`${this.config.apiUrl}/stories/${this.dialogData.id}`, this.dialogData);
  }

  deleteStory (id: number) {
    console.log(id);
    return this.httpClient.delete(`${this.config.apiUrl}/stories/${id}`);
  }

  getStoryById(id: number) {
        return this.httpClient.get(`${this.config.apiUrl}/stories/${id}`);
    }

}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




