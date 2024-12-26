import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
    commentForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<DialogComponent>, private fb: FormBuilder) {
        this.commentForm = this.fb.group({
            comment: [""],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        const comment = this.commentForm.value.comment;
        this.dialogRef.close(comment);
    }
}
