/**
 * @namespace sapfioriapp.studentmanagement.controller
 */
sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller"
], function (MessageToast, Controller) {
    "use strict";

    /**
     * Student Controller
     * Logic for managing student data and interaction with the creation dialog.
     */
    return Controller.extend("sapfioriapp.studentmanagement.view.Inputbox", {

        /**
         * Event handler for the "Create Student" button.
         * Lazily loads the XML fragment for the input dialog and opens it.
         */
        async onClickCreateStudent() {
            // Ensure the dialog fragment is loaded only once (Lazy Loading)
            this.oDialog ??= await this.loadFragment({
                name: "sapfioriapp.studentmanagement.view.createInputBox"
            });

            this.oDialog.setBindingContext(null); // Clear the binding context for new creation

            // Clear input fields for a fresh creation form
            this.byId("firstNameInput").setValue("");
            this.byId("lastNameInput").setValue("");
            this.byId("ageInput").setValue("");
            this.byId("emailInput").setValue("");
            this.byId("createdat").setValue("");

            this.oDialog.open();
        },

        /**
         * Event handler to close the dialog.
         * Triggered by the "Cancel" button in the dialog fragment.
         */
        async onDialogCancel() {
            if (this.oDialog) {
                this.oDialog.close();
            }
        },

        /**
         * Event handler for the "Save" button in the dialog.
         * Collects input data and persists it to the OData service.
         */
        async onDialogSave(oEvent) {
            // 1. Collect values from UI Input controls using their IDs
            const sFirstName = this.byId("firstNameInput").getValue();
            const sLastName = this.byId("lastNameInput").getValue();
            const sAge = this.byId("ageInput").getValue();
            const sEmail = this.byId("emailInput").getValue();
            const sCreatedAt = this.byId("createdat").getValue();

            const oTable = this.byId("student_table");
            const oBinding = oTable.getBinding("items");
            const oModel = oTable.getModel(); // Get the OData model
            const oDialogContext = this.oDialog.getBindingContext(); // Get the context from the dialog

            try {
                if (oDialogContext) {
                    // Edit mode: Update the existing entity
                    oDialogContext.setProperty("Age", parseInt(sAge)); // Assuming Age is an integer
                    oDialogContext.setProperty("CreatedDate", sCreatedAt); // Assuming format is acceptable by OData
                    oDialogContext.setProperty("Email", sEmail);
                    oDialogContext.setProperty("FirstName", sFirstName);
                    oDialogContext.setProperty("LastName", sLastName);

                    // For OData V4, we submit batch changes. 
                    // If your model is in 'Auto' mode, this might even be optional,
                    // but calling it ensures the data is persisted before closing.
                    await oModel.submitBatch(oModel.getUpdateGroupId()); 
                    MessageToast.show("Student record updated successfully.");
                } else {
                    // Create mode: Create a new entity
                    const oPayload = {
                        Age: parseInt(sAge), // Assuming Age is an integer
                        CreatedDate: sCreatedAt, // Assuming format is acceptable by OData
                        Email: sEmail,
                        FirstName: sFirstName,
                        LastName: sLastName
                    };
                    await oBinding.create(oPayload);
                    MessageToast.show("Student record created successfully.");
                }

                // Refresh the UI table to show the new/updated record
                oBinding.refresh();

                // Close the dialog on success
                this.onDialogCancel();
            } catch (oError) {
                // Log error details for debugging purposes
                console.error("Failed to create student record:", oError);
            }
        },

        /**
         * Opens the dialog and binds it to the selected student context for editing.
         */
        async onEditPress(oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const oStudent = oContext.getObject(); // Extract the data from the clicked row

            this.oDialog ??= await this.loadFragment({
                name: "sapfioriapp.studentmanagement.view.createInputBox"
            });

            this.oDialog.setBindingContext(oContext);

            // Manually show the data in the input fields
            this.byId("firstNameInput").setValue(oStudent.FirstName);
            this.byId("lastNameInput").setValue(oStudent.LastName);
            this.byId("ageInput").setValue(oStudent.Age);
            this.byId("emailInput").setValue(oStudent.Email);
            this.byId("createdat").setValue(oStudent.CreatedDate);

            this.oDialog.open();
        },

        /**
         * Deletes the selected student record.
         */
        async onDeletePress(oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            try {
                await oContext.delete();
                MessageToast.show("Student record deleted successfully.");
            } catch (oError) {
                MessageToast.show("Error deleting student record.");
                console.error("Delete Error: ", oError);
            }

          
        },

        async testClickfunc(oEvent) {

            console.log(oEvent);
            console.log(oEvent.getSource());
            console.log(oEvent.getSource().getBindingContext());

        }
    });
});
