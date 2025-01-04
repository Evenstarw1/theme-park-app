import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import emailjs from "emailjs-com";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
    constructor(private snackBar: MatSnackBar) {}

    ngOnInit(): void {}

    sendEmail(form: { to_name: string; from_name: string; message: string }) {
        const serviceID = "ParkFinder";
        const templateID = "template_edxbaao";
        const apiKey = "v4a-2AO-zWJFjCOsU";

        emailjs
            .send(serviceID, templateID, form, apiKey)
            .then(() => {
                this.snackBar.open("Correo enviado con éxito", "Cerrar", {
                    duration: 5000,
                });
            })
            .catch(() => {
                this.snackBar.open("Hubo un error al enviar el correo", "Cerrar", {
                    duration: 5000,
                });
            });
    }
}
