import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../auth/login/StorageService.service';
import { JwtUser } from '../../model/JwtUser.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: JwtUser;

  constructor(
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getCurrentUser();
  }

  public logout(): void{
    this.storageService.logout();
  }

}
