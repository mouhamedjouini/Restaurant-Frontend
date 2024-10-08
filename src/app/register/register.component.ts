import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { response, Router } from 'express';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,      
    PasswordModule,       
    ButtonModule,         
    MessagesModule ,
    ToastModule ,
    RouterLink,
    FormsModule
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;
  constructor(private auth: AuthService , private fromBuilder: FormBuilder, private message : MessageService ,private router:Router){}
  ngOnInit(): void {
    
  }

    createForm(){
      this.registrationForm=this.fromBuilder.group({
        username:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(4)]]
      });
    }
    onSubmit(){
      if (this.registrationForm.valid) {
        this.auth.register(this.registrationForm.value).subscribe(
          (response) => {
            this.message.add({ severity: 'success', summary: 'Success', detail: 'User Registered Successfully' });

            this.auth.AddRole(this.registrationForm.value.username, 'User').subscribe(
              (roleResponse) => {
                console.log('Role added successfully:', roleResponse);
                this.message.add({ severity: 'info', summary: 'Info', detail: 'Role Assigned Successfully' });
                // this.router.navigate(['/login']);
              },
              (roleError) => {
                console.error('Error assigning role:', roleError);
                this.message.add({ severity: 'warn', summary: 'Warning', detail: 'User Registered, but Role Assignment Failed' });
              }
            );
  
            this.registrationForm.reset();
          },
          (error) => {
            this.message.add({ severity: 'error', summary: 'Error', detail: 'Registration Failed' });
          }
        );
      } else {
        this.message.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out the form correctly' });
      }
    }
    }



  

