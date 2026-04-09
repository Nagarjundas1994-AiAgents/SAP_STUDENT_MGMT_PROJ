namespace my.school;

entity Students {

    key ID           : Integer;
        FirstName    : String(100);
        LastName     : String(50);
        Email        : String(100);
        Age          : Integer;
        CreatedDate  : Date;

}

entity Courses {
    key ID      : UUID;
        name    : String(100);
        credits : Integer;

}
