import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular-nest-proxy/api-interfaces';

@Component({
  selector: 'angular-nest-proxy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<string>('http://localhost:3333?target=192.168.0.179');
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.hello$.subscribe(val => console.log(val));
  }
}
