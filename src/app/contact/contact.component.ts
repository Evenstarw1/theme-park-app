import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  sendEmail(form: { to_name: string; from_name: string; message: string }) {
    const serviceID = 'ParkFinder';
    const templateID = 'template_edxbaao';
    const apiKey = 'v4a-2AO-zWJFjCOsU';
  
    emailjs.send(serviceID, templateID, form, apiKey)
      .then((result) => {
        console.log('Correo enviado:', result.text);
        this.snackBar.open('Correo enviado con éxito', 'Cerrar', {
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error.text);
        this.snackBar.open('Hubo un error al enviar el correo', 'Cerrar', {
          duration: 5000,
        });
      });
  }
  
  
}
