import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
  joinForm = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.email, Validators.required]],
    bio:['', Validators.required]
  });
  constructor(
    private cld: CloudService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

  }

  join() {
    console.log(this.joinForm.value);
    this.cld.postJoin({}).subscribe(data => {
      console.log(data);
    });
  }

}
