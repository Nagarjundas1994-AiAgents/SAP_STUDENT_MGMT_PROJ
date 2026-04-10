namespace my.school;

entity Students {
    key Id          : Integer;
    FirstName       : String;
    LastName        : String;
    Email           : String;
    Age             : Integer;
    CreatedDate     : Date;
    ImageUrl        : String;
    DateOfBirth     : Date;
    PhoneNumber     : String;
    City            : String;
    Country         : String;
    Gender          : String;
    DreamJob        : String;
    Status          : String;
    BloodGroup      : String;
    Height          : Decimal;
    Weight          : Decimal;
    Nationality     : String;
    Hobby           : String;
}
entity Courses {
    key Id                  : Integer;
    CourseName              : String;
    CourseCode              : String;
    Instructor              : String;
    Department              : String;
    Credits                 : Integer;
    DurationWeeks           : Integer;
    Schedule                : String;
    Room                    : String;
    Capacity                : Integer;
    EnrolledStudents        : Integer;
    StartDate               : Date;
    EndDate                 : Date;
    Fee                     : Decimal;
    Mode                    : String;
    Level                   : String;
    Language                : String;
    Rating                  : Decimal;
    Status                  : String;
    Description             : String;
}