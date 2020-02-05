import { ConfirmationDialogComponent } from "./_dialogs/confirmation-dialog/confirmation-dialog.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule, MatButtonModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [
      CommonModule,
      MatDialogModule,
      BrowserAnimationsModule,
      MatButtonModule
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    exports: [
        ConfirmationDialogComponent
    ],
    entryComponents: [
      ConfirmationDialogComponent
    ]
  })
  export class SharedModule { }