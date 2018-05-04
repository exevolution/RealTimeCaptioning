import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CaptionerUtilsService {

  constructor(private http: Http) { }

   // Takes the couresID (from URL) to get full info about the class
   getClass(courseID) {
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.get(`https://172.31.8.206:443/api/classes/courseID/${courseID}`, {headers: headers})
     .map(res => res.json());
    }

    // Takes the unique hash value of the class id & create a new transcript
    createTranscript(id) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(`https://172.31.8.206:443/api/transcripts`, {courseID: id} , {headers: headers})
      .map(res => res.json());
    }

    // Method for updating the transcripts title in the database
    updateTranscriptTitle(id, name) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http // send the contents to the database
          .put(`https://172.31.8.206:443/api/transcripts/id/${id}`, {transcriptName: name}, { headers: headers })
          .map(res => res.json());
    }


}

