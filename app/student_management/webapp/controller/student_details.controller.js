sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (Controller, History) => {
    "use strict";

    return Controller.extend("sapfioriapp.studentmanagement.controller.student_details", {

        onInit() {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("stu_detail")
                .attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched(oEvent) {
            // Decode "Students(42)" back from URL
            const sPath = window.decodeURIComponent(
                oEvent.getParameter("arguments").studentId
            );

            // Bind view to /Students(42) on default OData V4 model
            this.getView().bindElement({
                path: "/" + sPath,       // "/Students(42)"
                parameters: {
                    "$$updateGroupId": "auto"
                }
                // no model: property — uses default "" model
            });
        },

        onNavBack() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent()
                    .getRouter()
                    .navTo("Routestudent", {}, true);
            }
        },

        onExit() {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("stu_detail")
                .detachPatternMatched(this.onObjectMatched, this);
        }
    });
});